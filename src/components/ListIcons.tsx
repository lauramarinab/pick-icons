import { orderBy } from "lodash";
import React from "react";
import { SearchContext } from "../providers/SearchProvider";
import { Icon } from "../types/Icon";
import { CardIcon } from "./CardIcon";

const ListIcons: React.FC<{ icons: Array<Icon> }> = ({ icons }) => {
  const { value, type } = React.useContext(SearchContext);

  const orderedIcons = orderBy(icons, "filename");

  let filteredIcons: Array<Icon> = orderedIcons;
  if (Boolean(value.length)) {
    filteredIcons = orderedIcons.filter((icon) => icon.metadata.find((m) => m.includes(value.toLowerCase())));
  }
  if (Boolean(type)) {
    filteredIcons = orderedIcons.filter((icon) => icon.categories.find((c) => c.includes(type.toLowerCase())));
  }

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridGap: 0,
        padding: "110px 50px",
        paddingBottom: 150,
        justifyItems: "center",
      }}
      id="list-icons"
    >
      {filteredIcons.length > 0 ? (
        filteredIcons.map((icon, i) => {
          return <CardIcon key={i} filename={icon.filename} iconName={icon.name} iconUrlSrc={icon.urlSrc} />;
        })
      ) : (
        <div css={{ padding: 100 }}>No icon found... 🥺</div>
      )}
    </div>
  );
};

export { ListIcons };
