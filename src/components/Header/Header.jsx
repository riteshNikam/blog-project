import { Logo, LogOutBtn } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const userStatus = useSelector(state => state.user.userStatus)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/",
            toShow: true
        },
        {
            name: "Login",
            slug: "/login",
            toShow: !userStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            toShow: !userStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            toShow: userStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            toShow: userStatus,
        }
    ]

    // console.log(navItems);

    // for (let index = 0; index < navItems.length; index++) {
    //     console.log(`${index} : ${navItems[index].active}`);        
    // }

    return (
        <>
            <header className="py-3 shadow bg-gray-700 sticky top-0 px-4 z-30">
                    <nav className="flex justify-between items-center">
                        <div className="mr-4">
                            <Link>
                                <Logo textColor="text-white"></Logo>
                            </Link>
                        </div>
                        <div className="flex items-center">
                        { navItems.map(item => item.toShow &&                                                                 <button                       
                                    className="text-white mx-4" 
                                    key={ item.slug }
                                    onClick={() => navigate(item.slug)}
                                >
                                    { item.name }
                                </button>
                            ) 
                            }
                            {
                                userStatus && <LogOutBtn />
                            }
                            {/* <LogOutBtn /> */}
                        </div> 
                    </nav>
            </header>
        </>
    )
}

export default Header;