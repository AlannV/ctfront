import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./Components/Auth/Context/authContext";

import Home from "./Components/Common/Home/Home";

import MovieDetails from "./Components/Movies/MovieDetails/MovieDetails";
import AdminMenu from "./Components/Admin/AdminMenu/AdminMenu";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register/Register";
import Schedule from "./Components/Schedule/Schedule";
import ScheduleByMovie from "./Components/Schedule/ScheduleByMovie";
import Room from "./Components/Room/Room";
import Cart from "./Components/BuyProcess/Cart/Cart";

import BanUser from "./Components/Admin/Users/BanUser/BanUser.js";
import ActivateUser from "./Components/Admin/Users/ActivateUser/ActivateUser";
import CreateUser from "./Components/Admin/Users/CreateUser/CreateUser.js";
import ResetUserPassword from "./Components/Admin/Users/ResetUserPassword/ResetUserPassword.js";
import UpgradeUser from "./Components/Admin/Users/UpgradeUser/UpgradeUser.js";
import DeleteUser from "./Components/Admin/Users/DeleteUser/DeleteUser.js";
import Purchases from "./Components/Admin/Users/Purchases/Purchases";

import CreateMovie from "./Components/Admin/Movies/CreateMovie/CreateMovie.js";
import DeleteMovie from "./Components/Admin/Movies/DeleteMovie/DeleteMovie.js";
import EditMovie from "./Components/Admin/Movies/EditMovie/EditMovie.js";

import CreateProduct from "./Components/Admin/Products/CreateProduct/CreateProduct.js";
import EditProduct from "./Components/Admin/Products/EditProduct/EditProduct.js";
import DeleteProduct from "./Components/Admin/Products/DeleteProduct/DeleteProduct.js";

import CreateSchedule from "./Components/Admin/Schedules/CreateSchedule/CreateSchedule";
import DeleteSchedule from "./Components/Admin/Schedules/DeleteSchedule/DeleteSchedule";

import CreateRoom from "./Components/Admin/Rooms/CreateRoom/CreateRoom";
import EditRoom from "./Components/Admin/Rooms/EditRoom/EditRoom";
import DeleteRoom from "./Components/Admin/Rooms/DeleteRoom/DeleteRoom";

import Success from "./Components/BuyProcess/Succes/Success";
import Pending from "./Components/BuyProcess/Pending/Pending";
import Fail from "./Components/BuyProcess/Fail/Fail";

import Products from "./Components/User/Products/Products";
import ProtectedRoute from "./Components/Auth/ProtectedRoute/ProtectedRoute.js";
import Error from "./Components/Common/Error/Error";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import PasswordChange from "./Components/User/MyProfile/PasswordChange";
import MyPurchases from "./Components/User/MyProfile/MyPurchases";

import { AboutUs } from "./Components/Common/Footer/FooterComponents/AboutUs";
import { ContactUs } from "./Components/Common/Footer/FooterComponents/ContactUs";
import { Terms } from "./Components/Common/Footer/FooterComponents/Terms";
import { MyProfile } from "./Components/User/MyProfile/MyProfile";
import { MyFavMovies } from "./Components/User/MyProfile/MyFavMovies";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router basename="/cinema">
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/schedule" element={<Schedule />} />
            <Route path="/schedule/:id" element={<Room />} />
            <Route exact path="/movie/:id" element={<MovieDetails />} />
            <Route path="/movie/buy/:id" element={<ScheduleByMovie />} />
            <Route exact path="/cart" element={<Cart />} />

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/terms" element={<Terms />} />

            <Route exact path="/contact" element={<ContactUs />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/myprofile" element={<MyProfile />} />
            <Route exact path="/myfavorites" element={<MyFavMovies />} />
            <Route exact path="/mycart" element={<Cart />} />
            <Route exact path="/mypurchases" element={<MyPurchases />} />
            <Route exact path="/resetpass" element={<PasswordChange />} />

            {/* Admin User Paths */}
            <Route
              exact
              path="/adminmenu"
              element={
                <ProtectedRoute>
                  <AdminMenu />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminmenu/createuser"
              element={
                <ProtectedRoute>
                  <CreateUser />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminmenu/upgradedemoteusers"
              element={
                <ProtectedRoute>
                  <UpgradeUser />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminmenu/resetuserpassword"
              element={
                <ProtectedRoute>
                  <ResetUserPassword />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminmenu/banuser"
              element={
                <ProtectedRoute>
                  <BanUser />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminmenu/deleteuser"
              element={
                <ProtectedRoute>
                  <DeleteUser />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/adminmenu/activateuser"
              element={
                <ProtectedRoute>
                  <ActivateUser />
                </ProtectedRoute>
              }
            />

            {/* Admin Movie Paths*/}
            <Route
              exact
              path="/adminmenu/createmovie"
              element={
                <ProtectedRoute>
                  <CreateMovie />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminmenu/editmovie"
              element={
                <ProtectedRoute>
                  <EditMovie />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminmenu/deletemovie"
              element={
                <ProtectedRoute>
                  <DeleteMovie />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/adminmenu/createproduct"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminmenu/editproduct"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/adminmenu/deleteproduct"
              element={
                <ProtectedRoute>
                  <DeleteProduct />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/adminmenu/createschedule"
              element={
                <ProtectedRoute>
                  <CreateSchedule />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/adminmenu/deleteschedule"
              element={
                <ProtectedRoute>
                  <DeleteSchedule />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/adminmenu/createroom"
              element={
                <ProtectedRoute>
                  <CreateRoom />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/adminmenu/editroom"
              element={
                <ProtectedRoute>
                  <EditRoom />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/adminmenu/deleteroom"
              element={
                <ProtectedRoute>
                  <DeleteRoom />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/adminmenu/purchases"
              element={
                <ProtectedRoute>
                  <Purchases />
                </ProtectedRoute>
              }
            />

            <Route exact path="/payment/success" element={<Success />} />
            <Route exact path="/payment/fail" element={<Fail />} />
            <Route exact path="/payment/pending" element={<Pending />} />

            {/* Error Route */}

            <Route path="*" element={<Error />} />
          </Routes>

          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
