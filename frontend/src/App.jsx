import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/UserDashboard";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";  
import OrderDetails from "./pages/OrderDetails";  
import MessageUs from "./pages/MessageUs";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/products/add"
          element={<AddProduct />}
        />
        <Route
  path="/admin/products/edit/:id"
  element={<EditProduct />}
/>
<Route path="/profile" element={<Profile />} />
<Route path="/user" element={<UserDashboard />} />
<Route path="/orders" element={<Orders />} />
<Route path="/checkout" element={<Checkout />} />
<Route
  path="/orders/:orderId"
  element={<OrderDetails />}
/>
<Route path="/message" element={<MessageUs />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;