// App.js
import React from 'react';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Order from "./pages/Order/Order";
import Payment from "./pages/Payment/Payment";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router>
      <>
        <Header />
        <ToastContainer position="top-right" autoClose={5000} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Footer />
              </>
            }
          />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </>
    </Router>
  );
}
