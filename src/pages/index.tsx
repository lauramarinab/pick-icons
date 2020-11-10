import React from "react";
import dataIcons from "../dataIcons.json";
import { Header } from "../components/Header";
import { ListIcons } from "../components/ListIcons";
import { SearchBar } from "../components/SearchBar";
import { Snackbar } from "../components/Snackbar";
import { SearchProvider } from "../providers/SearchProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import { useCheckAdBlocker } from "hooks/useCheckAdBlocker";

const Homepage: React.FC = () => {
  const icons = dataIcons.data;

  const adBlockerActive = useCheckAdBlocker();

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
