import React from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register';
import Home from "./pages/Home";
import Application from "./pages/Application";
import AdminLogin from "./pages/Admin/AdminLogin"
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Showuser from "./pages/Admin/ShowUser";
import BookingSlot from "./pages/Admin/BookingSlot";
import DbContext from "./components/Store/DbContext";

import "react-toastify/dist/ReactToastify.css"


export default function App() {
  return (
    <DbContext>

    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />    
        <Route exact path="/register" element={<Register />} />    
        <Route exact path="/" element={<Home />} />    
        <Route exact path="/apply" element={<Application />} />    
        <Route exact path="/admin/login" element={<AdminLogin />} />    
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} /> 
        <Route exact path="/admin/showUser" element={<Showuser/>}   />
        <Route exact path="/admin/BookingSlot" element={<BookingSlot/>}   />
       
      </Routes>
    </BrowserRouter>
    </DbContext>
  );
}



// export default App;
