import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { removeBg, triggerUpload, setTriggerUpload } = useContext(AppContext);
  const fileInputRef = useRef();

  useEffect(() => {
    if (triggerUpload) {
      fileInputRef.current.click(); // simulate click
      setTriggerUpload(false); // reset flag
    }
  }, [triggerUpload, setTriggerUpload]);

  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
      {/* ----------------Left Side---------- */}
      <div className="">
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Remove the <br className="max-md:hidden" />
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            background
          </span>{" "}
          from <br className="max-md:hidden" />
          images for free.
        </h1>
        <p className="my-6 text-[15px] text-grey-500">
          Effortlessly remove backgrounds from your images in seconds.{" "}
          <br className="max-sm:hidden" />
          Clean, crisp results—perfect for creatives and professionals.
          <br className="max-sm:hidden" />
          Upload your photo and let <b>Remova</b> do the magic!
        </p>
        <div>
          <input
            ref={fileInputRef}
            onChange={(e) => removeBg(e.target.files[0])}
            type="file"
            accept="image/*"
            id="upload1"
            hidden
          />

          <label
            className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transistion-all duration-700"
            htmlFor="upload1"
          >
            <img width={20} src={assets.upload_btn_icon} alt="" />
            <p className="text-white text-sm">Upload your image</p>
          </label>
        </div>
      </div>
      {/* ----------Rigth Side-------- */}
      <div className="w-full max-w-md">
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
