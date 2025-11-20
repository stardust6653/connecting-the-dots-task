import "./App.css";
import Select from "./components/common/Select/Select";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-blue-600">
        Hello world!
      </h1>
      <Select
        label="기본 셀렉트"
        options={[
          {
            group: "과일",
            items: [
              { value: "귤", disabled: true },
              { value: "사과" },
              { value: "바나나" },
            ],
          },
          {
            group: "none",
            disabled: true,
            items: [
              { value: "Option 1" },
              { value: "Option 2" },
              { value: "Option 3" },
            ],
          },
          {
            group: "채소",
            items: [{ value: "오이" }, { value: "당근" }, { value: "상추" }],
          },
          {
            group: "none",
            disabled: true,
            items: [
              { value: "Option 1" },
              { value: "Option 2" },
              { value: "Option 3" },
            ],
          },
        ]}
      />
    </>
  );
}

export default App;
