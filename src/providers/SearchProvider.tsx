import React from "react";

type SearchContext = {
  onChangeValue: (value: string) => void;
  value: string;
};

const SearchContext = React.createContext<SearchContext>({} as SearchContext);

const SearchProvider: React.FC = ({ children }) => {
  const [value, setValue] = React.useState<string>("");

  const onChangeValue = (value: string) => setValue(value);

  return <SearchContext.Provider value={{ onChangeValue, value }}>{children}</SearchContext.Provider>;
};

export { SearchProvider, SearchContext };
