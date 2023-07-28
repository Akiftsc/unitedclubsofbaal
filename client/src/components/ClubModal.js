import React from 'react';
import ClubDetail from './ClubDetail';

function ClubModal({ pickedClub, register, setRegister }) {
    return (
        <>
            <input type="checkbox" id="my_modal_3" className="modal-toggle" />
            <div className="modal bg-slate-800 shadow-[0_2px_10px] shadow-blackA7" id="my_modal_3">
                <div className="modal-box bg-slate-800 p-0" style={{ border: "none" }}>
                    <ClubDetail pickedClub={pickedClub} setRegister={setRegister} register={register} />
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_3">Close</label>
            </div>
        </>
    )
}

export default ClubModal