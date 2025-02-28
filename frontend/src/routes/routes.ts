import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PropertyDetail from "../pages/PropertyDetail";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
    );
};

export default AppRoute;

