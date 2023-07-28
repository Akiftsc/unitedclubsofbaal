/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from "axios"

import { useParams } from "react-router-dom";
import Navbar from './Landing/Navbar';


function ClubDetail() {

    let { id } = useParams();
    const [clubData, setClubData] = useState({
        img: [""]
    });

    useEffect(() => {
        axios.get(`http://192.168.1.29:4000/club/about/${id}`)
            .then(function (response) {
                return response.data;
            })
            .then((data) => {
                setClubData(data);
            })
            .catch((error) => console.error(error));
    }, [])


    return (
        <>
            <Navbar />
            <div className='container-md'>
                <section class="text-white body-font">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="flex flex-wrap w-full mb-20">
                            <div class="lg:w-1/2 mb-6 lg:mb-0 flex gap-2 align-center flex-col lg:flex-row">
                                <span className='w-28'>
                                    <img className='rounded-full object-center' src={clubData.img[0]} />
                                </span>
                                <h1 class="sm:text-4xl text-2xl font-medium title-font mb-2 text-white text-center grid align-center">
                                    {clubData.name} Kulübü
                                </h1>
                            </div>
                            <p class="lg:w-1/2 w-full leading-relaxed text-white">
                                {clubData.description}
                            </p>
                        </div>
                        <Swiper
                            pagination={{
                                type: 'progressbar',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            lazy={true}
                        >
                            {
                                clubData.img.map((img, index) => (
                                    <>
                                        {index > 0 &&

                                            <SwiperSlide className='aspect-w-16 aspect-h-9'>
                                                <img lazy="true" className='w-full object-cover' src={img} />
                                            </SwiperSlide>
                                        }
                                    </>
                                ))
                            }
                        </Swiper>
                    </div>
                </section>
                <ScrollArea.Root className="rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7 bg-slate-800 m-5">
                    <ScrollArea.Viewport className="w-full h-full rounded">
                        <div className="py-[15px] px-5">
                            <div className="text-red-600 text-[15px] leading-[18px] font-medium">
                                Kulüp Üyeleri
                            </div>
                            {clubData.participants !== undefined ? (
                                <>
                                    {clubData.participants.map((participant, index) => (
                                        <div
                                            className="text-white text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-slate-900"
                                        >
                                            {clubData.owner && participant.email === clubData.owner.email && (<a className='text-red-600'>(Başkan) </a>)}
                                            {participant.name}
                                        </div>
                                    ))}
                                </>
                            ) : <>
                                <h1 className='text-xl text-red-600'>
                                    Bu kulübün hiç bir üyesi yok 😭
                                </h1>
                            </>}
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                        className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                        orientation="vertical"
                    >
                        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar
                        className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                        orientation="horizontal"
                    >
                        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner className="bg-blackA8" />
                </ScrollArea.Root>
            </div>
        </>
    )
}

export default ClubDetail