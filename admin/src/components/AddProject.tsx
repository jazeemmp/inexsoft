import axios from "../api/axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FormInput } from "./common/FormInput";
import { addProjectValidation } from "../validations/addProjectValidation";
import { useState } from "react";

const AddProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    validationSchema: addProjectValidation,
    initialValues: {
      projectName: "",
      contact: "",
      description: "",
      location: "",
      projectImage: null,
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value) {
            formData.append(key, value as string | Blob);
          }
        });
        
        await axios.post("/new/project", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        Swal.fire({
          title: "Project Added Successfully!",
          icon: "success",
          confirmButtonColor: "#ef4444",
          confirmButtonText: "Go to Dashboard",
        }).then(() => navigate("/"));
        
        resetForm();
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    },
  });

  return (
    <div className="shadow-md text-center bg-white md:w-[50%] mb-32 mt-10 w-[90%] p-10 rounded-2xl">
      <h1 className="text-3xl font-bold uppercase">Add a New Project</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Project Name */}
        <FormInput
          label="Project Name"
          name="projectName"
          placeholder="Enter Project Name"
          formik={formik}
        />
        
        {/* Contact */}
        <FormInput
          label="Contact Number"
          name="contact"
          type="number"
          placeholder="Enter Contact Number"
          formik={formik}
        />
        
        {/* Description */}
        <FormInput
          label="Description"
          name="description"
          placeholder="Enter Project Description"
          formik={formik}
        />
        
        {/* Location */}
        <FormInput
          label="Location"
          name="location"
          placeholder="Enter Project Location"
          formik={formik}
        />
        
        {/* Project Image Upload */}
        <div className="mt-5">
          <label htmlFor="projectImage" className="block text-left">Upload Project Image</label>
          <input
            type="file"
            name="projectImage"
            id="projectImage"
            className="p-2 border-2 border-gray-300 rounded w-full outline-red-500"
            accept="image/*"
            onChange={(event) => {
              if (event.currentTarget.files) {
                formik.setFieldValue("projectImage", event.currentTarget.files[0]);
              }
            }}
          />
          {formik.errors.projectImage && formik.touched.projectImage && (
            <div className="text-red-500 text-sm absolute">{formik.errors.projectImage}</div>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 text-white mt-10 cursor-pointer rounded px-4 py-2"
        >
          <h1 className="text-lg font-bold uppercase">{loading ? "Loading..":"Add Project"}</h1>
        </button>
      </form>
    </div>
  );
};

export default AddProject;
