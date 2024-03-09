import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/4 4.svg";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../../SharedModule/components/TokenContext/TokenContext";

export default function Login() {
    const [showPassword, setShowPassword] = useState(true);
    const { collLogin, isLoading, Token, setToken } = useContext(tokenContext)
    const navigate = useNavigate()

    function navigateAfterLogin() {
        if (Token) {
            navigate("/dashboard")
        }
    }
    useEffect(() => {
        if (Token) {
            navigateAfterLogin()
        }
        return setToken(null)
    }, [Token])

    let collApiLogin = (values) => {
        collLogin(values)

    }

    const { register, handleSubmit, formState: { errors },setValue} = useForm();
    useEffect(() => {
  setValue("email","abdalaehab3@gmail.com")
  setValue("password","Ae123****")
    }, [])
    
    const onSubmit = async (values) => {
        collApiLogin(values)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <>
            <div className="Auth-container">
                <div className="overlay ">
                    <div className="container">
                        <div className="row vh-100  justify-content-center align-items-center ">
                            <div className="col-lg-6 col-md-8  col-12  ">
                                <div className="   p-5  rounded-4   bg-white animated-paragraph">
                                    <div className="logo  w-100 text-center    ">
                                        <img className="w-100" src={logo} alt="logo" />
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 " >
                                        <div className="h-Form ">
                                            <h4 className="text-secondary-emphasis fw-semibold">
                                                Login
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
                                                placeholder="Password"
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
                                                    type={!showPassword ? "text" : "password"}
                                                    className="form-control bg-light border-end-0 rounded-end-0 text-decoration-none "
                                                />
                                                <span className="input-group-text border-start-0">
                                                    <i className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"} `} onClick={togglePasswordVisibility}></i>
                                                </span>
                                            </div>
                                            {errors.password && <div className=" mt-1 py-1 alert alert-danger">{errors.password.message}</div>}
                                        </div>

                                        <div className="links my-2 d-flex flex-wrap justify-content-between align-items-center">
                                            <Link to={"/Register"}>Register Now?</Link>
                                            <Link className="text-success" to={"/ForgotPass"}>
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <button className="mt-3 w-100 border-0 text-white bg-btn py-2 rounded-3">

                                            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
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






