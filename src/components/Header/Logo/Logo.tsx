import { theme } from "../../../theme/tokens";

export const Logo: React.FC = () => {
  return <div css={{ height: 40, width: 40, background: theme.colors.primary, borderRadius: 999 }} />;
};
