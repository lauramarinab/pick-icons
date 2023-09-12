import styled from "@emotion/styled";
import { Logo } from "./Logo";
import { theme } from "../../theme/tokens";
import useWindowScroll from "react-use/lib/useWindowScroll";

export const HEADER_HEIGHT = 65;

export const Header: React.FC = () => {
  const { y } = useWindowScroll();

  const borderVisible = y >= HEADER_HEIGHT / 2;
  return (
    <header
      css={{
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: theme.colors.white,
        borderBottom: borderVisible ? `1px solid transparent` : "1px solid transparent",
        borderBottomColor: borderVisible ? theme.colors.greyscale100 : "transparent",
        transition: "all 250ms",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <Logo />
      <nav css={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Link href="https://github.com/lauramarinab/pick-icons" target="_blank">
          View on Github
        </Link>
        <Link href="https://www.buymeacoffee.com/lauramarinab" target="_blank">
          Buy me a beer <span>🍺</span>
        </Link>
      </nav>
    </header>
  );
};

const Link = styled.a({
  textDecorationLine: "underline",
  textUnderlineOffset: 6,
  fontSize: 12,
  ":hover": {
    color: theme.colors.primary,
    transition: "color 200ms",
  },
});
