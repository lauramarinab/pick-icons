import { theme } from "../../theme/tokens";

type CounterProps = {
  value: number;
  label: string;
};

export const Counter: React.FC<CounterProps> = ({ value, label }) => {
  return (
    <div>
      <p css={{ fontFamily: theme.fontFamily.cursive, color: theme.colors.primary, fontWeight: 700, fontSize: 60 }}>
        {value}
      </p>
      <p css={{ fontWeight: 700, fontSize: 24 }}>{label}</p>
    </div>
  );
};
