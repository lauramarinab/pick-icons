import { css } from "@emotion/core";
import { orderBy } from "lodash";
import React from "react";

import { SearchContext } from "../providers/SearchProvider";
import { Icon } from "../types/Icon";

import { CardIcon } from "./CardIcon";
import { NoIconFound } from "./ui/NoIconFound";

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
        grid-gap: 0px;
        padding: 110px 50px;
        padding-bottom: 150px;
        justify-items: center;
      `}
      id="list-icons"
    >
      {filteredIcons.map((icon, i) => {
        return <CardIcon key={i} filename={icon.filename} iconName={icon.name} iconUrlSrc={icon.urlSrc} />;
      })}
    </div>
  );
};

export { ListIcons };
