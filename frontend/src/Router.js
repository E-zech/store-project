import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Account from './auth/Account';
import UsersMenagment from './admin/UsersMenagment';
import About from './pages/about/About';
import Home from './pages/about/Home';
import FavProducts from './components/product/faves/FavProduct';
import EditProduct from './components/product/edit/EditProduct';
import AddProduct from './components/product/add/AddProduct';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/faves" element={<FavProducts />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/admin" element={<UsersMenagment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    )
}
