import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { ViewProducts } from "./pages/admin/ViewProducts";
import{AddCategory} from './pages/admin/AddCategory'
import { ViewCategories } from "./pages/admin/ViewCategories";
import { AddProduct } from "./pages/admin/AddProduct";
import { ManageOrders } from "./pages/admin/ManageOrders";
import { ManageUser } from "./pages/admin/ManageUser";
import CustomNavbar from "./components/common/CustomNavbar";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminHome } from "./pages/admin/AdminHome";
import { AboutPage } from "./pages/common/AboutPage";
import { IndexPage } from "./pages/common/IndexPage";
import { LoginPage } from "./pages/common/LoginPage";
import { RegistrationPage } from "./pages/common/RegistrationPage";
import { ServicesPage } from "./pages/common/ServicesPage";
import { Home } from "./pages/users/Home";
import { UserDashboard } from "./pages/users/UserDashboard";
import { UserProfile } from "./pages/users/UserProfile";
import { ADD_CATEGORY } from "./services/helper.service";


function App() {
  return (
    <>
      <BrowserRouter>
        <CustomNavbar />
        <ToastContainer position="bottom-center" draggable theme="dark" />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          {/* user dashboard */}
          <Route path="/users" element={<UserDashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          {/* admin dashboard */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="view-categories" element={<ViewCategories />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="view-products" element={<ViewProducts />} />
            <Route path="manage-orders" element={<ManageOrders />} />
            <Route path="manage-users" element={<ManageUser />} />
            <Route path="userprofile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
