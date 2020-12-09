import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Background } from "components/ui/Background";
import { GithubIcon } from "components/ui/GithubIcon";
import { useCheckAdBlocker } from "hooks/useCheckAdBlocker";
import React from "react";
import dataIcons from "../dataIcons.json";

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
          bottom: 170,
          right: -85,
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
