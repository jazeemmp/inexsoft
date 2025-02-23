import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../apis/axios";
const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async(values) => {
      try {
        const {data} = await axios.post('/user/login',values);
        console.log(data);
        localStorage.setItem("token",data.token);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
        <div className="flex justify-between  flex-col md:flex-row bg-white  text-center  gap-5 shadow-md w-[90%] items-center md:w-[50%] p-10 rounded-lg">
          <img src="./login.jpg" className="w-96" alt="" />
          <form
            className="flex flex-1  flex-col gap-7"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-3xl font-semibold">Login Here !</h1>
            <div>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className="p-2 border-2 border-gray-300 rounded w-full outline-red-500"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm absolute">
                  {formik.errors.email}
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
                <div className="text-red-500 text-sm absolute ">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <button className="bg-red-500 text-white p-2 rounded" type="submit">
              Login
            </button>
            <Link to={"/signup"} className="text-gray-400">
              Don't Have an Account??
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
