import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilSave, cilUser } from '@coreui/icons'
import axiosYns from 'src/axios';
import getCookie from 'src/helpers/getToken';
import Swal from 'sweetalert2'

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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={login}>
                        {connecting?<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>:""} 

                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
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
