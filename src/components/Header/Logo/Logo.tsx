import { theme } from "../../../theme/tokens";

export const Logo: React.FC = () => {
  return <div css={{ height: 24, width: 24, background: theme.colors.primary, borderRadius: 999 }} />;
};
