import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../../SharedModule/components/TokenContext/TokenContext";
import AuthCard from "../../../shared/components/AuthCard/AuthCard";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const { collLogin, isLoading, Token } = useContext(tokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Token) {
      navigate("/dashboard");
    }
  }, [Token, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (values) => {
    await collLogin(values);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthCard
      title="Login"
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

        <div className="flex-column mt-4">
          <div className="input-group has-validation">
            <span className="input-group-text rounded-end-0 bg-light">
              <i className="icon fa-solid fa-lock"></i>
            </span>
            <input
              placeholder="Password"
              type={showPassword ? "password" : "text"}
              className="form-control bg-light border-end-0 rounded-end-0"
              error={errors.password?.message}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is Required"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]+$/,
                  message: "Password must contain at least one letter, one number, and one special character"
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

        <div className="links my-4 d-flex flex-wrap justify-content-between align-items-center">
          <Link to={"/Register"} className="text-decoration-none">
            Register Now?
          </Link>
          <Link className="text-success text-decoration-none" to={"/ForgotPass"}>
            Forgot Password?
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
          Login
        </Button>
      </form>
    </AuthCard>
  );
}
