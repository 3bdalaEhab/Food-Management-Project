import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/4 4.svg";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyAccountUser() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, } = useForm();


    async function apiVerifyAccountUser(values) {
        try {
            const { data } = await axios.put(`https://upskilling-egypt.com:443/api/v1/Users/verify/`, values);
            console.log(data);
            navigate("/Login")
            toast.success(data.message);
            return data
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
        }
        setIsLoading(false)

    }

    const onSubmit = (values) => {
        setIsLoading(true)
        console.log(values)
        apiVerifyAccountUser(values)
    }




    return (
        <>
            <div className="Auth-container">
                <div className="overlay ">
                    <div className="container">
                        <div className="row vh-100  justify-content-center align-items-center ">
                            <div className="col-lg-6 col-md-8  col-12  ">
                                <div className="   p-5  rounded-4   bg-white  animated-paragraph">
                                    <div className="logo  w-100 text-center    ">
                                        <img className="w-100" src={logo} alt="logo" />
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="mt-3" >
                                        <div className="h-Form ">
                                            <h4 className="text-secondary-emphasis fw-semibold">
                                                Verify Account
                                            </h4>
                                            <p className="text-secondary ">
                                                Welcome Back! Please enter your details
                                            </p>
                                        </div>
                                        <div className="flex-column ">
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
                                        <div className="flex-column">
                                            <div className="input-group mt-4 has-validation">
                                                <span className="input-group-text rounded-end-0 bg-light">
                                                    <i className="icon fa-solid fa-lock"></i>
                                                </span>
                                                <input
                                                    placeholder="Code"
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
                                                    type="text"
                                                    className="form-control bg-light border-end-0 rounded-end-0 text-decoration-none "
                                                />

                                            </div>
                                            {errors.code && <div className=" mt-1 py-1 alert alert-danger">{errors.code.message}</div>}
                                        </div>

                                        <div className="links my-2 d-flex flex-wrap justify-content-between align-items-center">
                                            <Link to={"/Register"}>Register Now?</Link>

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






