import { useRef } from "react";
import { AriaButtonOptions, useButton } from "react-aria";
import { theme } from "../../theme/tokens";

type ButtonProps = AriaButtonOptions<"button"> & { className?: string };
export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      className={props.className}
      ref={ref}
      css={{
        width: "100%",
        height: "100%",
        maxHeight: "45px",
        transition: "all 200ms",
        background: "rgba(13, 71, 161, 0.35)",
        color: theme.colors.white,
        borderRadius: 8,
        ":hover, :focus, :focus-visible": {
          background: "rgba(13, 71, 161, 0.80)",
        },
      }}
    >
      {props.children}
    </button>
  );
};
