import { useRef } from "react";
import useHover from "../../myhooks/useHover";

export default function Page1() {
  const ref1 = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        ref={ref1}
        id="hover"
        className="w-full h-[200px] bg-blue-400 overflow-hidden"
      >
        asd
      </div>
    </div>
  );
}
