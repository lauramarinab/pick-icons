import { css } from "@emotion/core";
import { relative } from "path";
import { SearchContext } from "providers/SearchProvider";
import React from "react";
import { SearchIcon } from "./icons/SearchIcon";

const input = css`
  width: 100%;
  height: 100%;
  border: none;
  padding-right: 40px;
  font-size: 18px;
  outline: none;
  font-weight: 700;
  font-family: "Roboto Mono", monospace;
  background: transparent;
  border-bottom: 2px solid white;
  border-top: 2px solid white;

  ::placeholder {
    color: white;
    font-size: 18px;
    font-weight: 200;
    font-family: "Roboto", sans-serif;
  }
`;

type Props = {};

export const Filter: React.FC<Props> = () => {
  const { onChangeValue, value } = React.useContext(SearchContext);
  return (
    <div
      css={{
        height: 350,
        position: "sticky",
        top: 110,
        width: 350,
      }}
    >
      Filter
      <div
        css={{
          position: "relative",
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          svg: {
            position: "absolute",
            right: 10,
          },
        }}
      >
        <input
          css={input}
          placeholder="Search..."
          type="text"
          value={value}
          onChange={(e) => onChangeValue(e.currentTarget.value)}
        />
        <SearchIcon />
      </div>
    </div>
  );
};
