import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorEmitter, successEmitter } from "../../ToastifyEmitter";
import { BASE_URL } from "../BaseUrl";
import { useAuthState } from "../contextapi/AuthState";

const AddHtmlProject = () => {
  const { loader,islogin,setLoader } = useAuthState();
  const navigate = useNavigate();

  const [files, setFiles] = useState({
    uiTemplate: null,
    htmlCode: null,
    cssCode: null,
  });

  // Auth check
  useEffect(() => {
    if (!islogin) {
      navigate("/");
    }
  }, [islogin, navigate]);

  // Handle file change
 const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  //  Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
      console.log("35 start")

    // Validation
    if (!files.uiTemplate || !files.htmlCode || !files.cssCode) {
      return errorEmitter("All files are required");
    }
    console.log("Lie no 43", files)

    try {
      setLoader(true);
      console.log("line no 45 start")
      const formData = new FormData();
      formData.append("uiTemplate", files.uiTemplate);
      formData.append("htmlCode", files.htmlCode);
      formData.append("cssCode", files.cssCode);
      console.log("line np 51", formData)
      const res = await fetch(`${BASE_URL}/auth/add/htmlcss/project`, {
        method: "POST",
        body: formData,
        credentials: "include", //  important for auth
      });

      const data = await res.json();

      if (data?.sucess) {
        successEmitter(data.message || "Project uploaded successfully");

        // 🔄 Reset form
        setFiles({
          uiTemplate: null,
          htmlCode: null,
          cssCode: null,
        });

      } else {
        errorEmitter(data.message || "Upload failed");
      }
    } catch (err) {
      console.log(err);
      errorEmitter("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="bg-[#1e1e2f] p-10 rounded-3xl shadow-2xl w-[400px] border border-gray-700">

        <h2 className="text-2xl font-bold text-center text-white mb-8 tracking-wide">
          Upload Files
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >

          {/* UI Template */}
          <div>
            <label className="text-gray-300 text-sm">Upload UI Template</label>
            <input
              type="file"
              name="uiTemplate"
              onChange={handleChange}
              accept="image/*"
              className="w-full mt-2 text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:bg-yellow-400 file:text-black
              hover:file:bg-yellow-500 cursor-pointer"
            />
          </div>

          {/* HTML */}
          <div>
            <label className="text-gray-300 text-sm">Upload HTML Code</label>
            <input
              type="file"
              name="htmlCode"
              onChange={handleChange}
              accept=".html"
              className="w-full mt-2 text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:bg-green-400 file:text-black
              hover:file:bg-green-500 cursor-pointer"
            />
          </div>

          {/* CSS */}
          <div>
            <label className="text-gray-300 text-sm">Upload CSS Code</label>
            <input
              type="file"
              name="cssCode"
              onChange={handleChange}
              accept=".css"
              className="w-full mt-2 text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:bg-blue-400 file:text-black
              hover:file:bg-blue-500 cursor-pointer"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loader}
            className={`w-full py-3 mt-4 rounded-full font-semibold shadow-lg transition duration-300
              ${loader
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:scale-105"
              }`}
          >
            {loader ? "Uploader..." : "Add Project"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddHtmlProject;