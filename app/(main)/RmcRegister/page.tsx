"use client";
// import BottomNav from '@/components/BottomNav';
// import Sidebar from "@/components/sidebar";
import MobileContainer from "@/components/MobileContainer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPhone, FaUser } from "react-icons/fa";

import { MdArrowBackIosNew, MdOutlineMailOutline } from "react-icons/md";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import axios from "axios";

import { FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import SERVER_URL from "@/config/SERVER_URL";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";

// import moment from 'moment';
// import './events.css'
// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];
function Rmc() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [booth, setBooth] = useState("");
  const [district, setDistrict] = useState("");
  const [assembly, setAssembly] = useState("");
  const [constituency, setConstituency] = useState("");
  const [mandalamMember, setMandalamMember] = useState("");
  const [mandlamPresident, setMandlamPresident] = useState("");
  const [phone, setPhone] = useState("");
  const [districtList, setDistrictList] = useState([]);

  const [constituencyList, setConstituencyList] = useState([]);

  const [assemblyList, setAssemblyList] = useState([]);

  const [boothList, setBoothList] = useState([]);
  const [boothRule, setBoothRule] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    axios
      .get(`${SERVER_URL}/user/protected`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
     
        axios
          .get(SERVER_URL + "/user/details", {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          })
          .then((response) => {
            setUserData(response.data);
            setDistrict(response.data.district);
            setConstituency(response.data.assembly);
            axios
              .get(
                `${VOLUNTEER_URL}/admin/state-districtV1?district=${district}&constituency=${response.data.assembly}`,
                {
                  // Use the updated district value
                  headers: { "x-access-token": localStorage.getItem("token") },
                }
              )
              .then((userResponse) => {
                if (userResponse.status === 200) {
                  setAssemblyList(userResponse.data);
                }
              })
              .catch((err) => {
                console.log(err.response.data);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);
  // useEffect(() => {
  // axios.get(SERVER_URL + "/admin/state-districtV1").then((res) => {
  //   setDistrictList(res.data);
  // });

  // }, []);
  // const handleDistrictChange = (e: any) => {
  //   const selectedDistrict = e.target.value; // Get the selected district from the event

  //   setDistrict(selectedDistrict); // Update the district state with the selected district

  //   axios
  //     .get(
  //       `${SERVER_URL}/admin/state-districtV1?district=${selectedDistrict}`,
  //       {
  //         // Use the updated district value
  //         headers: { "x-access-token": localStorage.getItem("token") },
  //       }
  //     )
  //     .then((userResponse) => {
  //       if (userResponse.status === 200) {
  //         setConstituencyList(userResponse.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // };

  // const handleConstituencyChange = (e: any) => {
  //   if (district == "") {
  //     toast.error("Select The District");
  //   }
  //   const selectedConstituency = e.target.value; // Get the selected district from the event

  //   setConstituency(selectedConstituency); // Update the district state with the selected district

  //   axios
  //     .get(
  //       `${SERVER_URL}/admin/state-districtV1?district=${district}&constituency=${selectedConstituency}`,
  //       {
  //         // Use the updated district value
  //         headers: { "x-access-token": localStorage.getItem("token") },
  //       }
  //     )
  //     .then((userResponse) => {
  //       if (userResponse.status === 200) {
  //         setAssemblyList(userResponse.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // };
  const handleAssemblyChange = (e: any) => {
    if (district == "") {
      toast.error("Select The District");
    }
    if (constituency == "") {
      toast.error("Select The Constituency");
    }
    const selectedAssembly = e.target.value; // Get the selected district from the event

    setAssembly(selectedAssembly); // Update the district state with the selected district

    axios
      .get(
        `${VOLUNTEER_URL}/admin/state-districtV1?district=${district}&constituency=${constituency}&assembly=${selectedAssembly}`,
        {
          // Use the updated district value
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      )
      .then((userResponse) => {
        if (userResponse.status === 200) {
          setBoothList(userResponse.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        `${SERVER_URL}/user/apply-as-volunteer`,
        {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          district: district,
          assembly,
          booth,
          boothRule: [booth],
          constituency: constituency,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <MobileContainer>
      <div
        className="profile-container w-full min-h-screen flex flex-col justify-start items-center relative "
        style={{
          backgroundImage: "url('images/backimg.jpeg')",
          backgroundSize: "cover",
        }}
      >
        <MdArrowBackIosNew
          className="text-2xl cursor-pointer absolute top-5 left-5 top-text"
          onClick={() => router.back()}
        />

        <h1 className="text-2xl text-center font-bold my-7 top-text d3 text-black">
          Add Volunteer
        </h1>
        <div className="flex   justify-center items-center bg-white p-6 m-4 rounded-3xl h-min shadow-xl shadow-black ">
          <div className="input-container  pb-5 flex flex-col w-full justify-center items-center ">
            {/* <div className="max-w-sm mx-auto">
              <label
                htmlFor="district"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select District
              </label>
              <select
                id="district"
                className=" mb-2 border text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
                onChange={(e) => handleDistrictChange(e)}
              >
                <option>Select an option</option>
                {districtList.map((district: any) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className="max-w-sm mx-auto">
              <label
                htmlFor="constituency"
                className="block mb-2  text-sm font-medium text-gray-900 dark:text-black"
              >
                Select Constituency
              </label>
              <select
                id="constituency"
                onChange={(e) => handleConstituencyChange(e)}
                className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
              >
                <option>Select an option</option>
                {constituencyList.map((constituency: any) => (
                  <option key={constituency} value={constituency}>
                    {constituency}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="max-w-sm mx-auto">
              <label
                htmlFor="assembly"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select Mandlam
              </label>
              <select
                id="assembly"
                onChange={(e) => handleAssemblyChange(e)}
                className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-900 focus:border-blue-900 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
              >
                <option>Select an option</option>
                {assemblyList.map((assembly: any) => (
                  <option key={assembly} value={assembly}>
                    {assembly}
                  </option>
                ))}
              </select>
            </div>
            <div className="max-w-sm mx-auto">
              <label
                htmlFor="booth"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select Booth
              </label>
              <select
                id="booth"
                onChange={(e) => setBooth(e.target.value)}
                className="bg-gray-50 mb-2 border border-gray-300 text-sm rounded-xl overflow-x-scroll focus:ring-blue-900 focus:border-blue-800 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
              >
                <option>Select an option</option>
                {boothList.map((booth: any) => (
                  <option key={booth} value={booth.number}>
                    {booth.number} {booth.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="max-w-sm mx-auto">
              <label
                htmlFor="booth"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select Booth Rule
              </label>
              {boothList.map((booth: any) => (
                <div key={booth.number}>
                  <input
                    type="checkbox"
                    id={`booth-${booth.number}`}
                    value={booth.number}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setBoothRule((prev) => [...prev, booth.number]);
                      } else {
                        setBoothRule((prev) =>
                          prev.filter((num) => num !== booth.number)
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={`booth-${booth.number}`}
                    style={{ color: "black" }}
                  >
                    {booth.number} {booth.name}
                  </label>
                </div>
              ))}
            </div> */}

            <div className="w-full mx-auto my-5 px-6">
              <button
                className="bg-primary text-white p-4 w-full py-3 rounded-lg bg-indigo-800"
                onClick={handleSubmit}
              >
                Add Volunteer
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}

export default Rmc;
