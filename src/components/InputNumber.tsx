type Props = {
  label: string;
  value: string;
  wrapperWidth?: string;
  inputWidth?: string;
  onChange: (value: string) => void;
};

export default function InputNumber({
  label,
  value,
  wrapperWidth,
  inputWidth,
  onChange,
}: Props) {
  return (
    <label
      className={`flex gap-2 items-center justify-between ${wrapperWidth}`}
    >
      <span className="font-bold text-xl">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(removeLeadingZero(e.target.value || "0"))}
        className={`outline-none border text-xl px-2 py-2 rounded-xs ${inputWidth}`}
      />
    </label>
  );
}

const removeLeadingZero = (value: string) => {
  if (value === "0" || value === "00") return "0";

  return value.includes(".")
    ? // 소수점 앞에 0만 있을 때는 0을 하나만 남기고,
      // 소수점 앞에 다른 숫자가 있다면 0들을 모두 제거
      value.replace(/^(-?)0*(?=\d)/, "$1")
    : // 소수점이 없으면 앞의 0들을 전부 제거
      value.replace(/^(-?)0+/, "$1");
};
