"use client";
import MobileContainer from "@/components/MobileContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import nationalLeaders from "@/contants/nationalLeaders";
import stateLeaders from "@/contants/stateLeaders";
import districtLeaders from "@/contants/districtLeaders";
import toast from "react-hot-toast";
import axios from "axios";
import SERVER_URL from "@/config/SERVER_URL";
type Leader = {
  id: number;
  name: string;
  position: string;
  image: string;
  facebook: string;
  instagram: string;
  youtube: string;
};
function SocialMedia() {
  const [tab, setTab] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [national, setNational] = useState<Leader[]>(nationalLeaders);
  const [state, setState] = useState<Leader[]>(stateLeaders);
  const [district, setDistrict] = useState<Leader[]>(districtLeaders);
  const [lokSabha,setLokSabha] = useState<Leader[]>()
  const router = useRouter();

  const handleTouchStart = (event: any) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: any) => {
    setEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const deltaX = endX - startX;

    if (deltaX > 50 && tab > 1) {
      // Swipe right to decrease tab number
      setTab(tab - 1);
    } else if (deltaX < -50 && tab < 3) {
      // Swipe left to increase tab number
      setTab(tab + 1);
    }
  };
  const handleLink = (link: string) => {
    console.log(link);
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/admin/get-social-media?category=AICC`)
      .then((response) => {
 
        setNational(response.data.socialMediaSchema);
      });
  }, [tab]);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/admin/get-social-media?category=KPCC`)
      .then((response) => {
        setState(response.data.socialMediaSchema);
      });
  }, [tab]);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/admin/get-social-media?category=DCC`)
      .then((response) => {
        setDistrict(response.data.socialMediaSchema);
      });
  }, [tab]);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/admin/get-social-media?category=LokSabha`)
      .then((response) => {
        setDistrict(response.data.socialMediaSchema);
      });
  }, [tab]);
  return (
    <>
      <MobileContainer>
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="SocialMedia-container w-full  min-h-screen flex flex-col justify-start items-center relative "
          style={{
            backgroundImage: "url('images/backimg.jpeg')",
            backgroundSize: "cover",
          }}
        >
          <div className="SocialMedia-header w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col  ">
            <MdArrowBackIosNew
              className="text-lg cursor-pointer absolute top-5 left-5 text-black z-50"
              onClick={() => router.back()}
            />
            <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
              {" "}
              Media Accounts
            </h1>
          </div>
          <div className="SocialMedia-tabs w-[95%] h-[80vh] overflow-auto rounded-3xl shadow-lg p-6 bg-white scrollbar-container">
            <div className="tab-nav flex h-10 justify-between items-center cursor-pointer gap-3">
              
              <p
                className="font-semibold relative tab-1 text-sm text-center"
                onClick={() => setTab(0)}
              >
                Lok Sabha
                {tab === 0 && (
                  <span className="w-full h-[2px] bg-blue-700 rounded-full absolute -bottom-1 left-0"></span>
                )}
              </p>
              <p
                className="font-semibold relative tab-1 text-sm text-center"
                onClick={() => setTab(1)}
              >
                AICC
                {tab === 1 && (
                  <span className="w-full h-[2px] bg-blue-700 rounded-full absolute -bottom-1 left-0"></span>
                )}
              </p>
              <p
                className="font-semibold relative tab-2 text-sm text-center"
                onClick={() => setTab(2)}
              >
                KPCC
                {tab === 2 && (
                  <span className="w-full h-[2px] bg-blue-700 rounded-full absolute -bottom-1 left-0"></span>
                )}
              </p>
              <p
                className="font-semibold relative tab-3 text-sm text-center"
                onClick={() => setTab(3)}
              >
                DCC
                {tab === 3 && (
                  <span className="w-full h-[2px] bg-blue-700 rounded-full absolute -bottom-1 left-0"></span>
                )}
              </p>
            </div>
            <div className="tab-content mt-4 ">
              {tab === 0 && (
                <>
                  <div className="tab-1-content flex flex-col gap-1 ">
                    {lokSabha?.map((leaders: any, index: any) => (
                      <>
                        <div
                          key={index}
                          className="tab-card flex gap-3 relative mt-3 scrollbar-container"
                        >
                          <div className="tab-card-left relative h-20 w-20 ">
                          <img src={leaders.image} alt="" className="w-20 h-20 rounded-full object-cover" />
                          </div>
                          <div className="tab-card-right gap-3 relative h-auto w-48 w-55 ">
                            <p className="font-bold text-base text-blue-800 ">
                              {leaders.name}
                            </p>
                            <p className="text-xs font-semibold text-yellow-500">
                              {leaders.position}
                            </p>
                            <div className="tab-card-link flex  items-center">
                              <div
                                onClick={() => handleLink(leaders.facebook)}
                                className="tab-card-link flex justify-between items-center"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/facebook.png"
                                  alt=""
                                />
                              </div>
                              <div
                                onClick={() => handleLink(leaders.instagram)}
                                className="tab-card-link flex justify-between items-center pr-2"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/instagram.png"
                                  alt=""
                                />
                              </div>
                              <div
                                onClick={() => handleLink(leaders.youtube)}
                                className="tab-card-link flex justify-between items-center"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/youtube.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <span className="w-full h-[1px] bg-blue-700 absolute -bottom-2"></span>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
              {tab === 1 && (
                <>
                  <div className="tab-1-content flex flex-col gap-1 ">
                    {national?.map((leaders: any, index: any) => (
                      <>
                        <div
                          key={index}
                          className="tab-card flex gap-3 relative mt-3 scrollbar-container"
                        >
                          <div className="tab-card-left relative h-20 w-20 ">
                          <img src={leaders.image} alt="" className="w-20 h-20 rounded-full object-cover" />
                          </div>
                          <div className="tab-card-right gap-3 relative h-auto w-48 w-55 ">
                            <p className="font-bold text-base text-blue-800 ">
                              {leaders.name}
                            </p>
                            <p className="text-xs font-semibold text-yellow-500">
                              {leaders.position}
                            </p>
                            <div className="tab-card-link flex  items-center">
                              <div
                                onClick={() => handleLink(leaders.facebook)}
                                className="tab-card-link flex justify-between items-center"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/facebook.png"
                                  alt=""
                                />
                              </div>
                              <div
                                onClick={() => handleLink(leaders.instagram)}
                                className="tab-card-link flex justify-between items-center pr-2"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/instagram.png"
                                  alt=""
                                />
                              </div>
                              <div
                                onClick={() => handleLink(leaders.youtube)}
                                className="tab-card-link flex justify-between items-center"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/youtube.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <span className="w-full h-[1px] bg-blue-700 absolute -bottom-2"></span>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
              {tab === 2 && (
                <div className="tab-2-content flex flex-col  gap-1 ">
                  <>
                    {state?.map((leader: any, index: number) => (
                      <>
                        <div
                          key={index}
                          className="  tab-card flex gap-3 relative mt-3 scrollbar-container"
                        >
                          <div className="tab-card-left relative h-20 w-20">
                          <img src={leader.image} alt="" className="w-20 h-20 rounded-full object-cover" />
                          </div>
                          <div className="tab-card-right gap-3 relative h-auto w-48 w-55 ">
                            <p className="font-bold text-base text-blue-800 ">
                              {leader.name}
                            </p>
                            <p className="text-xs font-semibold text-yellow-500">
                              {leader.position}
                            </p>
                            <div className="tab-card-link flex  items-center">
                              <div
                                onClick={() => handleLink(leader.facebook)}
                                className="tab-card-link flex justify-between items-center"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/facebook.png"
                                  alt=""
                                />
                              </div>
                              <div
                                onClick={() => handleLink(leader.instagram)}
                                className="tab-card-link flex justify-between items-center pr-2"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/instagram.png"
                                  alt=""
                                />
                              </div>
                              <div
                                onClick={() => handleLink(leader.youtube)}
                                className="tab-card-link flex justify-between items-center"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/youtube.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <span className="w-full h-[1px] bg-blue-700 absolute -bottom-2"></span>
                        </div>
                      </>
                    ))}
                  </>
                </div>
              )}
              {tab === 3 && (
                <div className="tab-3-content flex flex-col  gap-1 ">
                  <>
                    {district?.map((leaders, index) => (
                      <>
                        <div
                          key={index}
                          className="tab-card flex  gap-3 relative mt-3 scrollbar-container"
                        >
                          <div className="tab-card-left relative h-20 w-20 ">
                          <img src={leaders.image} alt="" className="w-20 h-20 rounded-full object-cover" />
                          </div>
                          <div className="tab-card-right gap-3 relative h-auto w-48 w-55 ">
                            <p className="font-bold text-base text-blue-800 ">
                              {leaders.name}
                            </p>
                            <p className="text-xs font-semibold text-yellow-500">
                              {leaders.position}
                            </p>
                            <div className="tab-card-link flex  items-center">
                              <div
                                onClick={() => handleLink(leaders.facebook)}
                                className="tab-card-link flex justify-between items-center"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/facebook.png"
                                  alt=""
                                />
                              </div>
                              <div
                                onClick={() => handleLink(leaders.instagram)}
                                className="tab-card-link flex justify-between items-center pr-2"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/instagram.png"
                                  alt=""
                                />
                              </div>
                              <div
                                onClick={() => handleLink(leaders.youtube)}
                                className="tab-card-link flex justify-between items-center"
                              >
                                <img
                                  className="w-10"
                                  src="/icons/youtube.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <span className="w-full h-[1px] bg-blue-700 absolute -bottom-2"></span>
                        </div>
                      </>
                    ))}
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      </MobileContainer>
    </>
  );
}

export default SocialMedia;
