import React from "react";
import { css } from "@emotion/core";
import { CardIcon } from "./CardIcon";
import { Icon } from "../types/Icon";
import { SearchContext } from "../providers/SearchProvider";
import { NoIconFound } from "./ui/NoIconFound";
import { orderBy } from "lodash";

const ListIcons: React.FC<{ icons: Array<Icon> }> = ({ icons }) => {
  const { value } = React.useContext(SearchContext);

  const orderedIcons = orderBy(icons, "filename");

  let filteredIcons: Array<Icon> = orderedIcons;
  if (value.length > 0) {
    filteredIcons = orderedIcons.filter((icon) => icon.metadata.find((m) => m.includes(value.toLowerCase())));
  }

  if (filteredIcons.length === 0) {
    return <NoIconFound />;
  }

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-gap: 50px;
        padding: 50px;
        justify-items: center;
      `}
    >
      {filteredIcons.map((icon, i) => {
        return <CardIcon key={i} iconName={icon.name} iconUrlSrc={icon.urlSrc} filename={icon.filename} />;
      })}
    </div>
  );
};

export { ListIcons };
