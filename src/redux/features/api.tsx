import axios from "axios";
import { Dispatch } from "redux";
import {
  addExcelDataFailure,
  addExcelDataStart,
  addExcelDataSuccess,
  deleteExcelDataFailure,
  deleteExcelDataStart,
  deleteExcelDataSuccess,
  fetchExcelDataFailure,
  fetchExcelDataStart,
  fetchExcelDataSuccess,
  updateExcelDataFailure,
  updateExcelDataStart,
  updateExcelDataSuccess,
} from "./excelDataSlice";

const baseUrl = "http://localhost:5000/api";

export const addExcelDataApi = async (dispatch: Dispatch, data: any) => {
  dispatch(addExcelDataStart());
  try {
    const response = await axios.post(`${baseUrl}/`, data);
    dispatch(addExcelDataSuccess(response.data));
  } catch (error: any) {
    dispatch(addExcelDataFailure(error.response));
  }
};

export const fetchExcelDataApi = async (dispatch: Dispatch) => {
  dispatch(fetchExcelDataStart());
  try {
    const response = await axios.get(`${baseUrl}/`);
    dispatch(fetchExcelDataSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    dispatch(fetchExcelDataFailure(error?.response?.data));
  }
};

export const deleteExcelDataApi = async (dispatch: Dispatch, id: number) => {
  dispatch(deleteExcelDataStart());
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    dispatch(deleteExcelDataSuccess(response.data));
  } catch (error: any) {
    dispatch(deleteExcelDataFailure(error?.response.data));
  }
};

export const updateExcelDataApi = async (
  dispatch: Dispatch,
  id: number,
  item: any
) => {
  dispatch(updateExcelDataStart());
  try {
    const response = await axios.put(`${baseUrl}/${id}`, item);
    dispatch(updateExcelDataSuccess(response.data));
  } catch (error: any) {
    dispatch(updateExcelDataFailure(error?.response.data));
  }
};
