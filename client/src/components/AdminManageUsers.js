/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import axios from "axios";


function AdminManageUsers({ selectedUpdate }) {
    const [users, setUsers] = useState(undefined);


    useEffect(() => {

        fetch('http://192.168.1.29:4000/users/all', {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                authorization: JSON.parse(localStorage.getItem('authorization'))
            },
        })
            .then(res => res.json())
            .then(data => setUsers(data.users))
            .catch(err => console.log(err));
    }, []);


    const authHandler = async (e, process) => {
        const id = e.target.parentElement.parentElement.getAttribute('id');

        const b = {
            role: "admin",
            id: id,
            process,
            club: selectedUpdate
        };
        const response = await axios.post(`http://192.168.1.29:4000/user/auth/`, b, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem("authorization")),
            },
        });

        if (response.status === 200) {
            const updatedUser = response.data.user;

            // Find the index of the user to be updated in the users array
            const index = users.findIndex((user) => user._id === updatedUser._id);

            if (index !== -1) {
                // If the user is found in the users array, update the users state
                setUsers((prevUsers) => {
                    const newUsers = [...prevUsers]; // Create a new array to avoid directly mutating the state
                    newUsers[index] = updatedUser; // Update the user at the specified index
                    return newUsers; // Set the new array as the updated users state
                });
            }
        } else {
            alert("Bir Hata Meydana Geldi!")
        }
    }

    const removeUser = async (e) => {
        const id = e.target.parentElement.parentElement.getAttribute('id');

        const response = await axios.get(`http://192.168.1.29:4000/user/remove/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "authorization": JSON.parse(localStorage.getItem("authorization")),
            },
        });

        if (response.status === 200) {
            setUsers(users.filter(user => user._id !== id));
        } else {
            alert("Bir Hata Meydana Geldi!")
        }

    }


    return (
        <div className="overflow-x-auto w-5/5 lg:w-3/5 rounded shadow-[0_2px_10px] shadow-blackA7 bg-slate-800 border">
            <h1 className='text-center text-2xl text-bold underline text-white'>Tüm Üyeler</h1>
            {users && (
                <>
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className='text-white'>
                                <th>İsim</th>
                                <th>Email</th>
                                <th>Yetkiler</th>
                                <th>Üye Olduğu kulüpler</th>
                                <th>Kurucu Olduğu Kulüpler</th>
                                <th>Yetkilendir</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr className='!bg-slate-800' id={user._id}>
                                    <th>{user.name}</th>
                                    <td>{user.email}</td>
                                    <td>{user.permissions.map((p) => <a>{p} </a>)}</td>
                                    <td>{user.participatingClubs.map((p) => <li>{p.name}</li>)}</td>
                                    <td>{user.ownering.map((o) => <a>{o.name}</a>)}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info my-2 text-xs" onClick={(e) => authHandler(e, "auth")}>Admin</button>
                                        <button className="btn btn-sm btn-info my-2 text-xs" onClick={(e) => authHandler(e, "unauth")}>unAdmin</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-error my-2 text-xs" onClick={removeUser}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}

export default AdminManageUsers