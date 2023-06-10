import { ChangeEvent, useEffect } from "react";

import { Typography } from "antd";
import * as XLSX from "xlsx";
import { addExcelDataApi, fetchExcelDataApi } from "./redux/features/api";
import { useDispatch, useSelector } from "react-redux";
import Tables from "./Table";

const { Title, Text } = Typography;

function App() {
  const dispatch = useDispatch();
  const handleFileChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files![0];
    if (
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target!.result as ArrayBuffer;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        addExcelDataApi(dispatch, data);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please select only Excel file.");
    }
  };

  useEffect(() => {
    fetchExcelDataApi(dispatch);
  }, [dispatch]);

  /// useselctor
  const store = useSelector((state: any) => state.data);

  const { message, error, isCorrect, data } = store;

  return (
    <div style={{ margin: "24px" }}>
      <div
        style={{
          display: "flex-row",
          alignContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Title style={{ marginBottom: "15px", textAlign: "center" }} level={3}>
          Upload and View Excel Sheets
        </Title>
        {/* form */}
        <label style={{ padding: "20px" }}>Upload File</label>
        <input
          style={{
            paddingBottom: "15px",
            padding: "15px",
            border: "2px solid lightgray",
          }}
          type="file"
          accept=".xls, .xlsx"
          required
          onChange={handleFileChange}
        />
        <div>
          {isCorrect && (
            <Text
              type="success"
              style={{ marginBottom: "15px", textAlign: "center" }}
            >
              {message}
            </Text>
          )}
          {error && (
            <Text
              type="danger"
              style={{ marginBottom: "15px", textAlign: "center" }}
            >
              {message}
            </Text>
          )}
        </div>
      </div>
      <Tables jsonData={data} />
    </div>
  );
}

export default App;
