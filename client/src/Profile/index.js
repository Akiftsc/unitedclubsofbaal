import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyClubs from './myClubs';
import axios from 'axios';

function Profile() {
    const [userData, setUserData] = useState(null);
    const [clubData, setClubData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    const checkAdmin = async () => {
        const storedToken = JSON.parse(localStorage.getItem('authorization'));
        if (storedToken !== null) {
            try {
                const response = await axios.get(`http://192.168.1.29:4000/checkadmin/${storedToken}`);
                const data = response.data;

                if (data.isLoggedIn) {
                    setUserData(data.user);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    };

    const getClubData = async () => {
        const storedToken = JSON.parse(localStorage.getItem('authorization'));
        const res = await axios.get(`http://192.168.1.29:4000/myclubs/${storedToken}`);
        setClubData(res.data.clubs);
    }

    useEffect(() => {
        checkAdmin();
    }, []);

    useEffect(() => {
        if (userData) {
            setIsLoaded(true);
        }
        getClubData();
    }, [userData]);

    return (
        <>
            {isLoaded && (
                <>
                    <h1 className='text-center text-3xl text-white animate-fade-up animate-once animate-duration-200'>Merhaba {userData.name} {userData.permissions.includes("admin")
                        && (<a className='text-red-600'>(Admin)</a>)}</h1>
                    {clubData && (
                        <MyClubs clubData={clubData} />
                    )}
                </>
            )}
        </>
    );
}

export default Profile;
