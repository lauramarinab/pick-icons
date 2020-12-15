import { AnimatePresence, motion } from "framer-motion";
import { useListingScroll } from "hooks/useListingScroll";
import React from "react";
import { CollectionIcon } from "./icons/CollectionIcon";

const CollectionButton: React.FC = () => {
  const { listingHasScrolled } = useListingScroll();

  return (
    <motion.div
      animate={{ x: listingHasScrolled ? 130 : 0 }}
      transition={{ duration: 0.2 }}
      css={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 37,
        right: 40,
        cursor: "pointer",
        zIndex: 1,
      }}
    >
      <CollectionIcon />
      <motion.p
        css={{ fontWeight: 700, fontSize: 18, marginLeft: 15 }}
        animate={{ opacity: listingHasScrolled ? 0 : 1 }}
        transition={{ duration: 0.1 }}
      >
        Collection
      </motion.p>
    </motion.div>
  );
};

export { CollectionButton };
