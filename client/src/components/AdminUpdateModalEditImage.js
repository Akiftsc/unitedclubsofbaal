import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function AdminUpdateModalEditImage({ selectedUpdate }) {
    const [clubImages, setClubImages] = useState(selectedUpdate.img);
    const [clubImg, setClubImg] = useState(undefined);

    const cloudinaryRef = useRef(null);
    const widgetRef = useRef(null);
    let imgArray = [];
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "defq71a8p",
            uploadPreset: "izrgvlxy",
        }, (error, result) => {
            if (result.event === "queues-end") {
                result.info.files.map(file => imgArray.push(file.uploadInfo.url))
                setClubImg([...imgArray]);
                setClubImages([...clubImages, imgArray]);
                axios.put(`http://192.168.1.29:4000/club/edit/${selectedUpdate._id}`, { img: [...clubImages, imgArray].flat() }, {
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                        "authorization": JSON.parse(localStorage.getItem("authorization")),
                    },
                });
            }
        })
    }, [])

    const removeImgHandler = (e) => {
        e.preventDefault();
        const imgIndex = parseInt(e.target.parentElement.getAttribute('index'));
        const newClubImages = clubImages.filter((img, index) => index !== imgIndex);
        setClubImages(newClubImages)
        axios.put(`http://192.168.1.29:4000/club/edit/${selectedUpdate._id}`, { img: newClubImages }, {
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem("authorization")),
            },
        });
    };


    return (
        <>
            <div className='container-md'>
                <Swiper
                    pagination={{
                        type: 'progressbar',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        clubImages.map((img, index) => (
                            <SwiperSlide index={index} className='aspect-w-16 aspect-h-9 relative group'>
                                <img className='object-cover w-full' src={img} />
                                <a onClick={removeImgHandler} className='hidden group-hover:flex btn w-20 h-4 btn-error absolute inset-0 m-auto items-center justify-center'>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor"></path></svg>
                                </a>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className="container-md avatar mt-5 flex w-full justify-between">
                <label className="label">
                    <span className="label-text text-white">Resim Ekle</span>
                </label>
                <div className="w-24 rounded">
                    {clubImg ? (<>{clubImg.map((src) => <img id='uploadedimage' src={src} />)}</>) : <button onClick={() => widgetRef.current.open()} className='cursor-pointer w-5 h-5'>
                        <svg width="128" height="128" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z" fill="currentColor" ></path></svg>
                    </button>}
                </div>
            </div>
        </>
    )
}

export default AdminUpdateModalEditImage