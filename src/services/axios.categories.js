import { privateAxios } from "./axios.service";
import { ADD_CATEGORY } from "./helper.service";

export const addCategory = (categoryData) => {
   return privateAxios.post(ADD_CATEGORY,categoryData)
};
