import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { ListIcons } from "components/ListIcons";
import { Background } from "components/ui/Background";
import { CollectionButton } from "components/ui/CollectionButton";
import { Filter } from "components/ui/Filter";
import { GithubIcon } from "components/ui/icons/GithubIcon";
import { motion } from "framer-motion";
import { useListingScroll } from "hooks/useListingScroll";
import { flatMap } from "lodash";
import { SearchProvider } from "providers/SearchProvider";
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

  const allAvailableCategories = flatMap(icons.map((i) => i.categories)).filter(
    (c, index, arr) => arr.indexOf(c) === index
  );

  const { listingHasScrolled } = useListingScroll();

  return (
    <div>
      <div
        css={{
          position: "fixed",
          zIndex: 1,
          top: 30,
          left: 40,
          display: "inline-flex",
          alignItems: "center",
          fontSize: 20,
          fontFamily: '"Roboto Mono", monospace',
        }}
      >
        <span css={{ fontSize: 35, fontWeight: 700, marginRight: 5 }}>{icons.length}</span>icons &nbsp;
        <span css={{ fontSize: 35, fontWeight: 700, marginRight: 5 }}>~ {allAvailableCategories.length}</span>
        categories
      </div>
      <motion.h1
        animate={{ fontSize: listingHasScrolled ? "60px" : "100px" }}
        transition={{ duration: 0.1 }}
        css={{
          fontFamily: '"Roboto Mono", monospace',
          fontSize: 100,
          zIndex: 1,
          fontWeight: 200,
          marginBottom: 10,
          position: "fixed",
          bottom: 3,
          left: 30,
          userSelect: "none",
        }}
      >
        Pick
        <span css={{ fontWeight: 700 }}>Icons</span>
      </motion.h1>
      <div
        css={{
          position: "fixed",
          bottom: 170,
          right: -105,
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
      <CollectionButton />

      {/* <SnackbarProvider> */}
      <SearchProvider>
        {/* <Snackbar /> */}
        <div css={{ display: "grid", width: "100%", gridTemplateColumns: "350px calc(100% - 350px)" }}>
          <Filter />
          {/* <Header iconsNumber={icons.length} /> */}
          {/* <ListWrapper adBlockerActive={adBlockerActive}> */}
          {/* <SearchBar /> */}
          <ListIcons icons={icons} />
          {/* </ListWrapper> */}
        </div>
      </SearchProvider>
      {/* </SnackbarProvider> */}

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
      )} */}
    </div>
  );
};

export default Homepage;
