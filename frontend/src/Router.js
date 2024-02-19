import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Account from './auth/Account';
import UsersMenagment from './admin/UsersMenagment';
import About from './pages/about/About';
import AllProducts from './pages/AllProducts';
import FavProducts from './components/product/managment(CRUD)/faves/FavProduct';
import ProductMangement from './components/product/managment(CRUD)/ProductMangement';
import AddOrEditProduct from './components/product/managment(CRUD)/AddOrEditProduct';
import Product from './pages/Product';
import Checkout from './pages/checkout/Checkout';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/product-management" element={<ProductMangement />} />
            <Route path="/faves" element={<FavProducts />} />
            <Route path="/product/add-edit/:id?" element={<AddOrEditProduct />} />
            <Route path="/user-management" element={<UsersMenagment />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    )
}
