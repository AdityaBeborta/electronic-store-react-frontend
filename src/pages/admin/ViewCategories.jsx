import { useEffect, useState } from "react";
import { CategoryView } from "./CategoryView";
import {
  deleteCategoryById,
  fetchCategories,
} from "../../services/categories.service";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { CustomLoader } from "../../components/common/CustomLoader";
import { ViewCategoryModal } from "./ViewCategoryModal";

export const ViewCategories = () => {
  // state variable for modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // state variable to show the loader
  const [loader, setLoader] = useState(false);
  // state variable to hold categories from API
  const [categories, setCategories] = useState([]);
  //state variable to hold current category
  const [currentCategory, setCurrentCategory] = useState(null);
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

  // handler for editing the category
  const handleCategoryEdit = (categoryId) => {
    console.log("handle category edit triggered with category id", categoryId);
  };

  // handler for viewing category
  const handleCategoryView = (categoriesData) => {
    // to turn on the pop up
    handleShow();
    // set this category to current category
    setCurrentCategory(categoriesData);
    console.log("categories data", categoriesData);
  };

  // call the api to load data fromAPI
  useEffect(() => {
    // set the loader as true
    setLoader(true);
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
        toast.error(error.message);
      })
      .finally(() => {
        // set the loader to false
        setLoader(false);
      });
  }, []);

  return (
    <>
      {/* condition for loader */}
      {loader ? (
        <div className="text-center mt-2">
          <CustomLoader message={"loading categories"} />
        </div>
      ) : (
        <>
          {categories?.length <= 0 ? (
            <h3>
              There are no categories added, please add from categories to find
              that here!!!
            </h3>
          ) : (
            categories.map((currentData) => (
              <CategoryView
                key={currentData?.categoryId}
                categoriesData={currentData}
                handleCategoryEdit={handleCategoryEdit}
                handleCategoryDelete={handleCategoryDelete}
                handleCategoryView={handleCategoryView}
              />
            ))
          )}
        </>
      )}
      <ViewCategoryModal
        show={show}
        handleClose={handleClose}
        currentCategory={currentCategory}
      />
    </>
  );
};
