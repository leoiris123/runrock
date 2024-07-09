import { Button, Input } from "antd";
import type { InputRef } from "antd";
import { useEffect } from "react";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import {
  useState,
  createRef,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
interface RowProps {
  name?: string;
  index: number;
}
interface AddRowProps {
  onaddChange: (e: any) => void;
  // clearall: () => void;
}
export default function MainView() {
  const rowRef = useRef<AddRowRef>(null);
  const [list, setList] = useState<RowProps[]>([]);
  const handleEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rowitem = { name: e.target.value, index: list.length };
    setList([...list, rowitem]);
    // refinput.current?.input?.value = "";
    // refinput.current?.input?.value = "";
    // input.current?.clear();
    rowRef.current?.clear();
    // console.log(input.current, "input===>");
    // input.current?.focus();
  };
  const handleClear = (e: any) => {
    console.log(e, "e===>");
    list.splice(e, 1);
    setList([...list]);
    console.log(list, "setList===>");
  };
  useEffect(() => {}, [list]);

  return (
    <div>
      <h2 className="text-3xl font-bold underline ">Hello world!</h2>

      <h1>MainView</h1>
      <div className={`${style.box} md:w-3/4 lg:w-1/2`}>
        <AddRow onaddChange={handleEnter} ref={rowRef}></AddRow>
        {list.map((item, index) => {
          return (
            <Row
              handleClear={handleClear}
              index={item.index}
              key={index}
              name={item.name}
            ></Row>
          );
        })}
      </div>
    </div>
  );
}

function Row(props: {
  name?: string;
  index: number;
  handleClear: (event: any) => void;
}) {
  const s = () => {
    props.handleClear(props.index - 1);
  };
  return (
    <div className="flex  flex-row relative w-full">
      <div>{props.name ? props.name : "default"}</div>
      <div>{props.index}</div>

      <Button onClick={s} className="absolute right-0" type="primary">
        删除
      </Button>
    </div>
  );
}
interface AddRowRef {
  clear: () => void;
}
const AddRow = forwardRef(function (props: AddRowProps, ref: any) {
  const [Ivalue, setIvalue] = useState("");
  const clear = () => {
    console.log("出发了 撒打算大飒飒");
    setIvalue("");
  };

  useImperativeHandle(ref, () => {});
  useImperativeHandle(ref, () => ({
    clear: clear,
  }));
  return (
    <div className="w-full flex flex-row">
      <Input
        placeholder="请输入内容"
        value={Ivalue}
        onChange={(e) => {
          setIvalue(e.target.value);
        }}
        onPressEnter={props.onaddChange}
        prefix={<PlusOutlined />}
        suffix={<CheckOutlined />}
        allowClear
      ></Input>
    </div>
  );
});
