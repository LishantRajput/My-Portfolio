import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorEmitter, successEmitter } from "../../ToastifyEmitter";
import { BASE_URL } from "../BaseUrl";
import { useAuthState } from "../contextapi/AuthState";

const AddHtmlProject = () => {
  const { islogin } = useAuthState()
  const navigate = useNavigate()
  useEffect(() => {
    if (!islogin) {
      navigate("/");
    }
  }, [islogin, navigate]);
  const [files, setFiles] = useState({
    uiTamplet: null,
    htmlCode: null,
    cssCode: null,
  });
  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(files);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(files)
    const formData = new FormData();
    formData.append("uiTamplet", files.uiTamplet);
    formData.append("htmlCode", files.htmlCode);
    formData.append("cssCode", files.cssCode);
    // console.log(formData)

    try {
      console.log("Start Try")
      const res = await fetch(`${BASE_URL}/auth/add/htmlcss/project`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data)
      if (data.sucess) {
        successEmitter(data.message)
      } else {
        errorEmitter(data.message)
      }
    } catch (err) {
      console.log("Cathch Block Throug", err);
      errorEmitter("Catch Block Throug")
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="bg-[#1e1e2f] p-10 rounded-3xl shadow-2xl w-[400px] border border-gray-700">

        <h2 className="text-2xl font-bold text-center text-white mb-8 tracking-wide">
          Upload Files
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" enctype="multipart/form-data">

          {/* uiTamplet Upload */}
          <div>
            <label className="text-gray-300 text-sm">Upload Ui Template</label>
            <input
              type="file"
              name="uiTamplet"
              onChange={handleChange}
              className="w-full mt-2 text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:bg-yellow-400 file:text-black
              hover:file:bg-yellow-500
              cursor-pointer"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Upload Html Code</label>
            <input
              type="file"
              name="htmlCode"
              onChange={handleChange}
              className="w-full mt-2 text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:bg-green-400 file:text-black
              hover:file:bg-green-500
              cursor-pointer"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Upload Css Code</label>
            <input
              type="file"
              name="cssCode"
              onChange={handleChange}
              className="w-full mt-2 text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:bg-blue-400 file:text-black
              hover:file:bg-blue-500
              cursor-pointer"
            />
          </div>

          <button
            className="w-full py-3 mt-4 rounded-full bg-gradient-to-r 
            from-yellow-400 to-orange-500 text-black font-semibold 
            shadow-lg hover:scale-105 transition duration-300"
          >
            Add Project
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddHtmlProject;