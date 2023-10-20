import styled from "@emotion/styled";
import { theme } from "../../theme/tokens";
import { useSearch } from "../../context/search-context";

type SearchCardProps = {
  children: React.ReactNode;
};

export const SearchCard: React.FC<SearchCardProps> = ({ children }) => {
  return (
    <Card>
      <SearchBar />
      <div css={{ padding: 12 }}>{children}</div>
    </Card>
  );
};

const Card = styled.div({
  borderRadius: 8,
  background: theme.colors.white,
  border: `1px solid ${theme.colors.greyscale100}`,
  minHeight: 740,
  boxShadow: "0px 0px 20px -2px rgba(0, 0, 0, 0.20)",
});

export const SearchBar: React.FC = () => {
  const { onChangeValue, value } = useSearch();
  return (
    <div>
      <InputSearch
        type="text"
        value={value}
        placeholder="Search icon"
        onChange={(e) => onChangeValue(e.currentTarget.value)}
      />
    </div>
  );
};

const InputSearch = styled.input({
  background: "transparent",
  padding: 20,
  borderBottom: `1px solid ${theme.colors.greyscale100}`,
  width: "100%",
  borderRadius: "8px 8px 0px 0px",
  transition: "background 200ms",
  fontSize: 16,
  ":hover, :focus ,:focus-visible": {
    outline: "none",
    background: theme.colors.highlight,
  },
});
