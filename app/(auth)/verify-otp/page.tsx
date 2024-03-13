"use client"
// Import necessary modules and components
import MobileContainer from '@/components/MobileContainer'
import OTPInput from '@/components/OTPInput'
import SERVER_URL from '@/config/SERVER_URL'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function VerifyOTP() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(60);
    const [otp, setOtp] = useState(0);
    const [state, setState] = useState(false);
    useEffect(() => {
        // Implement your OTP verification logic here
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(SERVER_URL + '/user/details', {
                headers: {
                    'x-access-token': token
                }
            }).then(async (res) => {
                if (!res.data) {
                    router.push("/login");
                    localStorage.removeItem('token');
                }
                if (res.data.isVerified) {
                    router.push("/home");
                } else {
                    setEmail(res.data.email);
                    // Send OTP on component load
                    setState((prev)=>!prev);
                }
            })
        } else {
            router.push("/login");
        }
    }, []); // The empty dependency array ensures this effect runs only once on component mount
    useEffect(() => {
        handleOTPRequest()
    },[state])
    // Function to handle OTP request
    const handleOTPRequest = () => {
        console.log(email);
        if (!email) return
        axios.post(SERVER_URL + '/user/sendOTP', {
            email: email
        }).then((response) => {
            toast.success("OTP sent successfully");
        }).catch((error) => {
            toast.error("Error sending OTP");
        })
    };

    // Function to handle OTP verification
    const handleOTPVerification = (otp: number) => {
        // Implement your OTP verification logic here
        setOtp(Number(otp));
    };
    const handleVerifySubmit = () => {
        // Implement your OTP verification logic here
        if (otp) {
            axios.post(SERVER_URL + '/user/verifyOTP', {
                email: email,
                otp: Number(otp)
            }).then((response) => {
                if (response.status === 200) {
                    router.replace("/home");
                }
            }).catch((error) => {
                toast.error("Invalid OTP");
            })
        }
    }
    return (
        <>
            <MobileContainer>
                <div className='w-full h-full flex flex-col' style={{ backgroundImage: "url('/images/bg_main.jpg')", backgroundSize: "cover" }}>
                    <div className='w-full h-20 flex justify-center items-center mt-28'>
                        <img src="/images/imagecontri.png" alt="" className='w-24' />
                    </div>
                    <div className='flex-1 justify-center items-center bg-neutral-900 rounded-t-3xl mt-20'>
                        <div className="input-container pt-10 pb-5 flex flex-col w-full justify-center items-center">
                            <OTPInput length={6} onVerify={handleOTPVerification} />
                            <p className='text-white/20 mt-4 cursor-pointer' onClick={handleOTPRequest}>Resend</p>
                        </div>
                        <div className='w-full flex justify-center items-center '>
                            <button className='bg-white text-blue-900 w-80 text-xl py-2 rounded-xl font-semibold' onClick={handleVerifySubmit}>Verify</button>
                        </div>
                    </div>
                </div>
            </MobileContainer>
        </>
    );
}

export default VerifyOTP;
