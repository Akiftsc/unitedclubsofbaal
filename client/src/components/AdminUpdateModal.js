import React, { useState, useEffect } from 'react';
import AdminUpdateModalEditImage from "./AdminUpdateModalEditImage";
import AdminRemoveUserFromClub from "./AdminRemoveUserFromClub";
import axios from 'axios';

function AdminUpdateModal({ selectedUpdate, setClubs, clubs }) {

    const [clubName, setClubName] = useState("");
    const [clubDescription, setClubDescription] = useState("");


    useEffect(() => {

        setClubName(selectedUpdate.name)
        setClubDescription(selectedUpdate.description)
    }, [selectedUpdate]);


    const saveHandler = async (e) => {
        e.preventDefault();
        const b = {
            name: clubName,
            description: clubDescription,
        }

        try {
            const response = await axios.put(`http://192.168.1.29:4000/club/edit/${selectedUpdate._id}`, b, {
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    "authorization": JSON.parse(localStorage.getItem("authorization")),
                },
            });

            const data = response.data;
            if (data.acknowledged) {
                const updatedClubs = clubs.map((club) => {
                    if (club._id === selectedUpdate._id) {
                        return { ...club, name: b.name, description: b.description };
                    }
                    return club;
                });
                setClubs(updatedClubs);
            } else {
                alert("Bir hata oluştu!");
            }

        } catch (error) {
            console.log("**")
            console.error(error);
        }
    }


    return (
        <>
            <input type="checkbox" id="my_modal_4" className="modal-toggle" />
            <div className="modal " id="my_modal_4">
                <div className="modal-box bg-slate-800  flex align-center justify-center p-4">
                    <div className="form-control w-full max-w-xs">
                        <h1 className='text-center text-red-600 text-2xl'>Kulüp Güncelleme</h1>
                        <div className="avatar mt-5 flex w-full justify-between">
                            <label className="label ">
                                <span className="label-text text-white">Kulüp Resmi</span>
                            </label>
                            <div className="w-24 rounded-full">
                                <img src={selectedUpdate.img[0]} className="" alt='' />
                            </div>
                        </div>
                        <label className="label ">
                            <span className="label-text text-white">Kulüp İsmi</span>
                        </label>
                        <input onChange={(e) => setClubName(e.target.value)} type="text" value={clubName} className="input input-bordered w-full max-w-xs text-gray-500" />
                        <label className="label">
                            <span className="label-text text-white">Kulüp Açıklaması</span>
                        </label>
                        <textarea onChange={(e) => setClubDescription(e.target.value)} value={clubDescription} className="textarea textarea-bordered h-24 text-gray-500" />
                        <div className='mt-3 flex justify-end'>
                            <button className="btn btn-sm btn-warning" onClick={saveHandler}>
                                Kaydet
                            </button>
                        </div>
                        <p>Fotoğrafları Düzenle</p>

                        <AdminUpdateModalEditImage selectedUpdate={selectedUpdate} />
                        <AdminRemoveUserFromClub selectedUpdate={selectedUpdate} />
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_4">Close</label>
            </div>
        </>
    )
}

export default AdminUpdateModal