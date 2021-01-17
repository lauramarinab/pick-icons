import { css } from "@emotion/core";
import styled from "@emotion/styled";
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
  const { onChangeValue, value, type, onChangeType } = React.useContext(SearchContext);
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
      <div css={{ display: "flex", alignItems: "center", fontWeight: 700, fontSize: 18, height: 50, marginBottom: 20 }}>
        <OutlineButton position="left" label="Outline" onClick={() => onChangeType("outline")}>
          Outline
        </OutlineButton>
        <OutlineButton position="right" label="Solid" onClick={() => onChangeType("solid")}>
          Solid
        </OutlineButton>
      </div>
      <ClearButton />
    </div>
  );
};

const Button = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 1px;
  background: radial-gradient(
    114.46% 159.17% at 76.94% -34.72%,
    rgba(0, 255, 209, 0.63) 0%,
    rgba(255, 0, 184, 0.37) 51.05%,
    rgba(255, 122, 0, 0.92) 100%
  );
`;

const ClearButton: React.FC = () => {
  const { clearFilter } = React.useContext(SearchContext);
  return <Button onClick={clearFilter}>Clear filter</Button>;
};

const OutlineButton: React.FC<{ position: "right" | "left"; label: string } & React.HTMLProps<HTMLDivElement>> = ({
  position,
  label,
  ...props
}) => {
  const { type } = React.useContext(SearchContext);

  const isSelected = label.toLowerCase() === type.toLowerCase();

  return (
    <div
      {...props}
      css={[
        {
          flex: 1,
          justifyContent: "center",
          cursor: "pointer",
          height: 50,
          display: "flex",
          alignItems: "center",
          transition: "background 0.3s",
          ":hover": {
            background: isSelected ? "" : "rgba(255, 255, 255, 0.1)",
          },
        },
        position === "left" && {
          borderRight: "1px solid #ffffff",
        },
        position === "right" && {
          borderLeft: "1px solid #ffffff",
        },
        isSelected && {
          background: "rgba(255, 255, 255, 0.25)",
        },
      ]}
    >
      {label}
    </div>
  );
};
