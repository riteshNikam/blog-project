import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../features/userSlice';
import { Btn, Input  } from './components'
import { useDispatch } from "react-redux";
import { authService } from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [ error, setError ] = useState('')

    const loginHandler = async ( data ) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/all-posts')
                }
            } 
        } catch (e) {
            let newError = String(e.message);
            setError(newError)
        }
        
    }

    

    return (
        <>
            <div className='flex items-center justify-center w-full'>
                <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                    <h2 className="text-center text-2xl font-bold leading-tight">Log in to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account? &nbsp;
                        <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                            Sign Up
                        </Link>
                    </p>

                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={ handleSubmit(loginHandler) } className="mt-8">
                        <div>

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

                            <Btn type="submit" className="w-full mt-4">Sign In</Btn>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;