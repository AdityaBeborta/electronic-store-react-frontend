import { act, useEffect, useState } from "react";
import { CategoryView } from "./CategoryView";
import {
  deleteCategoryById,
  fetchCategories,
} from "../../services/categories.service";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { CustomLoader } from "../../components/common/CustomLoader";
import { ViewCategoryModal } from "./ViewCategoryModal";
import { EditCategoryModal } from "./EditCategoryModal";

export const ViewCategories = () => {
  // state variable for modal -- view category
  const [showCategoryView, setShowCategoryView] = useState(false);
  const handleCloseCategoryView = () => setShowCategoryView(false);
  const handleShowCategoryView = () => setShowCategoryView(true);

  // state variable for modal -- edit category
  const [showCategoryEdit, setShowCategoryEdit] = useState(false);
  const handleCloseCategoryEdit = () => setShowCategoryEdit(false);
  const handleShowCategoryEdit = () => setShowCategoryEdit(true);
  // state varibles for category edit
  const [formData, setFormData] = useState({
    categoryTitle: "",
    categoryDescription: "",
    categoryCoverImage: "",
  });

  // state variable to show the loader
  const [loader, setLoader] = useState(false);
  // state variable to hold categories from API
  const [categories, setCategories] = useState([]);
  const handleModalDataUpdateForCategoryWithClose = (action) => {
    handleCloseCategoryEdit();
    if (action === "update") {
      console.log("action value-->", action);

      const updatedData = categories.map((currentElem) => {
        if (currentElem?.categoryId === formData?.categoryId) {
          currentElem.categoryTitle = formData.categoryTitle;
          currentElem.categoryDescription = formData.categoryDescription;
          currentElem.categoryCoverImage = formData.categoryCoverImage;
          // Only if products are provided, update them
          if (formData.products && Array.isArray(formData.products)) {
            currentElem.products = formData.products;
          }
        }
        return currentElem;
      });
  
      setCategories(updatedData);
      return;
    }
    setFormData(currentCategory);
  };
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
  // handler for edit form
  // input field change handler
  const handleFormInpuChange = (e) => {
    console.log("fields are getting changed");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handler for editing the category
  const handleCategoryEdit = (categoryData) => {
    // to turn on the pop up
    handleShowCategoryEdit();
    // set the current category to the category which we are passing
    setCurrentCategory(categoryData);
    // set the current category to form data
    setFormData(categoryData);
  };

  // handler for viewing category
  const handleCategoryView = (categoriesData) => {
    // to turn on the pop up
    handleShowCategoryView();
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
        showCategoryView={showCategoryView}
        handleCloseCategoryView={handleCloseCategoryView}
        currentCategory={currentCategory}
      />
      <EditCategoryModal
        showCategoryEdit={showCategoryEdit}
        handleModalDataUpdateForCategoryWithClose={
          handleModalDataUpdateForCategoryWithClose
        }
        formData={formData}
        handleFormInpuChange={handleFormInpuChange}
      />
    </>
  );
};
