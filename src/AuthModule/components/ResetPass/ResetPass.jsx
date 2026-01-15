import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../shared/api/axiosInstance";
import AuthCard from "../../../shared/components/AuthCard/AuthCard";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";

export default function ResetPass() {
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const newPassword = watch("password");

  async function resetPassEmail(values) {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post('/Users/Reset', values);
      toast.success(data?.message, { duration: 2000 });
      navigate("/Login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "There's a mistake.", { duration: 800 });
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = async (values) => {
    await resetPassEmail(values);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Please Enter Your OTP or Check Your Inbox"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <Input
          icon="fa-solid fa-envelope"
          placeholder="Email"
          type="text"
          error={errors.email?.message}
          className="my-3"
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
        />

        <Input
          icon="fa-solid fa-lock"
          placeholder="OTP"
          type="text"
          error={errors.seed?.message}
          className="my-3"
          {...register("seed", {
            required: "OTP is required",
            maxLength: {
              value: 6,
              message: "OTP must be at most 6 characters"
            },
            minLength: {
              value: 4,
              message: "OTP must be at least 4 characters"
            }
          })}
        />

        <div className="flex-column my-3">
          <div className="input-group has-validation">
            <span className="input-group-text rounded-end-0 bg-light">
              <i className="icon fa-solid fa-lock"></i>
            </span>
            <input
              placeholder="New Password"
              type={showNewPassword ? "password" : "text"}
              className="form-control bg-light border-end-0 rounded-end-0"
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
            />
            <span
              className="input-group-text border-start-0"
              style={{ cursor: 'pointer' }}
              onClick={toggleNewPasswordVisibility}
            >
              <i className={`far ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>
          {errors.password && (
            <div className="mt-1 py-1 alert alert-danger">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="flex-column my-3">
          <div className="input-group has-validation">
            <span className="input-group-text rounded-end-0 bg-light">
              <i className="icon fa-solid fa-lock"></i>
            </span>
            <input
              placeholder="Confirm New Password"
              type={showConfirmPassword ? "password" : "text"}
              className="form-control bg-light border-end-0 rounded-end-0"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === newPassword || "Passwords do not match"
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

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-3"
        >
          Submit
        </Button>
      </form>
    </AuthCard>
  );
}
