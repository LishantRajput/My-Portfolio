import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorEmitter, successEmitter } from "../../ToastifyEmitter";
import { BASE_URL } from "../BaseUrl";
import { useAuthState } from "../contextapi/AuthState";

const AddReactProject = () => {
  const { islogin } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!islogin) {
      navigate("/");
    }
  }, [islogin, navigate]);

  const [files, setFiles] = useState({
    uiTemplate: null,   // ✅ fixed name
    jsxCode: null,
  });

  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("uiTemplate", files.uiTemplate); // ✅ same name everywhere
    formData.append("jsxCode", files.jsxCode);

    try {
      const res = await fetch(`${BASE_URL}/auth/add/jsx/project`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        successEmitter(data.message);
      } else {
        errorEmitter(data.message);
      }
    } catch (err) {
      console.log(err);
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

          {/* UI Template Upload */}
          <div>
            <label className="text-gray-300 text-sm">Upload UI Template</label>
            <input
              type="file"
              name="uiTemplate"
              onChange={handleChange}
              className="w-full mt-2 text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:bg-yellow-400 file:text-black
              hover:file:bg-yellow-500
              cursor-pointer"
            />
          </div>

          {/* JSX Code Upload */}
          <div>
            <label className="text-gray-300 text-sm">Upload JSX Code</label>
            <input
              type="file"
              name="jsxCode"
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

export default AddReactProject;