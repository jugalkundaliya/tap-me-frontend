import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client";
import useDebounce from "../../hooks/useDebounce";
import { GET_USER, INCREMENT_COINS } from "../../graphql/coins";
import {
  CoinCounter,
  Container,
  FloatingText,
  LevelText,
  ProgressBar,
  ProgressContainer,
  TapButton,
} from "./style";

interface FloatingTextInterface {
  id: number;
  show: boolean;
}

const telegramInfo = window?.Telegram?.WebApp;

const LIMIT_COINS = 200;

/**
 * A functional component that renders a CoinTap interface, allowing users to tap a button to increase their coin balance.
 * The component fetches the user's coin balance from the server and updates it in real-time.
 * It also displays a progress bar to track the user's progress towards the maximum coin limit.
 *
 * @return {JSX.Element} The rendered CoinTap interface
 */
const CoinTap = (): JSX.Element => {
  const [coins, setCoins] = useState<number | null>(null);

  const [showFloatingText, setShowFloatingText] = useState<
    FloatingTextInterface[]
  >([]);

  const [userId, setUserId] = useState<number>();

  const { data } = useQuery(GET_USER, {
    variables: { telegram_id: `${userId}` },
    skip: !userId,
  });

  const [incrementCoins] = useMutation(INCREMENT_COINS);

  const debouncedValue = useDebounce(coins);

  useEffect(() => {
    if (data?.getUser?.coin_balance !== undefined) {
      setCoins(data?.getUser?.coin_balance || 0);
    }
  }, [data]);

  const handleIncrease = useCallback(async () => {
    if (
      debouncedValue === null ||
      !userId ||
      debouncedValue > LIMIT_COINS ||
      debouncedValue === 0 ||
      debouncedValue === data?.getUser?.coin_balance
    )
      return;
    await incrementCoins({
      variables: {
        telegram_id: `${userId}`,
        amount: debouncedValue,
      },
    });
  }, [debouncedValue, incrementCoins, userId]);

  useEffect(() => {
    handleIncrease();
  }, [debouncedValue, handleIncrease]);

  useEffect(() => {
    const fetchTelegramId = async () => {
      if (telegramInfo.initDataUnsafe.user?.id) {
        setUserId(telegramInfo.initDataUnsafe.user?.id);
      } else {
        setCoins(0);
      }
    };

    fetchTelegramId();
  }, []);

  const handleTap = () => {
    if (coins === null) return;
    setShowFloatingText((prev) => [...prev, { id: coins + 1, show: true }]);
    setCoins(coins + 1);
    setTimeout(() => {
      setShowFloatingText((prev) => prev.filter((p) => p?.id !== coins + 1));
    }, 2000);
  };

  return (
    <Container>
      <CoinCounter>Coin: {coins}</CoinCounter>
      <TapButton whileTap={{ scale: 0.9 }} onClick={handleTap} />
      <AnimatePresence>
        {showFloatingText?.map(() => (
          <FloatingText
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -140, x: 0 }}
            exit={{ opacity: 0 }}
            key={coins}
            transition={{ duration: 2 }}
          >
            +1
          </FloatingText>
        ))}
      </AnimatePresence>
      <ProgressContainer>
        {coins !== null && <ProgressBar level={coins} maxLevel={LIMIT_COINS} />}
      </ProgressContainer>
      <LevelText>
        {coins}/{LIMIT_COINS}
      </LevelText>
    </Container>
  );
};

export default CoinTap;
