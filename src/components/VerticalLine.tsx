export default function VerticalLine({ height }: { height: string }) {
  return (
    <div className={`border-t-2 border-b-2 relative ${height} w-5`}>
      <div className="bg-neutral-900 absolute h-full w-[2px] left-[9px]"></div>
    </div>
  );
}
