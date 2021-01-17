import React from "react";
import { gAEvent } from "utils/gtag";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { ActionButton } from "./ActionButton";
import { collectionAddIcon } from "./icons/collectionAddIcon";
import { downloadIcon } from "./icons/downloadIcon";

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
