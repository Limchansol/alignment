import { useState } from "react";

import "./App.css";
import InputNumber from "./components/InputNumber";
import Button from "./components/Button";
import Text from "./components/Text";
import Triangle from "./components/Triangle";
import VerticalLine from "./components/VerticalLine";

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
    <div className="text-neutral-700 flex flex-col items-center p-8">
      <div className="bg-blue-200 w-full max-w-[600px] relative">
        <div className="flex items-center">
          <InputNumber
            label="a"
            value={inputs.a}
            onChange={(value) => setValuesByKey("a", value)}
            wrapperWidth="w-20"
            inputWidth="w-16"
          />
          <VerticalLine height="h-[112px]" />
          <div className="relative h-[112px] my-4 grow ml-[-10px]">
            <div className="w-full border border-neutral-950 absolute top-1/2" />
            <div className="flex justify-end gap-[140px]">
              <div className="bg-red-500 flex flex-col gap-3.5">
                <Text title="A" value={outputs.A?.toString() || "-"} />
                <Triangle color="text-amber-950" />
              </div>
              <div className="bg-red-500 flex flex-col gap-3.5">
                <Text title="B" value={outputs.B?.toString() || "-"} />
                <Triangle color="text-amber-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-fit absolute left-[90px]">
          <InputNumber
            label="b"
            value={inputs.b}
            onChange={(value) => setValuesByKey("b", value)}
            wrapperWidth="w-40"
            inputWidth="w-32"
          />
          <div className="mb-8 mt-3 w-[200px] border border-red-300" />
        </div>
        <div className="flex flex-col items-center w-fit absolute right-[0px] bottom-[-170px]">
          <InputNumber
            label="c"
            value={inputs.c}
            onChange={(value) => setValuesByKey("c", value)}
            wrapperWidth="w-40"
            inputWidth="w-32"
          />
          <div className="mb-8 mt-3 w-[420px] border  border-red-700" />
        </div>
      </div>

      <div className="h-[200px]"></div>

      <div className="flex flex-col gap-3 w-full justify-baseline px-5 mt-8">
        <InputNumber
          label="Face"
          value={inputs.face}
          onChange={(value) => setValuesByKey("face", value)}
          wrapperWidth="w-[340px]"
        />
        <InputNumber
          label="Out Dial"
          value={inputs.outDial}
          onChange={(value) => setValuesByKey("outDial", value)}
          wrapperWidth="w-[340px]"
        />
      </div>
      <div className="max-w-[400px]">
        <Button text="계산하기" onClick={handleClick} />
      </div>
      <Footnote />
    </div>
  );
}

function Footnote() {
  return (
    <div className="flex flex-col gap-1.5 mt-12 w-full px-12 relative">
      <span className="text-red-700 text-2xl absolute top-[-16px] left-[28px]">
        *
      </span>
      <span>A = b/a * F + O.D / 2</span>
      <span>B = c/a * F + O.D / 2</span>
    </div>
  );
}

const calculateOutput = (a: number, b: number, face: number, od: number) =>
  (b / a) * face + od / 2;
