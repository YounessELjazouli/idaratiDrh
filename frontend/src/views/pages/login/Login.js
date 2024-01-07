import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilSave, cilUser } from '@coreui/icons'
import axiosYns from 'src/axios';
import getCookie from 'src/helpers/getToken';
import Swal from 'sweetalert2'

import mi from 'src/images/mi.png'
import logo2 from 'src/assets/logo/logo2.png'


const Login = () => {
  // const [failed,setFailed] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [connecting,setConnecting]=useState(false)
  const Navigate = useNavigate();
  const login = async () => {
    try {
      const formData = {
        email: email,
        password: password,
      }
      setConnecting(true);
      const response = await axiosYns.post('/login', formData);
      setConnecting(false);
      if (response.data.success) {
        
        // Set cookies here
        document.cookie = `token=${response.data.token}; path=/`;
        // document.cookie = `user=${response.data.username}; path=/`;
        // document.cookie = `email=${response.data.email}; path=/`;
        // document.cookie = `type=${response.data.type}; path=/`;
        Navigate('/')
        
      } else {
        // Handle login failure
        console.log(response); // Log the error message
      }
    } catch (error) {
      if(error.response.status==401){
        // setFailed(true);
        setConnecting(false);
        Swal.fire({
          title: 'Error!',
          text: '"le mot de passe ou le password est incorrecte !!"',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }

    }
  }
  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" onChange={(e) => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onKeyUp={(event)=>{if(event.keyCode==13){login()}}}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} className="text-right">
                        <CButton color="info" className="px-4 fw-medium text-white" onClick={login}>
                        {connecting?<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>:""} 
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-success py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    {/* <CImage className='bg-transparent border-0' rounded thumbnail width={200} height={200} src={morassalaty2} /> */}
                    <CImage className='bg-transparent border-0' rounded thumbnail src={logo2} width={120} height={120} />
                    <h1>Morassaaty</h1>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
