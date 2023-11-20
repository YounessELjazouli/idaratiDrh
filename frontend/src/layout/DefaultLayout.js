import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import getCookie from 'src/helpers/getToken';
import axiosYns from 'src/axios';
import {useNavigate} from 'react-router-dom';

const DefaultLayout = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [ typeUser, setTypeUser ] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    let token = getCookie('token');
    let email = getCookie('email');
    if(token){
      axiosYns.post('/check-login',{token:token,email:email})
        .then(({data}) => {
          console.log(data);
          setisLoggedIn(false)
        })
        .catch((error) => {
          console.log(error);
          Navigate('/login')
        })
    }else{
      console.log("not authentified");
      setisLoggedIn(false)
      Navigate('/login')
    }
  
  }, [])
  
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
