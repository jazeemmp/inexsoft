import axios from "../api/axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FormSelect } from "./common/FormSelect";
import { FormInput } from "./common/FormInput";
import { addFlatValidation } from "../validations/addFlatValidation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  projectName: string;
}
const AddFlats = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const formik = useFormik({
    validationSchema: addFlatValidation,
    initialValues: {
      projectId: "",
      flatType: "",
      flatPrice: "",
      flatNumber: "",
      floorNumber: "",
      carpetArea: "",
      furnishingStatus: "",
      image: null,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          if (value) {
            formData.append(key, value as string | Blob);
          }
        });

        await axios.post("/add/flat", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({
          title: "Flat Added Successfully!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#ef4444", // Tailwind red-500
          cancelButtonColor: "#000",
          confirmButtonText: "Add Another Flat",
          cancelButtonText: "Go to Home",
        }).then((result) => {
          if (result.isDismissed) {
            navigate("/");
          } else {
            resetForm();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get<Project[]>("/projects");
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="shadow-md text-center md:w-[50%] bg-white my-10 w-[90%] p-10 rounded-2xl">
      <h1 className="text-3xl font-bold uppercase">
        Add a Flat to Your Project
      </h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Project Selection */}
        <FormSelect
          label="Select Project"
          name="projectId"
          options={projects.map((project) => ({
            label: project.projectName,
            value: project._id,
          }))}
          formik={formik}
        />

        {/* Flat Type Selection */}
        <FormSelect
          label="Flat Type"
          name="flatType"
          options={[
            { label: "1 BHK", value: "1 BHK" },
            { label: "2 BHK", value: "2 BHK" },
            { label: "3 BHK", value: "3 BHK" },
            { label: "4 BHK", value: "4 BHK" },
            { label: "Studio Apartment", value: "Studio Apartment" },
            { label: "Duplex", value: "Duplex" },
            { label: "Triplex", value: "Triplex" },
            { label: "Penthouse", value: "Penthouse" },
            { label: "Villa", value: "Villa" },
            { label: "Row House", value: "Row House" },
            { label: "Serviced Apartment", value: "Serviced Apartment" },
            { label: "Loft Apartment", value: "Loft Apartment" },
          ]}
          formik={formik}
        />

        {/* Flat Price */}
        <FormInput
          label="Flat Price (in Lakhs)"
          name="flatPrice"
          type="number"
          placeholder="Enter Flat Price"
          formik={formik}
        />

        {/* Flat Number */}
        <FormInput
          label="Flat Number"
          name="flatNumber"
          placeholder="Enter Flat Number"
          formik={formik}
        />

        {/* Floor Number */}
        <FormInput
          label="Floor Number"
          name="floorNumber"
          type="number"
          placeholder="Enter Floor Number"
          formik={formik}
        />

        {/* Carpet Area */}
        <FormInput
          label="Carpet Area (in sq.ft)"
          name="carpetArea"
          type="number"
          placeholder="Enter Carpet Area"
          formik={formik}
        />

        {/* Furnishing Status */}
        <FormSelect
          label="Furnishing Status"
          name="furnishingStatus"
          options={[
            { label: "Furnished", value: "Furnished" },
            { label: "Semi-Furnished", value: "Semi-Furnished" },
            { label: "Unfurnished", value: "Unfurnished" },
          ]}
          formik={formik}
        />

        <div className="mt-5">
          <label htmlFor="image" className="block text-left">
            Upload Flat Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="p-2 border-2 border-gray-300 rounded w-full outline-red-500"
            accept="image/*"
            onChange={(event) => {
              if (event.currentTarget.files) {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }
            }}
          />
          {formik.errors.image && formik.touched.image && (
            <div className="text-red-500 text-sm absolute">
              {formik.errors.image}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-500 text-white mt-10 cursor-pointer rounded px-4 py-2"
        >
          <h1 className="text-lg font-bold uppercase ">
            Add This Flat To{" "}
            {projects.find((project) => project._id === formik.values.projectId)
              ?.projectName || "Project"}
          </h1>
        </button>
      </form>
    </div>
  );
};

export default AddFlats;
