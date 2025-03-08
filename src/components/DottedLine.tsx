type Props = {
  height: string;
  right?: string;
  left?: string;
  top?: string;
  bottom?: string;
};

export default function DottedLine({
  height,
  right,
  left,
  top,
  bottom,
}: Props) {
  return (
    <div
      className={`absolute border-red-500 border-[1px] border-dashed  ${height} ${right} ${left} ${top} ${bottom}`}
    />
  );
}
