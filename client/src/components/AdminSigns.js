import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSigns() {

    const [attends, setAttends] = useState([]);

    useEffect(() => {

        fetch('http://192.168.1.29:4000/attends/')
            .then(res => res.json())
            .then(data => setAttends(data))
            .catch(err => console.log(err));
    }, [])

    const removeHandler = async (e) => {
        const id = e.target.parentElement.parentElement.id;
        console.log(id)
        const response = await axios.get(`http://192.168.1.29:4000/attend/remove/${id}`, {
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem('authorization'))
            },
        });

        const data = response;
        if (data.data.acknowledged) {
            setAttends(attends.filter(attend => attend._id !== id));
        }
    }


    const confirmHandler = async (e) => {
        const id = e.target.parentElement.parentElement.id;
        const response = await axios.get(`http://192.168.1.29:4000/attend/confirm/${id}`, {
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem('authorization'))
            },
        });

        const data = response.data;
        if (data.success) {
            setAttends(attends.filter(attend => attend._id !== id));
        }
    }


    return (
        <div className="overflow-x-auto w-5/5 lg:w-3/5 rounded shadow-[0_2px_10px] shadow-blackA7 bg-slate-800 border">
            <h1 className='text-center text-2xl text-bold underline text-white'>Katılım İstekleri</h1>

            {attends.length > 0 ?
                (<table className="table">
                    <thead className='text-white'>
                        <tr className='text-lg'>
                            <th>İsim</th>
                            <th>Email</th>
                            <th>Kulüp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attends.map((attend, key) => (
                            <tr id={attend._id} key={key}>
                                <td>
                                    {attend.name}
                                </td>
                                <td>
                                    {attend.email}
                                    <br />
                                </td>
                                <td>{attend.userClub.name} Kulübü</td>
                                <th>
                                    <button className="btn btn-success btn-xs" onClick={confirmHandler}>Onayla</button>
                                </th>
                                <th>
                                    <button className="btn btn-error btn-xs" onClick={removeHandler}>Sil</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>) : <p className='text-center mt-4'>Henüz istek yok 😺</p>}
        </div>
    )
}

export default AdminSigns