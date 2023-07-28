/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


function Navbar() {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem("authorization") === null || localStorage.getItem("authorization") === undefined) {
            authContext.setIsLoggedIn(false);
        } else {
            authContext.setIsLoggedIn(true);
        }
    }, [])

    return (
        <div className="navbar shadow-[0_2px_10px] shadow-blackA7 bg-slate-800 text-white ">
            <div className="navbar-start w-2/5">
                <Link to="/" className='text-2xl font-bold text-white tracking-tighter cursor-pointer'>
                    <span className='inline text-red-600'>BAAL</span>
                    Kulüpler Birliği
                </Link>
            </div>

            <div className="navbar-end w-3/5">
                <ul class="menu-horizontal hidden md:flex px-1 !text-white">
                    <li className='navItem'>
                        <Link to="/clubs"
                            className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'>
                            Kulüpler
                        </Link>
                    </li>
                    {
                        authContext.isLoggedIn === false ? (
                            <>
                                <li className='navItem hover:opacity-70'><Link to="/login" className='hover:!text-white focus:text-white'>Giriş Yap</Link></li>
                                <li className='navItem hover:opacity-70'><Link to="/register" className='hover:!text-white focus:text-white'>Kayıt Ol</Link></li>
                            </>
                        ) :
                            (
                                <>
                                    <li className='navItem hover:opacity-70'><Link to="/profile" className='hover:!text-white'>Hesabım</Link></li>
                                    {authContext.isAdmin && (
                                        <>
                                            <li className='navItem hover:opacity-70'><Link to="/profile" className='hover:!text-white'>Hesabım</Link></li>
                                        </>
                                    )}
                                </>
                            )
                    }
                </ul>
                <ul className="flex w-full align-center justify-end md:hidden text-white m-0 p-0">
                    <li className='navItem'><Link to="/clubs">Kulüpler</Link></li>
                    {
                        authContext.isLoggedIn === false ? (
                            <>
                                <li className='navItem'><Link to="/login" >Giriş Yap</Link></li>
                                <li className='navItem'><Link to="/register">Kayıt Ol</Link></li>
                            </>
                        ) :
                            (
                                <>
                                    <li className='navItem'><Link to="/profile" >Hesabım</Link></li>
                                </>
                            )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar