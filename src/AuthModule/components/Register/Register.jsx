import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/4 4.svg";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const confirmPassword = watch("password");

const navigate = useNavigate()


  async function apiRegister(formData) {
    try {
      const { data } = await axios.post(`https://upskilling-egypt.com:443/api/v1/Users/Register`, formData);
      navigate("/VerifyAccountUser")
      toast.success(data.message);
      return data
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error);
    }
    setIsLoading(false)

  }

  function appendToFormData(values) {
    let registerForm = new FormData();
    registerForm.append('userName', values.userName);
    registerForm.append('email', values.email);
    registerForm.append('country', values.country);
    registerForm.append('phoneNumber', values.phoneNumber);
    registerForm.append('password', values.password);
    registerForm.append('confirmPassword', values.confirmPassword);
    registerForm.append('profileImage', values.profileImage[0]);
    return registerForm;
  }

  const onSubmit = async (values) => {
    console.log(values);
    setIsLoading(true)
    let formData = appendToFormData(values)
    apiRegister(formData)

  }





  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <>
      <div className="Auth-container">
        <div className="overlay ">
          <div className="container">
            <div className="row vh-100  justify-content-center align-items-center ">
              <div className=" col-md-8  col-12  ">
                <div className="   p-3 p-sm-5  rounded-4   bg-white animated-paragraph ">
                  <div className="logo  w-75 mx-auto text-center    ">
                    <img className="w-100 mx-auto" src={logo} alt="logo" />
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-3" >
                    <div className="h-Form ps-2 ">
                      <h4 className="text-secondary-emphasis fw-semibold">
                        Register
                      </h4>
                      <p className="text-secondary ">
                        Welcome Back! Please enter your details
                      </p>
                    </div>

                    <div className=" row  ">

                      <div className="flex-column my-2   col-md-6   col-12 ">
                        <div className="input-group bd has-validation ">
                          <span className="input-group-text rounded-end-0  bg-light"  >
                            <i className="icon fa-solid fa-user"></i>
                          </span>
                          <input
                            placeholder="UserName"
                            {...register("userName", {
                              required: "UserName is required",
                              maxLength: {
                                value: 8,
                                message: "UserName must be at most 8 characters"
                              },
                              minLength: {
                                value: 3,
                                message: "UserName must be at least 3 characters",
                              },
                              pattern: {
                                value: /^[a-zA-Z]+[0-9]+$/,
                                message: "UserName must contain characters and end with numbers without spaces"
                              }
                            })}
                            type="text"
                            className="form-control bg-light"
                          />

                        </div>
                        {errors.userName && <div className="mt-1 py-1 alert alert-danger">{errors.userName.message}</div>}

                      </div>

                      <div className="flex-column my-2   col-md-6   col-12 ">
                        <div className="input-group bd has-validation ">
                          <span
                            className="input-group-text rounded-end-0   bg-light"

                          >
                            <i className="icon fa-solid fa-envelope"></i>
                          </span>
                          <input
                            placeholder="Enter your E-mail"
                            {
                            ...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
                                message: "Please enter a valid email address"
                              },
                              maxLength: {
                                value: 30,
                                message: "Email must be at most 30 characters"
                              },
                              minLength: {
                                value: 8,
                                message: "Email must be at least 8 characters",

                              },

                            })
                            }
                            type="text"
                            className="form-control bg-light "

                          />
                        </div>
                        {errors.email && <div className="mt-1 py-1 alert alert-danger">{errors.email.message}</div>}

                      </div>



                      <div className="flex-column my-2   col-md-6   col-12">
                        <div className="input-group has-validation">
                          <span className="input-group-text rounded-end-0 bg-light">
                            <i className="icon fa-solid fa-location-dot"></i>
                          </span>
                          <input
                            placeholder="Country"
                            {...register("country", {
                              required: {
                                value: true,
                                message: "Country is Required"
                              },

                              maxLength: {
                                value: 15,
                                message: "Country must be at most 20 characters"
                              },
                              minLength: {
                                value: 3,
                                message: "Country must be at least 3 characters"
                              }
                            })}
                            type="text"
                            className="form-control bg-light border-end-0 rounded-end-0 text-decoration-none "
                          />

                        </div>
                        {errors.country && <div className=" mt-1 py-1 alert alert-danger">{errors.country.message}</div>}
                      </div>



                      <div className="flex-column my-2   col-md-6   col-12">
                        <div className="input-group has-validation">
                          <span className="input-group-text rounded-end-0 bg-light">
                            <i className="icon fa-solid fa-phone"></i>                          </span>
                          <input
                            placeholder="PhoneNumber"
                            {...register("phoneNumber", {
                              pattern: {
                                value: /^(\+2)?01[0125][0-9]{8}$/,
                                message: "Please enter a valid Egyptian phone number"
                              },
                              required: {
                                value: true,
                                message: "PhoneNumber is Required"
                              },

                            })}
                            type={"text"}
                            className="form-control bg-light border-end-0 rounded-end-0 text-decoration-none "
                          />

                        </div>
                        {errors.phoneNumber && <div className=" mt-1 py-1 alert alert-danger">{errors.phoneNumber.message}</div>}
                      </div>



                      <div className="flex-column my-2   col-md-6   col-12 ">
                        <div className="input-group bd has-validation ">
                          <span
                            className="input-group-text rounded-end-0   bg-light"

                          >
                            <i className="icon fa-solid fa-lock"></i>
                          </span>
                          <input
                            placeholder="Password"
                            {...register("password", {
                              required: {
                                value: true,
                                message: "Password is Required"
                              },
                              pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]+$/,
                                message: "Password must contain at least one lowercase letter, one number, and one special character"
                              },
                              maxLength: {
                                value: 20,
                                message: "Password must be at most 20 characters"
                              },
                              minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                              }
                            })}
                            type={!showPassword ? "text" : "password"}
                            className="form-control bg-light border-end-0 rounded-end-0 text-decoration-none"
                          />

                          <span className="input-group-text border-start-0">
                            <i className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"} `} onClick={togglePasswordVisibility}></i>
                          </span>
                        </div>
                        {errors.password && <div className="mt-1 py-1 alert alert-danger">{errors.password.message}</div>}

                      </div>

                      <div className="flex-column my-2   col-md-6   col-12">
                        <div className="input-group has-validation">
                          <span className="input-group-text rounded-end-0 bg-light">
                            <i className="icon fa-solid fa-lock"></i>
                          </span>

                          <input
                            placeholder="confirm-Password"
                            {...register("confirmPassword", {
                              required: "Confirm Password is required",
                              validate: (value) => value === confirmPassword || "Passwords do not match"
                            })}
                            type={showConfirmPassword ? "password" : "text"}
                            className="form-control bg-light border-end-0 rounded-end-0"
                          />
                          <span className="input-group-text border-start-0">
                            <i className={`far ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={toggleConfirmPasswordVisibility}></i>
                          </span>
                        </div>
                        {errors.confirmPassword && <div className=" mt-1 py-1 alert alert-danger">{errors.confirmPassword.message}</div>}
                      </div>

                    </div>
                    <div>
                      <input
                        {
                        ...register("profileImage")
                        }
                        type="file" className="form-control bg-light" id="exampleFormControlFile1" />
                    </div>
                    <div className="links my-2 text-end  ">
                      <Link className="text-success h6" to={"/Login"}>Login Now?</Link>
                    </div>

                    <div className="w-100  text-center">
                      <button className="mt-3 w-50 mx-auto  text-center border-0 text-white bg-btn py-2 rounded-3">

                        {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Register"}
                      </button>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}






