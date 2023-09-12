import { PropsWithChildren, createContext, useContext, useState } from "react";

type SearchContext = {
  value: string;
  onChangeValue: (value: string) => void;
};
export const SearchContext = createContext<SearchContext>({} as SearchContext);

export const SearchProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<string>("");

  const onChangeValue = (value: string) => setValue(value);

  return <SearchContext.Provider value={{ value, onChangeValue }}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  return useContext(SearchContext);
};
