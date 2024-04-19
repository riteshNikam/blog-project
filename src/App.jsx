import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from './appwrite/auth';
import { login, logout } from './features/userSlice';
import { Header } from './components/components';
import { Outlet } from 'react-router-dom';
import { conf } from './conf/config';

const App = () =>  {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(
    () => {
      
      authService.getCurrentUser()
        .then(data => {
          if (data) {
            dispatch(login({
              userData: data
            }))
          } else {
            dispatch(logout())
          }
        }) 
        .finally(
          () => {
            setLoading(false)
          }
        )
    }, []
  )

  return (
      <>
        {        
          !loading ? 
            <div className='w-full'>
              <Header />
              <Outlet />
            </div> 
            : null
        }
      </> 
  )
}



export default App
