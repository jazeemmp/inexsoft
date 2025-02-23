import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "../apis/axios";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      email: Yup.string().email("Invalid Email").required("Email is Required"),
      password: Yup.string().required("Password is Required"),
      phone: Yup.string().required("Phone Number is Required"),
    }),
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    onSubmit: async(values) => {
     try {
       const {data} = await axios.post('/new/user',values);
       console.log(data);
       toast.success("User Logined successfully")
       navigate("/login");
     } catch (error) {
      console.log(error);
       toast.error("Internal server error")
     }
    },
  });
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-between flex-col md:flex-row  bg-white  gap-5 text-center shadow-md w-[90%] items-center md:w-[50%] p-10 rounded-lg">
          <img src="./signup.jpg" className="w-96" alt="" />
          <form
            className="flex flex-1  flex-col gap-7"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-3xl font-semibold">Register Here !</h1>

            <div>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Full Name"
                className="p-2 border-2 border-gray-300 rounded outline-red-500 w-full"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-500 text-sm absolute">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="">
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className="p-2 border-2 border-gray-300 rounded outline-red-500 w-full"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm absolute">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="">
              <input
                type="number"
                id="phone"
                placeholder="Enter Your Phone Number"
                className="p-2 border-2 border-gray-300 rounded outline-red-500 w-full"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />

              {formik.errors.phone && formik.touched.phone && (
                <div className="text-red-500 text-sm absolute">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <div>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                className="p-2 border-2 border-gray-300 rounded outline-red-500 w-full"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-sm absolute">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <button className="bg-red-500 text-white p-2 rounded" type="submit">
              Register
            </button>
            <Link to={"/login"} className="text-gray-400">
              Already Have an Account??
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
