import React from "react";
import dataIcons from "../dataIcons.json";
import { Header } from "../components/Header";
import { ListIcons } from "../components/ListIcons";
import { SearchBar } from "../components/SearchBar";
import { Snackbar } from "../components/Snackbar";
import { SearchProvider } from "../providers/SearchProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";

const Homepage = () => {
  const icons = dataIcons.data;

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
