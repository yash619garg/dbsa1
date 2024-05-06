import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Index.jsx";
import Login from "./Pages/Auth/Login.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import Register from "./Pages/Auth/Register.jsx";
import CreateProduct from "./Pages/AdminPanel/CreateProduct.jsx";
import ProductDetails from "./Pages/Products/ProductDetails.jsx";
import FavoriteProducts from "./Pages/Products/FavoriteProducts.jsx";
import Cart from "./Pages/Products/Cart.jsx";
import AllFilteredProduct from "./Pages/Products/AllFilteredProduct.jsx";
import CreateCategories from "./Pages/AdminPanel/CreateCategories.jsx";
import AdminMenu from "./Pages/AdminPanel/AdminMenu.jsx";
import AdminDashboard from "./Pages/AdminPanel/AdminDashboard.jsx";
import ProductList from "./Pages/AdminPanel/ProductList.jsx";
import CategoryList from "./Pages/AdminPanel/CategoryList.jsx";
import AllBlog from "./Pages/Blog/allBlog.jsx";
import SingleBlog from "./Pages/Blog/SingleBlog.jsx";
import CreateBlog from "./Pages/AdminPanel/CreateBlog.jsx";
import UpdateBlog from "./Pages/AdminPanel/UpdateBlog.jsx";
import CreateProject from "./Pages/AdminPanel/createProject.jsx";
import AllProject from "./Pages/Projects/AllProject.jsx";
import SingleProject from "./Pages/Projects/SingleProject.jsx";
import UpdateProject from "./Pages/AdminPanel/UpdateProject.jsx";
import ForgetPassword from "./Pages/Auth/ForgetPassword.jsx";
import ResetPassword from "./Pages/Auth/ResetPassword.jsx";
import Shipping from "./Pages/orders/Shipping.jsx";
import PlaceOrder from "./Pages/orders/PlaceOrder.jsx";
import Order from "./Pages/orders/Order.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderList from "./Pages/AdminPanel/OrderList.jsx";
import UsersList from "./Pages/AdminPanel/UsersList.jsx";
import UserRoute from "./Pages/UserPanal/UserRoute.jsx";
import Profile from "./Pages/UserPanal/Profile.jsx";
import MyOrders from "./Pages/UserPanal/MyOrders.jsx";
import ContactUs from "./Pages/other/Contact.jsx";
import About from "./Pages/other/About.jsx";
// import UsersList from "./Pages/AdminPanel.jsx/UsersList.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="Register" element={<Register />} />
              <Route path="forgetPassword" element={<ForgetPassword />} />
              <Route path="resetPassword/:token" element={<ResetPassword />} />
              <Route path="product" element={<CreateProduct />} />
              <Route path="blog" element={<AllBlog />} />
              <Route path="project" element={<AllProject />} />
              <Route path="blog/:id" element={<SingleBlog />} />
              <Route path="project/:id" element={<SingleProject />} />
              <Route path="productDetails/:id" element={<ProductDetails />} />
              <Route path="favorite" element={<FavoriteProducts />} />
              <Route path="cart" element={<Cart />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="placeorder" element={<PlaceOrder />} />
              <Route path="order/:id" element={<Order />} />
              <Route path="shop" element={<AllFilteredProduct />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="/about" element={<About />} />
              {/* Admin Routes  */}
              <Route path="adminMenu" element={<AdminMenu />}>
                <Route
                  path="adminDashboard"
                  index={true}
                  element={<AdminDashboard />}
                />
                <Route path="createProduct" element={<CreateProduct />} />
                <Route path="createCategory" element={<CreateCategories />} />
                <Route path="createBlog" element={<CreateBlog />} />
                <Route path="createProject" element={<CreateProject />} />
                <Route path="categoryList" element={<CategoryList />} />
                <Route path="usersList" element={<UsersList />} />
                <Route path="orderList" element={<OrderList />} />
                <Route path="updateProduct/:id" element={<ProductList />} />
                <Route path="update/blog/:id" element={<UpdateBlog />} />
                <Route path="update/project/:id" element={<UpdateProject />} />
              </Route>
              {/* Private Routes */}

              <Route path="privateRoute" element={<UserRoute />}>
                <Route index element={<Profile />} />
                <Route path="MyOrders" element={<MyOrders />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
