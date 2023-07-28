import React from 'react'
import { useState } from "react";
import axios from "axios";
import AdminUpdateModal from './AdminUpdateModal';

function AdminTable({ clubs, setClubs }) {

    const [selectedUpdate, setSelectedUpdate] = useState(null);



    const removeHandler = async (e) => {
        const id = e.target.parentElement.parentElement.id;
        const response = await axios.get(`http://192.168.1.29:4000/club/remove/${id}`, {
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem('authorization'))
            },
        });

        const data = response;
        if (data.data.acknowledged) {
            setClubs(clubs.filter(club => club._id !== id));
        }
    }

    const updateHandler = (e) => {
        const id = e.target.parentElement.parentElement.id;
        setSelectedUpdate(clubs.find(club => club._id === id));
    }




    return (
        <>
            <div className="overflow-x-auto w-5/5 lg:w-3/5 rounded shadow-[0_2px_10px] shadow-blackA7 bg-slate-800 border">
                <h1 className='text-center text-2xl text-bold underline text-white'>Kulüpler</h1>
                {
                    clubs.length > 0 ? (
                        <table className="table">
                            {/* head */}
                            <thead className='text-white'>
                                <tr className='text-lg'>
                                    <th>Resim</th>
                                    <th>İsim</th>
                                    <th>Açıklama</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clubs.map((club, key) => (
                                    <tr id={club._id} key={key}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={club.img[0]} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {club.name} Kulübü
                                            <br />
                                        </td>
                                        <td>{club.description.substring(0, 40)}...</td>
                                        <th>
                                            <label htmlFor="my_modal_4" className="btn btn-warning btn-xs" onClick={updateHandler}>Güncelle</label>
                                        </th>
                                        <th>
                                            <button className="btn btn-error btn-xs" onClick={removeHandler}>Sil</button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <h1 className='text-center text-2xl'>Henüz kulüp yok! 🙀</h1>
                }
            </div>
            {selectedUpdate && <AdminUpdateModal setClubs={setClubs} clubs={clubs} selectedUpdate={selectedUpdate} />}
        </>

    )
}

export default AdminTable