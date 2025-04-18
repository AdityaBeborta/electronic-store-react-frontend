import { useEffect, useState } from "react";
import { CategoryView } from "./CategoryView";
import {
  deleteCategoryById,
  fetchCategories,
} from "../../services/categories.service";
import { toast } from "react-toastify";

export const ViewCategories = () => {
  // state variable to hold categories from API
  const [categories, setCategories] = useState([]);

  //handler for deleting the categories
  const handleCategoryDelete = (categoryId) => {
    //call the API to delete
    deleteCategoryById(categoryId)
      .then((response) => {
        console.log(response);
        toast.success("success fully deleted the category");
        setCategories((prev) =>
          prev.filter((prev) => prev.categoryId !== categoryId)
        );
      })
      .catch((error) => {
        console.log("something went wrong");
        toast.error("something went wrong while deleting the category");
      });
  };

  // call the api to load data fromAPI
  useEffect(() => {
    console.log("page view categories rendered");
    fetchCategories()
      .then((response) => {
        console.log("inside success handler");
        console.log(response);
        setCategories(response?.data?.content);
      })
      .catch((error) => {
        console.log("inside error handler");
        console.log(error);
      });
  }, []);

  return (
    <>
      {categories.map((currentData) => (
        <CategoryView
          key={currentData?.categoryId}
          categoriesData={currentData}
          handleCategoryDelete={handleCategoryDelete}
        />
      ))}
    </>
  );
};
