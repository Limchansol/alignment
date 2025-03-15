import { useState } from "react";

import "./App.css";
import InputNumber from "./components/InputNumber";
import Button from "./components/Button";
import Text from "./components/Text";
import Triangle from "./components/Triangle";
import VerticalLine from "./components/VerticalLine";
import HorizontalLine from "./components/HorizontalLine";
import DottedLine from "./components/DottedLine";

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
    console.log("set values: " + value);
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
      {/* 그래프 */}
      <div className="bg-blue-100 pl-1.5 pr-4 pt-8 pb-4 w-full">
        <div className=" w-full max-w-[800px] relative pl-[40px] mb-5 ">
          {/* 높이 a */}
          <div className="flex absolute left-[10px]">
            <div className="font-bold text-2xl text-center pr-3 mt-[40px] ml-1 mr-[-8px] text-cyan-700">
              a
            </div>
            <VerticalLine height="h-[120px]" />
          </div>

          {/* 수직선과 점 AB */}
          <div className="h-[120px] grid pt-[19px] grid-cols-[1fr_1.3fr]">
            <DottedLine
              height="h-[208px]"
              left="left-[40px]"
              top="top-[60px]"
            />
            {/* 수직선 */}
            <div className="h-[3px] w-[calc(100%-40px)] bg-neutral-700 top-[60px] absolute left-[40px]" />

            {/* 점 A */}
            <div className="flex justify-end relative">
              <DottedLine
                height="h-[124px]"
                right="right-[29px]"
                top="top-[44px]"
              />
              <div className="flex flex-col items-center w-fit">
                <div className="font-bold text-2xl">A</div>
                <Triangle color="text-neutral-700" />
              </div>
            </div>

            {/* 점 B */}
            <div className="flex justify-end relative">
              <DottedLine
                height="h-[206px]"
                right="right-[29px]"
                top="top-[44px]"
              />
              <div className="flex flex-col items-center w-fit">
                <div className="font-bold text-2xl">B</div>
                <Triangle color="text-neutral-700" />
              </div>
            </div>
          </div>

          {/* 길이 b */}
          <div className="grid pt-[19px] grid-cols-[1fr_1.3fr]">
            <div className="mt-[20px] pr-[22px]">
              <HorizontalLine />
              <div className="font-bold text-2xl text-center pr-3 mt-[-8px] text-emerald-600">
                b
              </div>
            </div>
          </div>

          {/* 길이 c */}
          <div className="mt-[32px] mr-[22px]">
            <HorizontalLine />
            <div className="font-bold text-2xl text-center pr-3 mt-[-8px] text-purple-800">
              c
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-5 mt-8 flex flex-col gap-11">
        {/* 길이 a b c */}
        <div className="flex flex-col gap-3">
          <InputNumber
            label="a"
            labelColor="text-cyan-700"
            value={inputs.a}
            onChange={(value) => setValuesByKey("a", value)}
            wrapperWidth="w-40"
            inputWidth="w-32"
          />
          <InputNumber
            label="b"
            labelColor="text-emerald-600"
            value={inputs.b}
            onChange={(value) => setValuesByKey("b", value)}
            wrapperWidth="w-40"
            inputWidth="w-32"
          />
          <InputNumber
            label="c"
            labelColor="text-purple-800"
            value={inputs.c}
            onChange={(value) => setValuesByKey("c", value)}
            wrapperWidth="w-40"
            inputWidth="w-32"
          />
        </div>

        {/* 기타 입력값 face OD*/}
        <div className="flex flex-col gap-3">
          <InputNumber
            label="Face"
            value={inputs.face}
            onChange={(value) => setValuesByKey("face", value)}
            wrapperWidth="w-[300px]"
            inputWidth="w-44"
          />
          <InputNumber
            label="Out Dial"
            value={inputs.outDial}
            onChange={(value) => setValuesByKey("outDial", value)}
            wrapperWidth="w-[300px]"
            inputWidth="w-44"
          />
        </div>

        {/* 결과 A B */}
        <div className="flex flex-col gap-3">
          <Text title="A" value={outputs.A?.toString() || "-"} />
          <Text title="B" value={outputs.B?.toString() || "-"} />
        </div>
      </div>

      {/* 계산 버튼 */}
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

const calculateOutput = (a: number, b: number, face: number, od: number) => {
  const result = (b / a) * face + od / 2;
  return parseFloat(result.toFixed(3));
};
