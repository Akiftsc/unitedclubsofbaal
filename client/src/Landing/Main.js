import React from 'react'
import { Link } from 'react-router-dom'

function Main() {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'linear-gradient(rgba(220, 44, 43, 0.40), rgba(220, 44, 43, 0.90)), url(03142408_a_blok_-_Kopya.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content flex flex-col md:flex-row animation-text">
                <div className='max-w-md'>
                    <img lazy="true" src='https://hcverobeach.clubs.harvard.edu/images/vault/43.png' />
                </div>
                <div className="max-w-md">
                    <h1 className='mb-5 text-5xl font-bold text-white tracking-tighter'>
                        <span className='inline text-red-600'>BAAL</span>
                        Kulüpler Birliği
                    </h1>
                    <p className="mb-5">
                        Bülent Akarcalı Anadolu Lisesi Kulüpler Birliği için çok amaçlı yönetim sistemi.
                    </p>
                    <Link to="/clubs" className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-7 py-3 text-center mr-2'>
                        Kulüpler
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Main