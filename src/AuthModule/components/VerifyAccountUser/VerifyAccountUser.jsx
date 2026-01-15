import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../../shared/api/axiosInstance";
import toast from "react-hot-toast";
import AuthCard from "../../../shared/components/AuthCard/AuthCard";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";

export default function VerifyAccountUser() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function apiVerifyAccountUser(values) {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.put('/Users/verify/', values);
      toast.success(data.message);
      navigate("/Login");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "There's a mistake.", { duration: 800 });
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = async (values) => {
    await apiVerifyAccountUser(values);
  };

  return (
    <AuthCard
      title="Verify Account"
      subtitle="Welcome Back! Please enter your details"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
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
              value: 10,
              message: "Email must be at least 10 characters",
            },
          })}
        />

        <Input
          icon="fa-solid fa-lock"
          placeholder="Code"
          type="text"
          error={errors.code?.message}
          className="mt-4"
          {...register("code", {
            required: {
              value: true,
              message: "Code is Required"
            },
            maxLength: {
              value: 6,
              message: "Code must be at most 6 characters"
            },
            minLength: {
              value: 4,
              message: "Code must be at least 4 characters"
            }
          })}
        />

        <div className="links my-4 d-flex flex-wrap justify-content-between align-items-center">
          <Link to={"/Register"} className="text-decoration-none">
            Register Now?
          </Link>
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
