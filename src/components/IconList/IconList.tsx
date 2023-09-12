import orderBy from "lodash/orderBy";
import { useSearch } from "../../context/search-context";
import { Icon } from "../../types/global";
import { CardIcon } from "../CardIcon";

type IconListProps = {
  icons: Array<Icon>;
};

export const IconList: React.FC<IconListProps> = ({ icons }) => {
  const { value } = useSearch();

  const orderedIcons = orderBy(icons, "filename");

  let filteredIcons: Array<Icon> = orderedIcons;
  if (value.length > 0) {
    filteredIcons = orderedIcons.filter((icon) => icon.metadata.find((m) => m.includes(value.toLowerCase())));
  }

  if (filteredIcons.length === 0) {
    return (
      <div>
        No icons for <strong>{value}</strong>
      </div>
    );
  }

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(95px, 1fr))",
        gap: 32,
        justifyItems: "center",
        transition: "all 250ms",
        "@media (max-width: 960px)": {
          gridTemplateColumns: "repeat(auto-fit, minmax(85px, 1fr))",
          gap: 12,
        },
      }}
    >
      {filteredIcons.map((icon, i) => {
        return <CardIcon key={i} iconName={icon.name} iconUrlSrc={icon.urlSrc} filename={icon.filename} />;
      })}
    </div>
  );
};
