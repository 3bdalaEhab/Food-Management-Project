import { useNavigate } from "react-router-dom";
import logo from "../../../assets/4 4.svg";
import { useForm } from "react-hook-form";
import { ForgotPassEmail } from "./ApisToForgotPass";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPass() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  async function ApiForgotPassEmail(values) {
    try {
      let { message } = await ForgotPassEmail(values)
      toast.success(message, { duration: 800 });
      setTimeout(() => {
        navigate("/ResetPass")
      }, 800);
    } catch (error) {
      toast.error("This didn't work.", { duration: 800 });
      console.log(error);
    }
    setIsLoading(false)
  }

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const onSubmit = async (values) => {
    setIsLoading(true)
    ApiForgotPassEmail(values)
  }


  return (
    <>
      <div className="Auth-container">
        <div className="overlay ">
          <div className="container">
            <div className="row vh-100  justify-content-center align-items-center ">
              <div className="col-lg-6 col-md-8  col-12">
                <div className="   p-5  rounded-4   bg-white animated-paragraph">
                  <div className="logo w-100 text-center">
                    <img className="w-100  mx-auto" src={logo} alt="logo" />
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-2" >
                    <div className="h-Form ">
                      <h4 className="text-secondary-emphasis fw-semibold font ">
                        Forgot Your Password?
                      </h4>
                      <p className="text-secondary ">
                        No worries! Please enter your email and we will send a password reset link
                      </p>
                    </div>
                    <div className="flex-column ">
                      <div className="input-group bd has-validation ">
                        <span
                          className="input-group-text rounded-end-0  bg-light"

                        >
                          <i className="icon fa-solid fa-envelope"></i>
                        </span>
                        <input
                        placeholder="Enter your email"
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
                              value: 10,
                              message: "Email must be at least 10 characters",

                            },

                          })
                          }
                          type="text"
                          className="form-control bg-light "


                        />
                      </div>
                      {errors.email && <div className="mt-1 py-1 alert alert-danger">{errors.email.message}</div>}

                    </div>



                    <button className="mt-5 w-100 border-0 text-white bg-btn py-2 rounded-3">

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
