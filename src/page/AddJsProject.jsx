import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorEmitter, successEmitter } from "../../ToastifyEmitter";
import { BASE_URL } from "../BaseUrl";
import { useAuthState } from "../contextapi/AuthState";

const AddJsProject = () => {
  const { islogin } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!islogin) {
      navigate("/");
    }
  }, [islogin, navigate]);

  const [files, setFiles] = useState({
    uiTemplate: null,   // ✅ fixed
    htmlCode: null,
    jsCode: null,
  });

  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("Line no 29",files)
    const formData = new FormData();
    formData.append("uiTemplate", files.uiTemplate); // consistent naming
    formData.append("htmlCode", files.htmlCode);
    formData.append("jsCode", files.jsCode);

    try {
      console.log("line no 36",formData)
      const res = await fetch(`${BASE_URL}/auth/add/js/project`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        successEmitter(data.message);
      } else {
        errorEmitter(data.message);
      }
    } catch (err) {
      console.log(err.message);
      errorEmitter("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="bg-[#1e1e2f] p-10 rounded-3xl shadow-2xl w-[400px] border border-gray-700">

        <h2 className="text-2xl font-bold text-center text-white mb-8 tracking-wide">
          Upload Files
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* UI Template */}
          <div>
            <label className="text-gray-300 text-sm">Upload UI Template</label>
            <input
              type="file"
              name="uiTemplate"
              accept="image/*, video/*"
              onChange={handleChange}
              className="w-full mt-2 text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:bg-yellow-400 file:text-black
              hover:file:bg-yellow-500
              cursor-pointer"
            />
          </div>

          {/* HTML */}
          <div>
            <label className="text-gray-300 text-sm">Upload HTML Code</label>
            <input
              type="file"
              name="htmlCode"
              accept=".html"
              onChange={handleChange}
              className="w-full mt-2 text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:bg-green-400 file:text-black
              hover:file:bg-green-500
              cursor-pointer"
            />
          </div>

          {/* JS */}
          <div>
            <label className="text-gray-300 text-sm">Upload JS Code</label>
            <input
              type="file"
              name="jsCode"
              accept=".js"
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

export default AddJsProject;