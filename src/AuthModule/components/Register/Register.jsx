import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../../shared/api/axiosInstance";
import AuthCard from "../../../shared/components/AuthCard/AuthCard";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";

export default function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const confirmPassword = watch("password");
  const navigate = useNavigate();

  async function apiRegister(formData) {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post('/Users/Register', formData);
      toast.success(data.message);
      navigate("/VerifyAccountUser");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "There's a mistake.", { duration: 800 });
    } finally {
      setIsLoading(false);
    }
  }

  function appendToFormData(values) {
    const registerForm = new FormData();
    registerForm.append('userName', values.userName);
    registerForm.append('email', values.email);
    registerForm.append('country', values.country);
    registerForm.append('phoneNumber', values.phoneNumber);
    registerForm.append('password', values.password);
    registerForm.append('confirmPassword', values.confirmPassword);
    if (values.profileImage && values.profileImage[0]) {
      registerForm.append('profileImage', values.profileImage[0]);
    }
    return registerForm;
  }

  const onSubmit = async (values) => {
    const formData = appendToFormData(values);
    await apiRegister(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <AuthCard
      title="Register"
      subtitle="Welcome Back! Please enter your details"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="row">
          <div className="col-md-6 col-12 my-2">
            <Input
              icon="fa-solid fa-user"
              placeholder="UserName"
              type="text"
              error={errors.userName?.message}
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
            />
          </div>

          <div className="col-md-6 col-12 my-2">
            <Input
              icon="fa-solid fa-envelope"
              placeholder="Enter your E-mail"
              type="text"
              error={errors.email?.message}
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
                  value: 8,
                  message: "Email must be at least 8 characters",
                },
              })}
            />
          </div>

          <div className="col-md-6 col-12 my-2">
            <Input
              icon="fa-solid fa-location-dot"
              placeholder="Country"
              type="text"
              error={errors.country?.message}
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
            />
          </div>

          <div className="col-md-6 col-12 my-2">
            <Input
              icon="fa-solid fa-phone"
              placeholder="PhoneNumber"
              type="text"
              error={errors.phoneNumber?.message}
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
            />
          </div>

          <div className="col-md-6 col-12 my-2">
            <div className="flex-column">
              <div className="input-group has-validation">
                <span className="input-group-text rounded-end-0 bg-light">
                  <i className="icon fa-solid fa-lock"></i>
                </span>
                <input
                  placeholder="Password"
                  type={showPassword ? "password" : "text"}
                  className="form-control bg-light border-end-0 rounded-end-0"
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
                />
                <span
                  className="input-group-text border-start-0"
                  style={{ cursor: 'pointer' }}
                  onClick={togglePasswordVisibility}
                >
                  <i className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
              {errors.password && (
                <div className="mt-1 py-1 alert alert-danger">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-6 col-12 my-2">
            <div className="flex-column">
              <div className="input-group has-validation">
                <span className="input-group-text rounded-end-0 bg-light">
                  <i className="icon fa-solid fa-lock"></i>
                </span>
                <input
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "password" : "text"}
                  className="form-control bg-light border-end-0 rounded-end-0"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) => value === confirmPassword || "Passwords do not match"
                  })}
                />
                <span
                  className="input-group-text border-start-0"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i className={`far ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
              {errors.confirmPassword && (
                <div className="mt-1 py-1 alert alert-danger">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="my-3">
          <input
            {...register("profileImage")}
            type="file"
            className="form-control bg-light"
            accept="image/*"
          />
        </div>

        <div className="links my-3 text-end">
          <Link className="text-success h6 text-decoration-none" to={"/Login"}>
            Login Now?
          </Link>
        </div>

        <div className="w-100 text-center">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-50 mx-auto"
          >
            Register
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
