"use client";
import React, { useEffect, useState } from "react";
import MobileContainer from "@/components/MobileContainer";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import SERVER_URL from "@/config/SERVER_URL";

function Assignments() {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        axios.get(SERVER_URL + '/user/details', {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then((response) => {
            if(response.data.volunteer.applied===false){
                router.push('/home')
            }
        }).catch((error) => {
            router.push('/login')
            localStorage.removeItem('token')
        })
        axios.get(SERVER_URL + '/user/get-assignments',{
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then((response) => {
            setAssignments(response.data.assignment) 
        })
    },[])
  const router = useRouter();
  return (
    <MobileContainer>
      <div className="w-full h-full bg-[#F1F4FF] flex flex-col items-center relative">
        <div className=" w-full  bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col border-[#C0C2CB)] shadow-lg shadow-[#C0C2CB)]   ">
          <MdArrowBackIosNew
            className=" text-lg cursor-pointer absolute left-4 mt-3   text-black z-50"
            onClick={() => router.back()}
          />
          <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
            Assignments{" "}
          </h1>
        </div>
        <div className="w-[92%] h-[80%] bg-white p-2  flex flex-col ">
          <div className="w-full flex  justify-center">
            <h1>
              {" "}
              <b>Assignment</b>
            </h1>
          </div>
          {
              assignments?.map((assignment:any)=>{
                  return(
                      <div className="w-full mt-7 border-b-4 border-[#F2F4F7] p-2">
                          <h2>{assignment?.title}</h2>
                          <h4 className="text-gray-500">{assignment?.description}</h4>
                          <h5>{assignment?.date}</h5>
                      </div>
                  )
              })
          }

        
        </div>
      </div>
    </MobileContainer>
  );
}

export default Assignments;
