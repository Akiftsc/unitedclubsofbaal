import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Login';
import Admin from './Admin';
import Register from './Register';
import Landing from './Landing/';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Profile from './Profile/';
import ClubDetail from './ClubDetail';
import Navbar from './Landing/Navbar';
import Footer from './Landing/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clubs">
            <Route path="" element={<App />} />
            <Route path=":id" element={<ClubDetail />} />
          </Route>
          <Route path="*" element={<h1 className='text-center text-4xl text-white'>404 LoL</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

