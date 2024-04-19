import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../features/userSlice';
import { Btn, Input } from './components';
import { useDispatch } from "react-redux";
import { authService } from "../appwrite/auth";

const Signup = () => {

    const navigate = useNavigate()
    const [ error, setError ] = useState()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const signinHandler = async (data) => {
        setError('')
        try {
            console.log('++++++++++++++++++++++++++++++++++++');
            console.log(data);
            const session = await authService.createAccount({
                ...data
            })
            if (session) {
                const loggedInUser = await authService.getCurrentUser()
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
                console.log(loggedInUser);
                if (session) {
                    dispatch(login(loggedInUser))
                }
            }
            if (session) {
                navigate('/all-posts')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>

            <div className='flex items-center justify-center w-full'>
                <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                    <h2 className="text-center text-2xl font-bold leading-tight">Create your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                            Sign In
                        </Link>
                    </p>

                    { error && <p className="text-red-600 mt-8 text-center">{ error }</p>}

                    <form onSubmit={ handleSubmit(signinHandler) } className="mt-8">
                        <div>

                            {/* name input */}

                            <Input
                                label="Full Name: "
                                placeholder="Enter your full name"
                                className= 'mb-2'
                                {...register("name", {
                                    required: true,
                                })}
                            />


                            {/* email input */}

                            <Input
                                label= "Email: "
                                placeholder= "Enter your email"
                                type= "email"
                                className= "mb-2"
                                {
                                    ...register(
                                        "email",
                                        {
                                            required: true,
                                            pattern: {
                                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                message: 'Email address must be a valid address'
                                            }
                                        }
                                    )
                                }
                            />

                            {/* password input */}

                            <Input 
                                label= "Password: "
                                placeholder= "Enter your password"
                                type= "password"
                                className= "mb-2"
                                {
                                    ...register(
                                        "password",
                                        {
                                            required: true
                                        }
                                    )
                                }
                            />

                            {/* login button */}

                            <Btn type="submit" className="w-full mt-4">Create Account</Btn>

                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Signup;