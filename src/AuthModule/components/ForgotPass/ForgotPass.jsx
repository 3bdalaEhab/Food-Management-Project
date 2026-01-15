import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { ForgotPassEmail } from "./ApisToForgotPass";
import AuthCard from "../../../shared/components/AuthCard/AuthCard";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";

export default function ForgotPass() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function ApiForgotPassEmail(values) {
    setIsLoading(true);
    try {
      const { message } = await ForgotPassEmail(values);
      toast.success(message, { duration: 800 });
      setTimeout(() => {
        navigate("/ResetPass");
      }, 800);
    } catch (error) {
      toast.error(error?.response?.data?.message || "This didn't work.", { duration: 800 });
    } finally {
      setIsLoading(false);
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (values) => {
    await ApiForgotPassEmail(values);
  };

  return (
    <AuthCard
      title="Forgot Your Password?"
      subtitle="No worries! Please enter your email and we will send a password reset link"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <Input
          icon="fa-solid fa-envelope"
          placeholder="Enter your email"
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

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-5"
        >
          Submit
        </Button>
      </form>
    </AuthCard>
  );
}
