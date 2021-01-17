import { css } from "@emotion/core";
import { SearchContext } from "providers/SearchProvider";
import React from "react";
import { filterIcon } from "./icons/filterIcon";
import { searchIcon } from "./icons/searchIcon";

const input = css`
  width: 100%;
  height: 100%;
  border: none;
  padding-right: 40px;
  padding-left: 10px;
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
    letter-spacing: 1px;
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
        width: "100%",
        padding: "0px 40px",
      }}
    >
      <div css={{ display: "flex", alignItems: "center", marginBottom: 15, fontSize: 18, fontWeight: 700 }}>
        {filterIcon} <span css={{ marginLeft: 15 }}>Filter</span>
      </div>
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
        {searchIcon}
      </div>
    </div>
  );
};
