import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from './components/AdminTable';
import AdminAddClub from './components/AdminAddClub';
import AdminSigns from './components/AdminSigns';
import AdminManageUsers from './components/AdminManageUsers';
import axios from 'axios';

function Admin() {
    const navigate = useNavigate();
    const [loadPage, setLoadPage] = useState(false)
    const [clubs, setClubs] = useState([]);

    const checkIsAdmin = async () => {
        axios.get(`http://192.168.1.29:4000/checkadmin/${JSON.parse(localStorage.getItem("authorization"))}`)
            .then(function (response) {
                return response.data;
            })
            .then((data) => {
                if (data.isAdmin) {
                    setLoadPage(true);
                    localStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    navigate("/login");

                }
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        checkIsAdmin();
        fetch('http://192.168.1.29:4000/clubs/')
            .then(res => res.json())
            .then(data => setClubs(data))
            .catch(err => console.log(err));
    }, [])
    return (
        <>
            {loadPage && (

                <div className='text-white'>
                    <h1 className='text-center text-3xl text-white'>
                        Admin Panel
                    </h1>
                    <div className='container-xl p-5 flex gap-8 flex-col lg:flex-row'>
                        <AdminTable clubs={clubs} setClubs={setClubs} />
                        <AdminAddClub clubs={clubs} setClubs={setClubs} />
                    </div>
                    <div className='container-xl p-5 flex gap-8 flex-col lg:flex-row mt-4'>
                        <AdminSigns />
                        <AdminManageUsers />
                    </div>
                </div>
            )}


        </>

    )
}

export default Admin