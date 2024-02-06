import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Account from './auth/Account';
import MyCards from './components/product/my-products/MyProducts';
import FavCards from './components/product/faves/FavProduct';
import UsersMenagment from './admin/UsersMenagment';
import About from './pages/about/About';
import EditCards from './components/product/edit/EditProduct';
import Home from './pages/Home';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-cards" element={<MyCards />} />
            <Route path="/favorite" element={<FavCards />} />
            <Route path="/edit-cards/:id" element={<EditCards />} />
            <Route path="/admin" element={<UsersMenagment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    )
}
