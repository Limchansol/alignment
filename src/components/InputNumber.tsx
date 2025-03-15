type Props = {
  label: string;
  labelColor?: string;
  value: string;
  wrapperWidth?: string;
  inputWidth?: string;
  onChange: (value: string) => void;
};

export default function InputNumber({
  label,
  labelColor,
  value,
  wrapperWidth,
  inputWidth,
  onChange,
}: Props) {
  return (
    <label
      className={`flex gap-2 items-center justify-between ${wrapperWidth}`}
    >
      <span className={`font-bold text-xl ${labelColor}`}>{label}</span>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(validateNumber(e.target.value || "0"))}
        className={`outline-none border text-xl px-2 py-2 rounded-xs ${inputWidth}`}
      />
    </label>
  );
}

const validateNumber = (value: string): string => {
  // 1. 숫자, 소수점, 음수 기호만 남기고 나머지 제거
  value = value.replace(/[^-.\d]/g, "");

  // 2. 음수 기호 정리 (맨 앞에 오는 '-'만 유지)
  const isNegative = value.startsWith("-");
  const isNegativeSign = value === "0-";
  value = value.replace(/-/g, ""); // 모든 '-' 제거
  if (isNegative) value = "-" + value; // 맨 앞에 '-' 복원
  else if (isNegativeSign) value = "-";

  // 3. 소수점 하나만 유지
  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("").replace(/\./g, "");
  }

  // 4. 불필요한 0 제거
  if (value === "0" || value === "-0") return "0"; // 단독 0은 유지

  return value.includes(".")
    ? value.replace(/^(-?)0*(?=\d)/, "$1") // 소수점 앞 불필요한 0 제거
    : value.replace(/^(-?)0+/, "$1"); // 정수에서 앞의 0 제거
};
