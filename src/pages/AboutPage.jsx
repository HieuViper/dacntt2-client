/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import MapBox from "../components/Map/MapBox";
import { MdMailOutline } from "react-icons/md";
import { BiWorld, BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import { callNon } from "../utils/api";

const AboutPage = () => {
  const [featureStore, setFeatureStore] = useState();

  useEffect(() => {
    callNon(`api/stores?page=1&page_size=6`).then((res) => {
      setFeatureStore(res.data);
    });
  }, []);

  return (
    <div className="">
      <div className="section-1 bg-dark-800 text-white py-5 px-32 flex items-center justify-between w-full">
        <button className="font-Knewave text-2xl">To Your Door</button>
        <div className="flex gap-10 font-semibold">
          <a href="/" className=" hover:text-primary-600 duration-200">
            Home
          </a>
          <a href="/stores" className=" hover:text-primary-600 duration-200">
            Stores
          </a>
          <a href="/menu" className=" hover:text-primary-600 duration-200">
            Menu
          </a>
          <a href="/about" className=" hover:text-primary-600 duration-200">
            About
          </a>
        </div>
      </div>

      <div className="section-2 text-center py-12 px-20">
        <div className="text-3xl text-red-500 mb-10">
          ***Contact Information***
        </div>
        <div className="px-32 tracking-wide leading-7 ">
          &emsp;Welcome to <b>"To Your Door"</b> - your ultimate destination for
          the finest online food shopping experience! We take pride in being
          your top choice for those who are passionate about cuisine and crave
          the joy of savoring delectable dishes right in the comfort of their
          own homes. <br />
          <br />
          &emsp;At <b>"To Your Door"</b>, we understand that the quest for
          exquisite food is an integral part of daily life. With a wide array of
          menu options, ranging from beloved traditional classics to innovative
          and novel creations, we are committed to delivering memorable culinary
          experiences to you. Our intuitive and user-friendly interface makes
          online ordering simpler than ever before. With just a few clicks, you
          can indulge in the exceptional dishes that we offer. We prioritize
          quality and your satisfaction above all else, ensuring that every
          product is prepared and delivered to your doorstep with love and care.
          Join us in exploring a world of diverse and sumptuous cuisine. Let
          <b>"To Your Door"</b> become your reliable companion in satisfying
          your palate.
          <br />
          <br />
          <div className="text-start w-full">
            &emsp;- Hotline: <b>1900.0019</b> (24/7 every day in week)
            <br /> &emsp;- Head Office :{" "}
            <b>
              19 Nguyen Huu Tho, Tan Phong, Dis 7, Ho Chi Minh City, Viet Nam
            </b>
          </div>
          <br />
          Thank you for choosing us, and may you have delightful gastronomic
          experiences!
        </div>

        <div className="map mt-5 px-32">
          <MapBox />
        </div>

        <div className="text-center text-2xl my-5 font-semibold">Owner</div>
        <div className="flex justify-center items-center">
          <hr className="my-4 w-[60%]" />
        </div>
        <div className="owner px-32 flex mb-8 gap-32 items-center justify-center">
          <CardProfile
            name="Phan Minh Hieu"
            ava="https://res.cloudinary.com/ddusqwv7k/image/upload/v1694074099/users/ava-profile_1694074093.jpg"
            position="Front-end Developer"
            github="https://github.com/HieuViper"
            website="https://hieudev-portfolio.vercel.app/"
            facebook="https://www.facebook.com/viper.2409/"
            email="mailto:mr.hieu2491@gmail.com"
          />
          <CardProfile
            name="Nguyen Minh Tri"
            position="Back-end Developer"
            ava="https://res.cloudinary.com/ddusqwv7k/image/upload/v1688648527/users/default-avatar_1688648526.png"
          />
        </div>
      </div>

      <Footer store={featureStore} />
    </div>
  );
};

const CardProfile = ({
  name,
  position,
  github,
  website,
  facebook,
  email,
  ava,
}) => {
  return (
    <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-dark-800 text-white dark:bg-gray-900 dark:text-gray-100">
      <img
        src={ava}
        alt=""
        className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square object-cover"
      />
      <div className="space-y-4 text-center divide-y divide-gray-700">
        <div className="my-2 space-y-1">
          <h2 className="text-xl font-semibold sm:text-2xl">{name}</h2>
          <p className="px-5 text-xs sm:text-base dark:text-gray-400">
            {position}
          </p>
        </div>
        <div className="flex justify-center pt-2 space-x-4 align-center">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={github}
            aria-label="GitHub"
            className="p-2 rounded-md hover:text-primary-600 cursor-pointer dark:text-gray-100 hover:dark:text-violet-400"
          >
            <AiFillGithub size="1.5rem" />
          </a>
          <a
            rel="noopener noreferrer"
            href={website}
            target="_blank"
            aria-label="website"
            className="p-2 rounded-md hover:text-primary-600 cursor-pointer dark:text-gray-100 hover:dark:text-violet-400"
          >
            <BiWorld size="1.5rem" />
          </a>
          <a
            rel="noopener noreferrer"
            href={facebook}
            target="_blank"
            aria-label="Facebook"
            className="p-2 rounded-md hover:text-primary-600 cursor-pointer dark:text-gray-100 hover:dark:text-violet-400"
          >
            <BiLogoFacebookCircle size="1.5rem" />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={email}
            aria-label="Email"
            className="p-2 rounded-md hover:text-primary-600 cursor-pointer dark:text-gray-100 hover:dark:text-violet-400"
          >
            <MdMailOutline size="1.5rem" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
