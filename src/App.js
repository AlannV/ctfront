import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./Components/Auth/authContext";

import Home from "./Components/Common/Home";

import MovieDetails from "./Components/Movies/MovieDetails";

import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Schedule from "./Components/Schedule/Schedule";
import ScheduleByMovie from "./Components/Schedule/ScheduleByMovie";
import Room from "./Components/Room/Room";
import Cart from "./Components/BuyProcess/Cart";

import AdminMenu from "./Components/Admin/AdminMenu";
import Purchases from "./Components/Admin/Purchases";
import CreateMovie from "./Components/Admin/CreateMovie.js";
import DeleteMovie from "./Components/Admin/DeleteMovie.js";
import EditMovie from "./Components/Admin/EditMovie.js";
import EditProduct from "./Components/Admin/EditProduct.js";
import DeleteProduct from "./Components/Admin/DeleteProduct.js";
import DeleteSchedule from "./Components/Admin/DeleteSchedule";
import EditRoom from "./Components/Admin/EditRoom";
import DeleteRoom from "./Components/Admin/DeleteRoom";

import Success from "./Components/BuyProcess/Success";
import Pending from "./Components/BuyProcess/Pending";
import Fail from "./Components/BuyProcess/Fail";

import Products from "./Components/User/Products";
import ProtectedRoute from "./Components/Auth/ProtectedRoute.js";
import Error from "./Components/Common/Error";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import PasswordChange from "./Components/User/PasswordChange";
import MyPurchases from "./Components/User/MyPurchases";

import { AboutUs } from "./Components/Common/Footer/AboutUs";
import { ContactUs } from "./Components/Common/Footer/ContactUs";
import { Terms } from "./Components/Common/Footer/Terms";
import { MyProfile } from "./Components/User/MyProfile";
import { MyFavMovies } from "./Components/User/MyFavMovies";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
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
              path="/adminmenu/deleteschedule"
              element={
                <ProtectedRoute>
                  <DeleteSchedule />
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
