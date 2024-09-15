import { IType1 } from "@/types/IType1";
import axiosApi, { isAxiosError } from "@/utils/axiosApi";
import axios, { AxiosError } from "axios";

export const getStocksApi = async (): Promise<IType1[]> => {
    try {
      const response = await axiosApi.get("/stocks");
      return response.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw error.response?.data;
      }
      throw error;
    }
  }
  
  export const createStockApi = async (stock: IType1): Promise<IType1> => {
      try {
          const response = await axiosApi.post("/stocks", stock);
          return response.data.data;
      } catch (error: any) {
          if (isAxiosError(error)) {
              throw error.response?.data;
          }
          throw error;
      }
  }
  
  export const updateStockApi = async (stock: IType1): Promise<IType1> => {
      try {
          const response = await axiosApi.put(`/editStock`, stock);
          console.log(response.data)
          return response.data;
      } catch (error: any) {
          if (isAxiosError(error)) {
              throw error.response?.data;
          }
          throw error;
      }
  }
  
  // export const deleteStockApi = async (id: number): Promise<void> => {
  //     try {
  //         await axiosApi.delete(`/stocks/${id}`);
  //     } catch (error: any) {
  //         if (isAxiosError(error)) {
  //             throw error.response?.data;
  //         }
  //         throw error;
  //     }
  // }