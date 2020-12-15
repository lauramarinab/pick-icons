import React from "react";
import { css } from "@emotion/core";
import { pink } from "../sharedStyles";
import { SearchContext } from "../providers/SearchProvider";

const wrapperStyle = css`
  width: 100vw;
  height: 80px;
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.25);
  position: sticky;
  top: 0px;
  z-index: 1;
  background: var(--white);
`;

const input = css`
  width: 100%;
  height: 100%;
  border: none;
  padding: 20px 30px;
  font-size: 24px;
  outline: none;
  color: ${pink};
  font-weight: 700;
  font-family: "Roboto Mono", monospace;

  ::placeholder {
    color: #aaaaaa;
    font-size: 24px;
    font-weight: 200;
    font-family: "Roboto", sans-serif;
  }
`;

const SearchBar: React.FC = () => {
  const { value, onChangeValue } = React.useContext(SearchContext);

  return (
    <div css={wrapperStyle}>
      <input
        type="text"
        value={value}
        placeholder="Search..."
        css={input}
        onChange={(e) => onChangeValue(e.currentTarget.value)}
      />
    </div>
  );
};
export { SearchBar };
