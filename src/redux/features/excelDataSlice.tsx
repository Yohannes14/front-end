import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExcelData {
  id: number;
  item_No: string;
  description: string;
  unit: string;
  qty: string;
  rate: string;
  amount: string;
  message: string;
  data: any[];
}

interface InitialState {
  data: any[];
  message: string;
  isCorrect: boolean;
  isLoading: boolean;
  error: boolean;
}

const initialState: InitialState = {
  data: [],
  message: "",
  isCorrect: false,
  isLoading: false,
  error: false,
};

const excelDataSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    // add excel data
    addExcelDataStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    addExcelDataSuccess: (state, action: PayloadAction<ExcelData>) => {
      state.isLoading = false;
      state.message = action.payload.message || "Inserted into database";
      state.isCorrect = true;
      state.error = false;
    },
    addExcelDataFailure: (state, action: PayloadAction<ExcelData>) => {
      state.isLoading = false;
      state.message = action.payload?.message || "Failed to insert data";
      state.error = true;
    },
    /// GET ALL data
    fetchExcelDataStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    fetchExcelDataSuccess: (state, action: PayloadAction<{ data: any[] }>) => {
      state.isLoading = false;
      state.data = action.payload?.data;
      state.error = false;
    },
    fetchExcelDataFailure: (
      state,
      action: PayloadAction<{ message?: string }>
    ) => {
      state.isLoading = false;
      state.message = action?.payload?.message || "Failed Fetch Data";
      state.error = true;
    },
    // /// delete
    deleteExcelDataStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteExcelDataSuccess: (state, action: PayloadAction<ExcelData>) => {
      state.isLoading = false;
      state.message = action.payload?.message || "Record deleted successfully";
      state.isCorrect = true;
      state.error = false;
    },
    deleteExcelDataFailure: (state, action: PayloadAction<ExcelData>) => {
      state.isLoading = false;
      state.message = action.payload?.message || "Failed to deleted";
      state.isCorrect = false;
      state.error = true;
    },
    // /// update
    updateExcelDataStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateExcelDataSuccess: (state, action: PayloadAction<ExcelData>) => {
      state.isLoading = false;
      state.message = action.payload.message || "Record updated successfully.";
      state.isCorrect = true;
      state.error = false;
    },
    updateExcelDataFailure: (state, action: PayloadAction<ExcelData>) => {
      state.isLoading = false;
      state.message = action.payload?.message || "Could not find this id.";
      state.isCorrect = false;
      state.error = true;
    },
  },
});
export const {
  addExcelDataStart,
  addExcelDataSuccess,
  addExcelDataFailure,
  fetchExcelDataStart,
  fetchExcelDataSuccess,
  fetchExcelDataFailure,
  deleteExcelDataStart,
  deleteExcelDataSuccess,
  deleteExcelDataFailure,
  updateExcelDataStart,
  updateExcelDataSuccess,
  updateExcelDataFailure,
} = excelDataSlice.actions;
export default excelDataSlice.reducer;
