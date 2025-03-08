type Props = {
  width?: string;
};

export default function HorizontalLine({ width = "w-auto" }: Props) {
  return (
    <div className={`flex items-center ${width}`}>
      <span className="material-symbols-outlined mr-[-21px]">
        arrow_back_ios
      </span>
      <div className="grow h-[3px] bg-neutral-700 w-full" />
      <span className="material-symbols-outlined ml-[-14px]">
        arrow_forward_ios
      </span>
    </div>
  );
}
