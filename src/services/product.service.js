import {
  ADD_PRODUCT_IMAGE,
  ADD_PRODUCT_WITHOUT_CATEGORY,
} from "./helper.service";
import { privateAxios } from "./axios.service";
export const addProductWithOutCategory = (productData) => {
  return privateAxios.post(ADD_PRODUCT_WITHOUT_CATEGORY, productData);
};

export const addImageToExistingProduct = (productId, file) => {
  const formData = new FormData();
  formData.append("productImage", file);
  return privateAxios.post(ADD_PRODUCT_IMAGE + `${productId}`,formData);
};
