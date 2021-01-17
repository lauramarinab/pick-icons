import React from "react";

type IconType = "solid" | "outline";
type SearchContext = {
  onChangeValue: (value: string) => void;
  value: string;
  type: IconType | string;
  onChangeType: (type: IconType | string) => void;
  clearFilter: () => void;
};

const SearchContext = React.createContext<SearchContext>({} as SearchContext);

const SearchProvider: React.FC = ({ children }) => {
  const [value, setValue] = React.useState<string>("");
  const [type, setType] = React.useState<IconType | string>("");

  const onChangeValue = (value: string) => setValue(value);

  const clearFilter = () => {
    setValue("");
    setType("");
  };

  return (
    <SearchContext.Provider value={{ onChangeValue, value, type, onChangeType: setType, clearFilter }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };
