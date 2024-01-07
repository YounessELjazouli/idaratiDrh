import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import getCookie from 'src/helpers/getToken';
import axiosYns from 'src/axios';
import {useNavigate} from 'react-router-dom';
import { useRef } from 'react';
import { Component } from 'react';

// const DefaultLayout = (props) => {
class DefaultLayout extends Component {

  constructor(props){
    super(props)
    this.state={
      connectedUser:null
    }
  }
  static getDerivedStateFromProps = async(props, state)=>{
    
  }

  componentDidMount = async()=>{
    
    await axiosYns.post('/me')
        .then((response) => {
          
          console.log("refreshed......(user)")
          console.log(response)

          this.setState({...this.state,connectedUser:response.data.user})
        })
        .catch((error) => {
          window.open("/#/login","_self")
          // if (error.statusCode == 401) {
          //   Navigate('/login')
          // }
        })
  }
  
  refreshUser = async (user)=>{
    console.log("ReFResh")
    await this.setState({...this.state,connectedUser:user})
    console.log("ReFResh",this.state.connectedUser)

  }
  // const [isLoggedIn, setisLoggedIn] = useState(false);
  // const [ typeUser, setTypeUser ] = useState(null);
  // const Navigate = useNavigate();
  // const header=useRef()
  // useEffect(() => {
  //   let token = getCookie('token');
  //   let email = getCookie('email');
  //   if(token){
  //     axiosYns.post('/check-login',
  //     {
  //       headers:{
  //         'Authorization':`Bearer ${token}`
  //       }
  //     }
      
      
  //     )
  //       .then((data) => {
  //         console.log("OK",data);
  //         setisLoggedIn(false)
  //       })
  //       .catch((error) => {
  //         console.log("ERR",error);
  //         // Navigate('/login');
  //       })
  //   }else{
  //     console.log("not authentified");
  //     setisLoggedIn(false)
  //     Navigate('/login')
  //   }
  
  // }, [])
  // const [user, setUser] = useState()
  // const loadUser = async () => {
  //   console.log("refreshing......(user)")
  //   axiosYns.post('/me')
  //     .then((response) => {
  //       setUser(response.data.user)
  //       console.log("refreshed......(user)")
        

  //     })
  //     .catch((error) => {
  //       if (statusCode == 401) {
  //         Navigate('/login')
  //       }
  //     })
  // }

  // useEffect(() => {
  //   loadUser()
  // }, [])
  render(){
  return (
      <div>
        {this.state.connectedUser &&
          <>
          <AppSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader connectedUser={this.state.connectedUser}/>
            <div className="body flex-grow-1 px-3">
              <AppContent connectedUser={this.state.connectedUser} refresh={this.refreshUser}/>
            </div>
            {/* <AppFooter /> */}
          </div>
          </>
        }
      </div>
    
  )}
}

export default DefaultLayout
