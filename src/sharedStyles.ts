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
  padding: 10px 30px;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
`;

const Button = styled.div`
  ${buttonStyle}
`;

export { pink, water, gradient, gradientText, buttonStyle, Button };
