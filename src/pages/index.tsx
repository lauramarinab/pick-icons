import React from "react";
import dataIcons from "../dataIcons.json";
import { Header } from "../components/Header";
import { ListIcons } from "../components/ListIcons";
import { SearchBar } from "../components/SearchBar";
import { Snackbar } from "../components/Snackbar";
import { SearchProvider } from "../providers/SearchProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import { Icon } from "../types/Icon";
import { flatMap } from "lodash";

const Homepage = () => {
  const icons = dataIcons.data;
  const iconsNumber = flatMap(icons).length;

  return (
    <SnackbarProvider>
      <SearchProvider>
        <Snackbar />
        <div>
          <Header iconsNumber={iconsNumber} />
          <SearchBar />
          <ListIcons icons={icons} />
        </div>
      </SearchProvider>
    </SnackbarProvider>
  );
};

export default Homepage;
