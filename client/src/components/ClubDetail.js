import React from 'react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ClubDetail({ pickedClub, setRegister, register }) {
    const [sure, setSure] = useState(false);
    const [toast, setToast] = useState(null);
    const [firstPerm, setFirstPerm] = useState(false);
    const [templateParams, setTemplateParams] = useState({});
    const navigate = useNavigate();



    const checkAdmin = async () => {
        const storedToken = JSON.parse(localStorage.getItem("authorization"));
        if (storedToken !== null) {
            try {
                const response = await axios.get(`http://192.168.1.29:4000/checkadmin/${JSON.parse(localStorage.getItem("authorization"))}`);
                const data = response.data;
                if (data.isLoggedIn) {
                    setSure(true);
                    setTemplateParams({ ...data.user, pickedClub });
                }
            } catch (error) {
                alert(error);
            }
        }
    }

    if (firstPerm) {
        if (localStorage.getItem("authorization") !== null) {
            checkAdmin();
            setFirstPerm(false);
        }
        else {
            setFirstPerm(false);
            alert("Kulübe katılabilmek için bir hesabınız olmalı.")
            navigate("/register");
        }
    }

    const joinClub = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://192.168.1.29:4000/attend", templateParams, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "authorization": JSON.parse(localStorage.getItem("authorization")),
                },
            });

            const data = response.data;
            if (data.success) {
                setToast(true);
                emailjs.send('service_rdm14rp', 'template_j3tmv2e', templateParams, 'oQT0rtKXghENul39r')
                    .then((response) => {
                        console.log('SUCCESS...', response.text);
                    }, (err) => {
                        console.log('FAILED...', err);
                    });
            } else {
                setToast(false);
                console.log(data.message);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }



    return (
        <div className='w-full p-3 rounded overflow-hidden mb-10 bg-slate-800 text-white'>
            <h1 className='text-center text-2xl mb-1'>
                {pickedClub.name} kulübü
            </h1>
            <p className='text-sm text-center my-5'>
                {pickedClub.description}
            </p>

            <Link to={`/clubs/${pickedClub._id}`} className='text-red-600 underline cursor-pointer'>
                Detay
            </Link>


            <div className='text-center mt-6' onClick={(e) => { setFirstPerm(true); e.target.style.display = "none" }}>
                <button className="btn btn-success">Kaydolmak ister misin?</button>
            </div>
            {sure &&
                <div className='text-center mt-6' onClick={joinClub}>
                    <button className="btn btn-success">Emin misin? kulüp sahibine bildirim gidecek.</button>
                </div>}
            {toast && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span>Başarıyla Gönderildi.</span>
                    </div>
                </div>
            )}

            {toast === false && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-danger">
                        <span>Bir Hata Oluştu</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ClubDetail