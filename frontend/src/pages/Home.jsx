import { Route, Routes } from "react-router-dom"
import Header from "../components/Header"
import HomePage from "./client/HomePage"
import AboutPage from "./client/AboutPage"
import Test from "./test"
import UploadFilePage from "./client/UploadFilePage"
import MyOrdersPage from "./client/MyOrderPage"
import AddOrder from "./client/AddOrder"


function Home() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/addorder" element={<AddOrder />} />
        <Route path="/myorder" element={<MyOrdersPage />} />
        {/* <Route path="/pricing" element={< />} /> */}
      </Routes>
    </div>
  );
}

export default Home;
