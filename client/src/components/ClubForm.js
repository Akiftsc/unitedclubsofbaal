import React from 'react'
import * as Form from '@radix-ui/react-form';
import axios from 'axios';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';



function ClubForm({ pickedClub }) {
    const name = useRef();
    const email = useRef();
    const userClass = useRef();
    const [toast, setToast] = useState(null);



    const submitHandler = async (e) => {
        e.preventDefault();
        const b = {
            name: name.current.value,
            email: email.current.value,
            userClass: userClass.current.value,
            userClub: pickedClub.name,
        }

        const templateParams = {
            name: name.current.value,
            class: userClass.current.value,
            club: pickedClub.name,
            email: email.current.value,
        };

        try {
            const response = await axios.post("http://192.168.1.29:4000/attend", b, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "authorization": JSON.parse(localStorage.getItem("authorization")),
                },
            });

            const data = response.data;
            if (data.success) {
                setToast(true);
                emailjs.send('service_rdm14rp', 'template_j3tmv2e', templateParams, 'oQT0rtKXghENul39r')
                    .then((response) => {
                        console.log('SUCCESS...', response.text);
                    }, (err) => {
                        console.log('FAILED...', err);
                    });
            } else {
                setToast(false);
            }
        } catch (error) {
            console.log("**")
            console.error(error);
        }
    }

    return (
        <Form.Root className="w-5/5">
            <Form.Field className="grid mb-[10px]" name="email">
                <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Email</Form.Label>
                    <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                        Lütfen Email Adresini Gir
                    </Form.Message>
                    <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
                        Lütfen Email Adresini Gir
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                        type="email"
                        required
                        ref={email}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-[10px]" name="question">
                <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                        Ad Soyad
                    </Form.Label>
                    <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                        Lütfen Adını Eksiksiz Gir.
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 resize-none"
                        required
                        ref={name}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field className="grid mb-[10px]" name="question">
                <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                        Sınıf
                    </Form.Label>
                    <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                        Lütfen Sınıfını Eksiksiz Gir.
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 resize-none"
                        required
                        ref={userClass}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button onClick={submitHandler} className="box-border w-full text-red-600 shadow-blackA7 hover:opacity-70 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-blackA9 px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                    Gönder!
                </button>
            </Form.Submit>
            {toast && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span>Başarıyla Gönderildi.</span>
                    </div>
                </div>
            )}

            {toast === false && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-danger">
                        <span>Bir Hata Oluştu</span>
                    </div>
                </div>
            )}
        </Form.Root>
    )
}

export default ClubForm