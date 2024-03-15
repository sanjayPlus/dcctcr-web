"use client";
import React, { useEffect } from "react";
import MobileContainer from "@/components/MobileContainer";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import SERVER_URL from "@/config/SERVER_URL";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";

function Dmc() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    axios
      .get(SERVER_URL + "/user/details", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (localStorage.getItem("volunteer-token")) {
          axios.get(`${VOLUNTEER_URL}/volunteer/protected`,{
            headers: {
              "x-access-token": localStorage.getItem("volunteer-token"),
            },
          }).then((response)=>{
            if(response.status!==200){
              localStorage.removeItem("volunteer-token");
              router.push("/home");
            }
          }).catch((err)=>{
            console.log(err);
            localStorage.removeItem("volunteer-token");
            router.push("/home");
          })
        } else {
          axios
            .get(`${SERVER_URL}/user/login-as-volunteer`, {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            })
            .then((response) => {
              localStorage.setItem("volunteer-token", response.data.token);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch(() => {
        router.push("/login");
        localStorage.removeItem("token");
      });
  }, []);

  return (
    <MobileContainer>
      <div className="w-full h-full bg-[#F1F4FF] flex flex-col items-center relative">
        <div className=" w-full  bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col border-[#C0C2CB)] shadow-lg shadow-[#C0C2CB)]">
          <MdArrowBackIosNew
            className=" text-lg cursor-pointer absolute left-4 mt-3   text-black z-50"
            onClick={() => router.push("/home")}
          />
          <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
            {" "}
            DMC
          </h1>
        </div>
        <div className="w-[92%] h-[90%] bg-white p-2  flex flex-col gap-4 pb-18">
          <div className="flex gap-2 cursor-pointer" onClick={() => router.push("/idcard")}>
            <div className="w-[80%] rounded-s-2xl  bg-[#EAEDF8] flex items-center pr-16 justify-between p-3">
              <h1>IDCreator:</h1>
              <img src="/dmc/Groupdcc.png" alt="" />
            </div>
            <div className="w-[15%] rounded-e-2xl  bg-[#EAEDF8] flex items-center justify-center ">
              <img src="/dmc/Arrow_drop_right.png" alt="" />
            </div>
          </div>
          {/* 2 */}
          <div className="flex gap-2 cursor-pointer">
            <div className="w-[80%] rounded-s-2xl  bg-[#EAEDF8] flex items-center pr-16 justify-between p-3">
              <h1>Controlls:</h1>
              <img src="/dmc/controlls.png" alt="" />
            </div>
            <div className="w-[15%] rounded-e-2xl  bg-[#EAEDF8] flex items-center justify-center ">
              <img src="/dmc/Arrow_drop_right.png" alt="" />
            </div>
          </div>
          {/* 3 */}
          <div className="flex gap-2 cursor-pointer">
            <div className="w-[80%] rounded-s-2xl  bg-[#EAEDF8] flex items-center pr-16 justify-between p-3">
              <h1>Ente Boothil Congress (EBC):</h1>
              <img src="/dmc/hand.png" alt="" />
            </div>
            <div className="w-[15%] rounded-e-2xl  bg-[#EAEDF8] flex items-center justify-center ">
              <img src="/dmc/Arrow_drop_right.png" alt="" />
            </div>
          </div>
          {/* 4 */}
          <div className="flex gap-2 cursor-pointer" onClick={() => router.push("/whatsapp")}>
            <div className="w-[80%] rounded-s-2xl  bg-[#EAEDF8] flex items-center pr-16 justify-between p-3">
              <h1>WhatsApp Group:</h1>
              <img src="/dmc/whatsapp.png" alt="" />
            </div>
            <div className="w-[15%] rounded-e-2xl  bg-[#EAEDF8] flex items-center justify-center ">
              <img src="/dmc/Arrow_drop_right.png" alt="" />
            </div>
          </div>
          {/* 5 */}
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => router.push("/assignments")}
          >
            <div className="w-[80%] rounded-s-2xl  bg-[#EAEDF8] flex items-center pr-16 justify-between p-3">
              <h1>Assignments:</h1>
              <img src="/dmc/assignment.png" alt="" />
            </div>
            <div className="w-[15%] rounded-e-2xl  bg-[#EAEDF8] flex items-center justify-center ">
              <img src="/dmc/Arrow_drop_right.png" alt="" />
            </div>
          </div>
          {/* 6 */}
          <div className="flex gap-2 cursor-pointer" onClick={() => router.push("/reports")}>
            <div className="w-[80%] rounded-s-2xl  bg-[#EAEDF8] flex items-center pr-16 justify-between   p-3">
              <h1>Reports:</h1>
              <img src="/dmc/reports.png" alt="" />
            </div>
            <div className="w-[15%] rounded-e-2xl  bg-[#EAEDF8] flex items-center justify-center ">
              <img src="/dmc/Arrow_drop_right.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}

export default Dmc;
