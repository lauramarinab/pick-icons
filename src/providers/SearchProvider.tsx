import React from "react";

type SearchContext = {
  value: string;
  onChangeValue: (value: string) => void;
};

const SearchContext = React.createContext<SearchContext>({} as SearchContext);

const SearchProvider: React.FC = ({ children }) => {
  const [value, setValue] = React.useState<string>("");

  const onChangeValue = (value: string) => setValue(value);

  return <SearchContext.Provider value={{ value, onChangeValue }}>{children}</SearchContext.Provider>;
};

export { SearchProvider, SearchContext };
