import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Order from "./pages/Order/Order";
import Products from "./pages/Product/products";
import CreateProduct from "./pages/Product/createProduct";

export default function App() {
  return (
    <Router>
      <Routes>
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
        <Route path="/order" element={<Order />} />

        {/* product routes */}
        <Route path="/products" element={<Products />} />
        <Route path="/create-product" element={<CreateProduct />} /> 
      </Routes>
    </Router>
  );
}
