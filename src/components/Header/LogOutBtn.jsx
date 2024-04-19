import { useDispatch } from "react-redux";
import { authService } from "../../appwrite/auth";
import { logout } from "../../features/userSlice";


const LogOutBtn = () => {

    const dispatch = useDispatch();
    const handleLogout = () => {
        authService.logout()
            .then(() => dispatch(logout()))
    }

    return (
        <>
            <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100     rounded-xl font-medium text-white hover:text-black" onClick={ handleLogout }>Logout</button>
        </>
    )
}

export default LogOutBtn;