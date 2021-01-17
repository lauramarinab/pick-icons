import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { ListIcons } from "components/ListIcons";
import { Snackbar } from "components/Snackbar";
import { Background } from "components/ui/Background";
import { CollectionButton } from "components/ui/CollectionButton";
import { Filter } from "components/ui/Filter";
import { githubIcon } from "components/ui/icons/githubIcon";
import { motion } from "framer-motion";
import { useListingScroll } from "hooks/useListingScroll";
import { flatMap } from "lodash";
import { ProvidersWrapper } from "providers/ProvidersWrapper";
import React from "react";
import dataIcons from "../dataIcons.json";

const Homepage: React.FC = () => {
  const icons = dataIcons.data;

  const allAvailableCategories = flatMap(icons.map((i) => i.categories)).filter(
    (c, index, arr) => arr.indexOf(c) === index
  );

  const { listingHasScrolled } = useListingScroll();

  return (
    <ProvidersWrapper>
      <div>
        <div
          css={{
            alignItems: "center",
            display: "inline-flex",
            fontFamily: '"Roboto Mono", monospace',
            fontSize: 20,
            left: 40,
            position: "fixed",
            top: 30,
            zIndex: 1,
          }}
        >
          <span css={{ fontSize: 35, fontWeight: 700, marginRight: 5 }}>{icons.length}</span>icons &nbsp;
          <span css={{ fontSize: 35, fontWeight: 700, marginRight: 5 }}>~ {allAvailableCategories.length}</span>
          categories
        </div>
        <motion.h1
          animate={{ fontSize: listingHasScrolled ? "60px" : "100px" }}
          css={{
            bottom: 3,
            fontFamily: '"Roboto Mono", monospace',
            fontSize: 100,
            fontWeight: 200,
            left: 30,
            marginBottom: 10,
            position: "fixed",
            userSelect: "none",
            zIndex: 1,
          }}
          transition={{ duration: 0.1 }}
        >
          Pick
          <span css={{ fontWeight: 700 }}>Icons</span>
        </motion.h1>
        <div
          css={{
            alignItems: "center",
            bottom: 170,
            display: "flex",
            position: "fixed",
            right: -105,
            transform: "rotate(90deg)",
          }}
        >
          <div css={{ fontSize: 14, fontWeight: 700, userSelect: "none" }}>MIT Licensed</div>
          <a
            css={{ alignItems: "center", cursor: "pointer", display: "flex", marginLeft: 30, textDecoration: "none" }}
            href="https://github.com/lauramarinab/pick-icons"
            target="__blank"
          >
            {githubIcon}
            <div css={{ fontSize: 14, fontWeight: 700, marginLeft: 8 }}>View on GitHub</div>
          </a>
        </div>
        {/* <CollectionButton /> */}

        <Snackbar />
        <div css={{ display: "grid", gridTemplateColumns: "450px calc(100% - 450px)", width: "100%" }}>
          <Filter />
          <ListIcons icons={icons} />
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
      )} */}
      </div>
    </ProvidersWrapper>
  );
};

export default Homepage;
