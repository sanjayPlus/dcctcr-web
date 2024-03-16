"use client";
import React, { useEffect, useState } from "react";
import MobileContainer from "@/components/MobileContainer";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import SERVER_URL from "@/config/SERVER_URL";
import axios from "axios";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";

function IdCreation() {
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>();

  useEffect(() => {
    if (!localStorage.getItem("volunteer-token")) {
      router.push("/dmc");
    }
    axios
      .get(`${VOLUNTEER_URL}/volunteer/protected`, {
        headers: {
          "x-access-token": localStorage.getItem("volunteer-token"),
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          await callImageApi();
        } else {
          localStorage.removeItem("volunteer-token");
          router.push("/dmc");
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("volunteer-token");
        router.push("/dmc");
      });
  }, []);
  const callImageApi = async () => {
    axios
      .get(`${VOLUNTEER_URL}/volunteer/download-logo`, {
        headers: {
          "x-access-token": localStorage.getItem("volunteer-token"),
        },
        responseType: "arraybuffer", // Set response type to arraybuffer
      })
      .then((response) => {
        // Convert the arraybuffer to base64
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        setImage(base64Image);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDownloadImage = () => {
    if (image) {
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${image}`;
      link.download = "logo.png";
      link.click();
    }
  };

  return (
    <MobileContainer>
      <div className="w-full h-full bg-[##F1F4FF] flex flex-col items-center relative bg-slate-100">
        <div className=" w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col   ">
          <MdArrowBackIosNew
            className=" text-lg cursor-pointer absolute left-4 mt-3   text-black z-50"
            onClick={() => router.back()}
          />
          <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
            {" "}
            DMC
          </h1>
        </div>
        <div className="w-[80%] gap-7 flex flex-col items-center justify-center ">
          {image && <img src={`data:image/png;base64,${image}`} alt="Logo" />}
          <button
            className="w-[80%] p-2 bg-blue-400 text-white rounded-lg "
            onClick={handleDownloadImage}
          >
            ID Creation
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}

export default IdCreation;