import { privateAxios } from "./axios.service";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORY,
} from "./helper.service";

export const addCategory = (categoryData) => {
  return privateAxios.post(ADD_CATEGORY, categoryData);
};
export const fetchCategories = () => {
  return privateAxios.get(FETCH_CATEGORY);
};
export const deleteCategoryById = (categoryId) => {
  return privateAxios.delete(DELETE_CATEGORY + `${categoryId}`);
};
