// App.js
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Order from "./pages/Order/Order";
import Payment from "./pages/Payment/Payment";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Product/products";
import CreateProduct from "./pages/Product/createProduct";
import Inventory from "./pages/Inventory/Inventory";
import CretateInventory from "./pages/Inventory/CreateInventory";
import Category from "./pages/Category/Category";
import Login from "./pages/User/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route
          path="/order"
          element={
            <ProtectedRoute allowedRoles={["Admin", "CRS", "Vendor"]}>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["Admin", "CRS", "Vendor"]}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-product"
          element={
            <ProtectedRoute allowedRoles={["Admin", "CRS", "Vendor"]}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["Admin", "CRS"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-inventory"
          element={
            <ProtectedRoute allowedRoles={["Admin", "CRS"]}>
              <CretateInventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute allowedRoles={["Admin", "CRS"]}>
              <Category />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
