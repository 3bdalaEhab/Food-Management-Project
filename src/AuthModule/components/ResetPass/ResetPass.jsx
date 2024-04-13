import { useNavigate } from "react-router-dom";
import logo from "../../../assets/4 4.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";



export default function ResetPass() {
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const newPassword = watch("password");
  
  async function resetPassEmail(values) {
    try {
      let { data } = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", values);
      toast.success(data?.message, { duration: 2000 });
      navigate("/Login")
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message||"There's a mistake.",{ duration: 800 });

    }
    setIsLoading(false)

  }

  
  const onSubmit = async (values) => {
    setIsLoading(true)
    resetPassEmail(values)
  };


  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="Auth-container">
        <div className="overlay ">
          <div className="container">
            <div className="row vh-100 justify-content-center align-items-center ">
              <div className="col-lg-6 col-md-8  col-12">
                <div className="p-5 rounded-4 bg-white animated-paragraph">
                  <div className="logo w-100 text-center  ">
                    <img className="w-100" src={logo} alt="logo" />
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-2" >
                    <div className="h-Form">
                      <h4 className="text-secondary-emphasis fw-semibold">
                        Reset Password
                      </h4>
                      <p className="text-secondary">
                        Please Enter Your Otp  or Check Your Inbox
                      </p>
                    </div>
                    <div className="flex-column my-3">
                      <div className="input-group bd has-validation">
                        <span className="input-group-text rounded-end-0 bg-light">
                          <i className="icon fa-solid fa-envelope"></i>
                        </span>
                        <input
                          placeholder="Email"
                          {...register("email", {
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
                              value: 10,
                              message: "Email must be at least 10 characters"
                            }
                          })}
                          type="text"
                          className="form-control bg-light"
                        />
                      </div>
                      {errors.email && <div className="mt-1 py-1 alert alert-danger">{errors.email.message}</div>}
                    </div>
                    <div className="flex-column my-3">
                      <div className="input-group bd has-validation">
                        <span className="input-group-text rounded-end-0 bg-light">
                          <i className="icon fa-solid fa-lock"></i>
                        </span>
                        <input
                          placeholder="OTP"
                          {...register("seed", {
                            required: "OTP is required",
                            maxLength: {
                              value: 6,
                              message: "OTP must be at most 6 characters"
                            },
                            minLength: {
                              value: 3,
                              message: "OTP must be at least 4 characters"
                            }
                          })}
                          type="text"
                          className="form-control bg-light"
                        />
                      </div>
                      {errors.seed && <div className="mt-1 py-1 alert alert-danger">{errors.seed.message}</div>}
                    </div>
                    <div className="flex-column my-3">
                      <div className="input-group bd has-validation">
                        <span className="input-group-text rounded-end-0 bg-light">
                          <i className="icon fa-solid fa-lock"></i>
                        </span>
                        <input
                          placeholder="New Password"
                          {...register("password", {
                            required: "New Password is required",
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[a-zA-Z\d@$!%*?&^#]+$/,
                              message: "New Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
                            },
                            maxLength: {
                              value: 20,
                              message: "New Password must be at most 20 characters"
                            },
                            minLength: {
                              value: 8,
                              message: "New Password must be at least 8 characters"
                            }
                          })}
                          type={showNewPassword ? "password" : "text"}
                          className="form-control bg-light border-end-0 rounded-end-0"
                        />
                        <span className="input-group-text border-start-0">
                          <i className={`far ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={toggleNewPasswordVisibility}></i>
                        </span>
                      </div>
                      {errors.password && <div className="mt-1 py-1 alert alert-danger">{errors.password.message}</div>}
                    </div>
                    <div className="flex-column my-3">
                      <div className="input-group bd has-validation">
                        <span className="input-group-text rounded-end-0 bg-light">
                          <i className="icon fa-solid fa-lock"></i>
                        </span>





                        <input
                          placeholder="Confirm New Password"
                          {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === newPassword || "Passwords do not match"
                          })}





                          type={showConfirmPassword ? "password" : "text"}
                          className="form-control bg-light border-end-0 rounded-end-0"
                        />
                        <span className="input-group-text border-start-0">
                          <i className={`far ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={toggleConfirmPasswordVisibility}></i>
                        </span>
                      </div>
                      {errors.confirmPassword && <div className="mt-1 py-1 alert alert-danger">{errors.confirmPassword.message}</div>}
                    </div>

                    <button className="mt-3 w-100 border-0 text-white bg-btn py-2 rounded-3">
                      {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Submit"}
                    </button>
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
