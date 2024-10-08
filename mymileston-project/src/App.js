import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SneakersPage from "./pages/SneakersPage";
import BrandsPage from "./pages/BrandsPage";
import MyNavBar from "./components/MyNavBar";
import SneakerBrandList from "./components/SneakerBrandList";
import BrandSneakersList from "./components/BrandSneakersList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  
  return (

    <>
    <ToastContainer />

    <Router>
      <MyNavBar/>
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route path="/sneakers" element={<SneakersPage />}/>
        <Route path="/brands" element={<BrandsPage />}/>
        <Route path="/sneakerbrand" element={<SneakerBrandList />} />
        <Route path="/brandsneakers" element={<BrandSneakersList />} />
      </Routes>
    </Router>

</>
  );
}

