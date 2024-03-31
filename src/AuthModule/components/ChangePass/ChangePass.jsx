import { useNavigate } from "react-router-dom";
import logo from "../../../assets/4 4.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ChangePass({handleClose}) {
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const newPassword = watch("newPassword");

  async function changePassEmail(values) {
    console.log(values);
    let token = localStorage.getItem("token");
    try {
      let { data } = await axios.put("https://upskilling-egypt.com:443/api/v1/Users/ChangePassword", values, { headers: { Authorization: token } });
      console.log(data);
      toast.success(data.message);
      handleClose()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message||"There's a mistake.",{ duration: 800 });
    }
    setIsLoading(false);
  }

  const onSubmit = async (values) => {
    setIsLoading(true);
    changePassEmail(values);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="">
        <div className="row justify-content-center align-items-center">
          <div className="p-4 px-3 rounded-4 bg-white">
            <div className="logo  w-100 text-center ">
              <img className="w-100" src={logo} alt="logo" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
              <div className="h-Form">
                <h3 className="text-secondary-emphasis fw-semibold">
                  Change Your Password
                </h3>
                <p className="text-secondary">
                  Enter your details below
                </p>
              </div>
              <div className="flex-column my-3">
                <div className="input-group bd has-validation">
                  <span className="input-group-text rounded-end-0 bg-light">
                    <i className="icon fa-solid fa-lock"></i>
                  </span>
                  <input
                    placeholder="Old Password"
                    {...register("oldPassword", {
                      required: " Old Password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[a-zA-Z\d@$!%*?&^#]+$/,
                        message: " Old Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
                      },
                      maxLength: {
                        value: 20,
                        message: " Old Password must be at most 20 characters"
                      },
                      minLength: {
                        value: 8,
                        message: "Old Password must be at least 8 characters"
                      }
                    })}
                    type={showOldPassword ? "password" : "text"}
                    className="form-control bg-light border-end-0 rounded-end-0"
                  />
                  <span className="input-group-text border-start-0">
                    <i className={`far ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={toggleOldPasswordVisibility}></i>
                  </span>
                </div>
                {errors.oldPassword && <div className="mt-1 py-1 alert alert-danger">{errors.oldPassword.message}</div>}
              </div>
              <div className="flex-column my-3">
                <div className="input-group bd has-validation">
                  <span className="input-group-text rounded-end-0 bg-light">
                    <i className="icon fa-solid fa-lock"></i>
                  </span>
                  <input
                    placeholder="New Password"
                    {...register("newPassword", {
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
                {errors.newPassword && <div className="mt-1 py-1 alert alert-danger">{errors.newPassword.message}</div>}
              </div>
              <div className="flex-column my-3">
                <div className="input-group bd has-validation">
                  <span className="input-group-text rounded-end-0 bg-light">
                    <i className="icon fa-solid fa-lock"></i>
                  </span>
                  <input
                    placeholder="Confirm New Password"
                    {...register("confirmNewPassword", {
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
                {errors.confirmNewPassword && <div className="mt-1 py-1 alert alert-danger">{errors.confirmNewPassword.message}</div>}
              </div>

              <button className="mt-3 w-100 border-0 text-white bg-btn py-2 rounded-3">
                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
