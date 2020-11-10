import React from "react";
import dataIcons from "../dataIcons.json";
import { Header } from "../components/Header";
import { ListIcons } from "../components/ListIcons";
import { SearchBar } from "../components/SearchBar";
import { Snackbar } from "../components/Snackbar";
import { SearchProvider } from "../providers/SearchProvider";
import { SnackbarProvider } from "../providers/SnackbarProvider";
import { useCheckAdBlocker } from "hooks/useCheckAdBlocker";
import { Dialog } from "components/ui/Dialog";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Button } from "sharedStyles";

const ListWrapper = styled.div<{ adBlockerActive: boolean }>`
  transition: filter 0.3s;
  filter: blur(0px);

  ${(props) =>
    props.adBlockerActive &&
    css`
      user-select: none;
      filter: blur(3px);
    `}
`;

const Homepage: React.FC = () => {
  const icons = dataIcons.data;

  const adBlockerActive = useCheckAdBlocker();

  return (
    <>
      {adBlockerActive && (
        <Dialog
          open={adBlockerActive}
          title="Warning Ad Blocker"
          message={
            <>
              <p>I have noticed that you have an ad blocker enabled which restricts ads served on the site.</p>
              &nbsp;
              <p>Please support me by disabling ad blocker and refresh page!</p>
            </>
          }
          buttonSection={<Button onClick={() => window.location.reload()}>Refresh page</Button>}
        />
      )}
      <SnackbarProvider>
        <SearchProvider>
          <Snackbar />
          <div>
            <Header iconsNumber={icons.length} />
            <ListWrapper adBlockerActive={adBlockerActive}>
              <SearchBar />
              <ListIcons icons={icons} />
            </ListWrapper>
          </div>
        </SearchProvider>
      </SnackbarProvider>
    </>
  );
};

export default Homepage;
