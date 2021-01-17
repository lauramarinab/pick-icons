import { motion } from "framer-motion";
import React from "react";

import { collectionIcon } from "./icons/collectionIcon";

import { useListingScroll } from "hooks/useListingScroll";

const CollectionButton: React.FC = () => {
  const { listingHasScrolled } = useListingScroll();

  return (
    <motion.div
      animate={{ x: listingHasScrolled ? 130 : 0 }}
      css={{
        alignItems: "center",
        cursor: "pointer",
        display: "flex",
        position: "fixed",
        right: 40,
        top: 37,
        zIndex: 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {collectionIcon}
      <motion.p
        animate={{ opacity: listingHasScrolled ? 0 : 1 }}
        css={{ fontSize: 18, fontWeight: 700, marginLeft: 15 }}
        transition={{ duration: 0.1 }}
      >
        Collection
      </motion.p>
    </motion.div>
  );
};

export { CollectionButton };
