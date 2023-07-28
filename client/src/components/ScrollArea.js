import React, { useEffect, useRef, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';



const ScrollAreaDemo = function ({ setPickedClub }) {
    const [clubs, setClubs] = useState([]);
    const parentRef = useRef();



    useEffect(() => {
        fetch('http://192.168.1.29:4000/clubs/').then(res => res.json()).then(data => setClubs(data)).catch(err => console.log(err));
    }, [])


    function clubClickHandler(e) {
        if (!e.target.parentElement.attributes.hasOwnProperty("id")) {
            setPickedClub(clubs.find((club) => club._id === e.target.id));
        } else {
            setPickedClub(clubs.find((club) => club._id === e.target.parentElement.id));
        }
    }


    return (
        <ScrollArea.Root className="w-full h-[500px] animate-fade-up animate-once animate-duration-300 rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA7 bg-slate-800 border">
            <ScrollArea.Viewport className="w-full h-full rounded">
                <div className="py-[15px] px-5" >
                    <div className="text-red-600 text-2xl text-center font-bold">
                        Kulüpler
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {clubs.map((club) => (
                            <label htmlFor="my_modal_3" onClick={clubClickHandler} id={club._id} key={club._id} className='flex align-center hover:opacity-70  justify-between p-4 bg-blackA5 border-l m-3 cursor-pointer shadow-[0_2px_5x] shadow-blackA7'>
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img className='rounded-full' src={club.img[0]} alt="clubImage" width={48} height={48} />
                                    </div>
                                </div>
                                <h2 className='text-white'>{club.name}</h2>
                            </label>
                        ))}
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
    )
};

export default ScrollAreaDemo;