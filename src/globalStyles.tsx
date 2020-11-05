import { Global, css } from "@emotion/core";

const globalStyles = (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html,
      body {
        font-family: "Roboto", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 400;
        letter-spacing: 2px;
        position: relative;
        height: 100vh;
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
      }
    `}
  />
);

export { globalStyles };
