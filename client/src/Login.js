import * as Form from '@radix-ui/react-form';
import { useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from './context/AuthContext';

function Login() {

    const authContext = useContext(AuthContext);

    const password = useRef();
    const email = useRef();
    const navigate = useNavigate();
    /*    if (localStorage.getItem("authorization") === null || localStorage.getItem("authorization") === undefined) {
           localStorage.setItem('authorization', JSON.stringify({ "d": "I'm undefined" }));
       }
    */
    const submitHandler = async (e) => {
        e.preventDefault();
        const b = {
            password: password.current.value,
            email: email.current.value
        };

        try {
            const response = await axios.post("http://192.168.1.29:4000/login", JSON.stringify(b), {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            if (data.auth) {
                localStorage.setItem('authorization', JSON.stringify(data.token));
                navigate("/profile");
            } else {
                alert("Yanlış şifre veya email");
            }
        } catch (error) {
            console.log("**")
            console.error(error);
        }
    };


    const checkAdmin = async () => {
        const storedToken = JSON.parse(localStorage.getItem("authorization")).d;
        if (storedToken !== null) {
            try {
                const response = await axios.get(`http://192.168.1.29:4000/checkadmin/${storedToken}`);
                const data = response.data;
                if (data.isAdmin) {
                    localStorage.setItem('authorization', JSON.stringify({ d: data.token }));
                    navigate("/profile");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }


    if (localStorage.getItem("authorization") !== null) {
        checkAdmin();
    }


    return (
        <div className='container-xl m-auto flex aling-center justify-center gap-5 flex-col'>
            <h1 className='text-2xl text-white text-center'>Giriş Yap.</h1>
            <Form.Root className="px-10 margin-0">
                <Form.Field className="grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Email</Form.Label>
                        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                            Lütfen email giriniz.
                        </Form.Message>
                        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
                            Lütfen email giriniz.
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
                <Form.Field className="grid mb-[10px]" name="email">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Şifre</Form.Label>
                        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                            Bir şifre yaz.
                        </Form.Message>
                        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
                            Bir şifre yaz.
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                            className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                            type='text'
                            required
                            ref={password}
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <button onClick={submitHandler} className="box-border w-full text-red-600 shadow-blackA7 hover:opacity-70 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-blackA9 px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                        Gönder!
                    </button>
                </Form.Submit>
            </Form.Root>
        </div>
    )
}

export default Login