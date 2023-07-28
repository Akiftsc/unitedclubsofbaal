/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import axios from 'axios';

function AdminRemoveUserFromClub({ selectedUpdate }) {

    const [users, setUsers] = useState(selectedUpdate.participants);

    const removeHandler = async (e) => {
        const id = e.target.parentElement.parentElement.getAttribute("id");
        try {
            const response = await axios.put(`http://192.168.1.29:4000/club/removeparticipant/${id}`, { club: selectedUpdate, authorization: JSON.parse(localStorage.getItem("authorization")) }, {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem("authorization")),
            });

            if (response.data.success) {
                alert("Katılımcı Silindi :(")
                setUsers(users.filter((user) => user._id !== id));

            } else {
                alert("Bir hata oluştu :(")
            };
        } catch (error) {
            alert("Bir hata oluştu :(")
        }

    }

    const authHandler = async (e, process) => {
        const id = e.target.parentElement.parentElement.getAttribute("id");
        const b = {
            role: "headofclub",
            id: id,
            process,
            club: selectedUpdate,
        };
        const response = await axios.post(`http://192.168.1.29:4000/user/auth/`, b, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem("authorization")),
            },
        });

        if (response.status === 200) {
            alert("Yetkilendirme Başarılı!")
        } else {
            alert("Bir Hata Meydana Geldi!")
        }
    }


    return (
        <div className='container-md text-white'>
            <ScrollArea.Root className="rounded w-full overflow-hidden shadow-[0_2px_10px] shadow-blackA7 bg-slate-800 m-5">
                <ScrollArea.Viewport className="w-full h-full rounded">
                    <div className="py-[15px] px-5">
                        <div className="text-red-600 text-[15px] leading-[18px] font-medium">
                            Kulüp Üyeleri
                        </div>
                        {users !== undefined ? (
                            <>
                                {users.map((user, index) => (
                                    <div
                                        id={user._id}
                                        key={index}
                                        className="text-white text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-slate-900 "
                                    >
                                        {user.email === selectedUpdate.owner.email && (<a className='text-red-600'>(Başkan) </a>)}
                                        {user.name}
                                        <div className='my-2'>
                                            <a className='btn btn-error btn-xs' onClick={removeHandler}>
                                                at
                                            </a>
                                            <a className='btn btn-info btn-xs mx-2' onClick={(e) => authHandler(e, "auth")}>
                                                kurucu yap
                                            </a>
                                            <a className='btn btn-info btn-xs' onClick={(e) => authHandler(e, "unauth")}>
                                                kuruculuğu al
                                            </a>
                                        </div>
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
    )
}

export default AdminRemoveUserFromClub