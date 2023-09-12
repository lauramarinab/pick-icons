import styled from "@emotion/styled";
import { Logo } from "./Logo";
import { theme } from "../../theme/tokens";

export const Header: React.FC = () => {
  return (
    <header css={{ padding: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
  ":hover": {
    color: theme.colors.primary,
    transition: "color 200ms",
  },
});
