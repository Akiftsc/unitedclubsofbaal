/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';


function AdminAddClub({ setClubs }) {

    const [clubName, setClubName] = useState("");
    const [clubDescription, setClubDescription] = useState("");
    const [clubImg, setClubImg] = useState(undefined);
    let imgArray = [];
    const cloudinaryRef = useRef(null);
    const widgetRef = useRef(null);
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "defq71a8p",
            uploadPreset: "izrgvlxy",
        }, (error, result) => {
            if (result.event === "queues-end") {
                result.info.files.map(file => imgArray.push(file.uploadInfo.url))
                setClubImg([...imgArray]);
            }
        })
    }, [])

    const addHandler = async (e) => {
        e.preventDefault();

        const b = {
            name: clubName,
            description: clubDescription,
            img: clubImg,
            userId: JSON.parse(localStorage.getItem("user"))._id
        }

        try {
            const response = await axios.post("http://192.168.1.29:4000/club/add", b, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "authorization": JSON.parse(localStorage.getItem("authorization")),
                },
            });

            const data = response.data;
            if (data.name && data.description) {
                alert("Kulüp eklendi!");
                setClubs((clubs) => [...clubs, data]);
            } else {
                alert("Bir hata oluştu!");
            }
        } catch (error) {
            console.log("**")
            console.error(error);
        }
    }


    return (
        <div className='overflow-x-auto p-3 w-5/5 lg:w-3/5 rounded shadow-[0_2px_10px] shadow-blackA7 bg-slate-800 border'>
            <h1 className='text-center text-2xl text-bold underline text-white'>Yeni Kulüp Ekle</h1>
            <div className='form-control w-full max-w-xs flex flex-col justify-center mx-0 my-auto'>
                <div className="avatar mt-5 flex w-full justify-between">
                    <label className="label">
                        <span className="label-text text-white">Kulüp Resmi</span>
                    </label>
                    <div className="w-24 rounded">
                        {clubImg ? (<>{clubImg.map((src) => <img id='uploadedimage' src={src} />)}</>) : <button onClick={() => widgetRef.current.open()} className='cursor-pointer w-5 h-5'>
                            <svg width="128" height="128" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z" fill="currentColor" ></path></svg>
                        </button>}
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
                    <button className="btn btn-outline btn-success" onClick={addHandler}>Kaydet</button>
                </div>
            </div>
        </div>
    )
}

export default AdminAddClub