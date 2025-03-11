"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useState, useEffect } from "react";

const projects = [
  {
    title: "Virtual Reality Showroom",
    description:
      "A great way to immerse your client into his future home, but it was too early.",
    image: "/project1.png",
    link: "https://yourproject1.com",
  },
  {
    title: "FaceShield Clips for Glasses",
    description:
      "A creative project showcasing UX skills on Physical products, in a pandemic.",
    image: "/project2.png",
    link: "https://yourproject2.com",
  },
  {
    title: "Bua Platform Redesign",
    description:
      "First you organize the house, then you think about the Design.",
    image: "/project3.png",
    link: "https://yourproject3.com",
  },
  {
    title: "The next could be yours!",
    description: "Just message me and let's do something amazing together.",
    image: "/next-project.png",
    link: "#contact",
  },
];

export default function WorkCarousel() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // ✅ Allow both boolean & null
  const [swiperKey, setSwiperKey] = useState(0); // 🔄 Forces re-render

  useEffect(() => {
    const handleResize = () => {
      const mobileState = window.innerWidth < 768;
      setIsMobile(mobileState);
      setSwiperKey((prevKey) => prevKey + 1); // 🔄 Force re-initialize Swiper
    };

    handleResize(); // ✅ Ensure it runs immediately
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) return null;

  return (
    <div className="w-full mx-auto overflow-visible">
      <Swiper
        key={swiperKey} // 🔄 Forces Swiper to re-render on resize
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect={isMobile ? "slide" : "coverflow"}
        centeredSlides={!isMobile}
        slidesPerView={isMobile ? 1.1 : 2}
        spaceBetween={isMobile ? 10 : 20}
        coverflowEffect={
          isMobile
            ? undefined
            : {
                rotate: -10,
                stretch: 70,
                depth: 200,
                modifier: 1,
                slideShadows: false,
              }
        }
        navigation={!isMobile}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="overflow-visible px-[20px] rounded-lg"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="py-[50px] flex justify-center">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <div className="bg-light p-1 rounded-md text-center text-primary shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 w-[100%] max-w-[1000px] h-auto">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover rounded-md mb-2"
                />
                <h2 className="text-2xl font-bold text-primary">
                  {project.title}
                </h2>
                <p className="text-muted">{project.description}</p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
