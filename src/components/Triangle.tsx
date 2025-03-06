type Props = {
  color: string;
};

export default function Triangle({ color }: Props) {
  return (
    <span
      className={`material-symbols-outlined ${color}`}
      style={{ fontVariationSettings: '"FILL" 1', fontSize: "60px" }}
    >
      change_history
    </span>
  );
}
