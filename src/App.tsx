import { useState } from "react";

import "./App.css";
import InputNumber from "./components/InputNumber";

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

  const calculateOutputs = () => {
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
    <div>
      <InputNumber
        label="a"
        value={inputs.a}
        onChange={(value) => setValuesByKey("a", value)}
      />
      <InputNumber
        label="b"
        value={inputs.b}
        onChange={(value) => setValuesByKey("b", value)}
      />
      <InputNumber
        label="c"
        value={inputs.c}
        onChange={(value) => setValuesByKey("c", value)}
      />
      <InputNumber
        label="face"
        value={inputs.face}
        onChange={(value) => setValuesByKey("face", value)}
      />
      <InputNumber
        label="OutDial"
        value={inputs.outDial}
        onChange={(value) => setValuesByKey("outDial", value)}
      />
      <div className="font-bold">A: {outputs.A}</div>
      <div>B: {outputs.B}</div>
      <button onClick={calculateOutputs} className="border cursor-pointer">
        계산하기
      </button>
    </div>
  );
}

const calculateOutput = (a: number, b: number, face: number, od: number) =>
  (b / a) * face + od / 2;
