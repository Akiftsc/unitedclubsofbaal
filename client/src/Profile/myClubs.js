import React from 'react';
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Link } from 'react-router-dom';


function MyClubs({ clubData }) {
    return (
        <div className='container-md my-4 bg-slate-800 shadow-[0_2px_10px] shadow-blackA7 p-3'>
            <ScrollArea.Root className="w-2/5 rounded overflow-hidden bg-slate-800">
                <ScrollArea.Viewport className="w-full h-full rounded">
                    <div className="py-[15px] px-5" >
                        <div className="text-red-600 text-2xl text-center font-bold">
                            Üyesi olduğum kulüpler
                        </div>
                        <div className='grid grid-cols-1 animate-fade-left animate-once'>
                            {clubData.length > 0 ? (
                                <>
                                    {clubData.map((club) => (
                                        <label htmlFor="my_modal_3" id={club._id} key={club._id} className='flex flex-col align-center justify-between md:flex-row  hover:opacity-70  p-4 bg-blackA5 border-l m-3 shadow-[0_2px_5x] shadow-blackA7'>
                                            <div className="avatar">
                                                <div className="w-24 rounded-full">
                                                    <img className='rounded-full text-center' src={club.img[0]} alt="clubImage" width={48} height={48} />
                                                </div>
                                            </div>
                                            <span>
                                                <h2 className='text-white'>{club.name}</h2>
                                                <Link to={`/clubs/${club._id}`} className='text-red-600 underline cursor-pointer'>
                                                    Detay
                                                </Link>
                                            </span>
                                        </label>
                                    ))}
                                </>
                            ) : <h1 className='text-3xl text-center text-white'>Hiç bir kulübe üye değilsin 😿 </h1>}

                        </div>
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
    )
}

export default MyClubs