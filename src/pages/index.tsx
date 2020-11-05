import React from "react";
import dataIcons from "../dataIcons.json";
import { Header } from "../components/Header";
import { ListIcons } from "../components/ListIcons";
import { SearchBar } from "../components/SearchBar";
import { Snackbar } from "../components/Snackbar";
import { SearchProvider } from "../providers/SearchProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import { Icon } from "../types/Icon";

const icons: Array<Icon> = dataIcons.data.map((icon) => {
  return {
    name: icon.icon,
    path: `/svg/${icon.icon}`,
  };
});

const Homepage = () => {
  return (
    <SnackbarProvider>
      <SearchProvider>
        <Snackbar />
        <div>
          <Header iconsNumber={icons.length} />
          <SearchBar />
          <ListIcons icons={icons} />
        </div>
      </SearchProvider>
    </SnackbarProvider>
  );
};

export default Homepage;
