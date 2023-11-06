import { Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountLayout from "./AdminDashboard/pages/AccountLayout";
import Home from "./AdminDashboard/pages/Home/Home";
import CarsList from "./AdminDashboard/pages/CarsList/CarsList";
import NewCar from "./AdminDashboard/pages/NewCar/NewCar";
import ProfilePage from "./AdminDashboard/pages/ProfilePage/ProfilePage";
import CarPage from "./pages/CarPage";
import FilteredCarsPage from "./pages/FilteredCarsPage";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/allCars/:id" element={<CarPage />} />
          <Route path="/car/:id" element={<CarPage />} />
          <Route
            path="/filteredCars/:fromDate/:toDate/:selectedPickupLocation"
            element={<FilteredCarsPage />}
          />
          <Route path="/car/:id/:fromDate/:toDate" element={<CarPage />} />
        </Route>
        <Route path="/account/*" element={<AccountLayout />}>
          <Route path="" element={<Home />} />
          <Route path="carlist" element={<CarsList />} />
          <Route path="newcar" element={<NewCar />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="carlist/:id" element={<NewCar />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
