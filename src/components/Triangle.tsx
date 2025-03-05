type Props = {
  borderColor: string;
};

export default function Triangle({ borderColor }: Props) {
  return (
    <div
      className={`w-0 h-0 border-[40px] border-transparent ${borderColor}`}
    />
  );
}
