import { css } from "@emotion/core";
import styled from "@emotion/styled";

const water = "#00ffd1";
const pink = "#ff00b8";

const gradient = css`
  background: linear-gradient(to right, ${water} 0%, ${pink} 100%);
`;

const gradientText = css`
  ${gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const buttonStyle = css`
  ${gradient};
  padding: 10px 20px;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  text-align: center;
`;

const Button = styled.div`
  ${buttonStyle}
  transition: transform 0.4s;
  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.8);
  }
`;

export { pink, water, gradient, gradientText, buttonStyle, Button };
