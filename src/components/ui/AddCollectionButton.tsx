import React from "react";
import { ActionButton } from "./ActionButton";
import { collectionAddIcon } from "./icons/collectionAddIcon";

interface Props {
  filename: string;
  iconUrlSrc: string;
  disabled?: boolean;
}

const AddCollectionButton: React.FC<Props> = ({ filename, iconUrlSrc, disabled }) => {
  return (
    <ActionButton disabled={disabled} onClick={() => {}}>
      {collectionAddIcon}
    </ActionButton>
  );
};

export { AddCollectionButton };
