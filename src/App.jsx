import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Categorys from "./pages/Categorys";
import CartProvider from "./hooks/CartProvider";
import AuthProvider from "./hooks/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import SuccessPay from "./pages/SuccessPay";
import ErrorPay from "./pages/ErrorPay";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/category" element={<Categorys />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/*" element={<h1>404</h1>} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requereAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/errorPay"
              element={
                <ProtectedRoute>
                  <ErrorPay />
                </ProtectedRoute>
              }
            />
            <Route
              path="/successPay"
              element={
                <ProtectedRoute>
                  <SuccessPay />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
