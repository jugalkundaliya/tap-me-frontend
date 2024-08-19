import styled from "styled-components";
import coinImage from "./../../assets/Coin.jpeg";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;
`;

export const CoinCounter = styled.h2`
  margin-top: 20px;
`;

export const TapButton = styled(motion.button)`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  outline: none;
  background-image: url(${coinImage});
  background-size: cover;
`;

export const FloatingText = styled(motion.div)`
  position: absolute;
  color: gold;
  font-size: 20px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
`;

export const ProgressContainer = styled.div`
  width: 80%;
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ level: number; maxLevel: number }>`
  width: ${(props) => `${(props.level / props.maxLevel) * 100}%`};
  height: 100%;
  background-color: #f0c808; // Replace with your desired color
`;

export const LevelText = styled.p`
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
`;
