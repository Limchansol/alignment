import { useState } from "react";

import "./App.css";
import InputNumber from "./components/InputNumber";
import Button from "./components/Button";
import Text from "./components/Text";

type OutputType = {
  A: number | null;
  B: number | null;
};

const INIT_INPUTS = { a: "0", b: "0", c: "0", face: "0", outDial: "0" };
const INIT_OUTPUTS = { A: null, B: null };

export default function App() {
  const [inputs, setInputs] = useState(INIT_INPUTS);
  const [outputs, setOutputs] = useState<OutputType>(INIT_OUTPUTS);

  const setValuesByKey = (key: keyof typeof INIT_INPUTS, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleClick = () => {
    validateInputs(inputs);
    const { a, b, c, face, outDial } = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, parseFloat(value)])
    );
    const A = calculateOutput(a, b, face, outDial);
    const B = calculateOutput(a, c, face, outDial);
    setOutputs({ A, B });
  };

  const validateInputs = (inputs: typeof INIT_INPUTS) => {
    try {
      if (parseFloat(inputs.a) === 0) {
        throw new Error("a는 0이 될 수 없습니다.");
      }
      if (parseFloat(inputs.b) >= parseFloat(inputs.c)) {
        throw new Error("b가 c보다 작아야 합니다.");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="text-neutral-700 flex flex-col items-center">
      <InputNumber
        label="a"
        value={inputs.a}
        onChange={(value) => setValuesByKey("a", value)}
        width="w-52"
      />
      <InputNumber
        label="b"
        value={inputs.b}
        onChange={(value) => setValuesByKey("b", value)}
        width="w-52"
      />
      <InputNumber
        label="c"
        value={inputs.c}
        onChange={(value) => setValuesByKey("c", value)}
        width="w-52"
      />
      <Text title="A" value={outputs.A?.toString() || "-"} />
      <Text title="B" value={outputs.B?.toString() || "-"} />

      <div className="flex flex-col gap-3">
        <InputNumber
          label="Face"
          value={inputs.face}
          onChange={(value) => setValuesByKey("face", value)}
          width="w-[340px]"
        />
        <InputNumber
          label="Out Dial"
          value={inputs.outDial}
          onChange={(value) => setValuesByKey("outDial", value)}
          width="w-[340px]"
        />
      </div>
      <Button text="계산하기" onClick={handleClick} />
    </div>
  );
}

const calculateOutput = (a: number, b: number, face: number, od: number) =>
  (b / a) * face + od / 2;
