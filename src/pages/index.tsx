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
import { Background } from "components/ui/Background";
import { GithubIcon } from "components/ui/GithubIcon";

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
    <div css={{ position: "relative", width: "100vw", height: "100vh" }}>
      <h1
        css={{
          fontFamily: '"Roboto Mono", monospace',
          fontSize: 100,
          fontWeight: 200,
          marginBottom: 10,
          position: "absolute",
          bottom: 13,
          left: 40,
          userSelect: "none",
        }}
      >
        Pick
        <span css={{ fontWeight: 700 }}>Icons</span>
      </h1>
      <div
        css={{
          position: "absolute",
          bottom: 185,
          right: -110,
          display: "flex",
          alignItems: "center",
          transform: "rotate(90deg)",
        }}
      >
        <div css={{ fontSize: 14, fontWeight: 700, userSelect: "none" }}>MIT Licensed</div>
        <a
          css={{ display: "flex", alignItems: "center", cursor: "pointer", marginLeft: 30, textDecoration: "none" }}
          href="https://github.com/lauramarinab/pick-icons"
          target="__blank"
        >
          <GithubIcon />
          <div css={{ fontSize: 14, fontWeight: 700, marginLeft: 8 }}>View on GitHub</div>
        </a>
      </div>
      <Background />
      {/* {adBlockerActive && (
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
      </SnackbarProvider>*/}
    </div>
  );
};

export default Homepage;
