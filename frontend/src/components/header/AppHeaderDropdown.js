import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react';
import avatar_user from './../../assets/images/avatars/user.png';
import axiosYns from 'src/axios';
import getCookie from 'src/helpers/getToken';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from 'src/helpers/cookieUtils';

import base_API_Url  from 'src/Config/server'
import { ukUA } from '@mui/x-date-pickers';
import { useRef } from 'react';

const AppHeaderDropdown = (props) => {
  const Navigate = useNavigate();
  const [me,setMe] = useState(null);
  const [loading,setLoading]=useState(false);
  const ref=useRef()
  const moveToProfil = ()=>{
    Navigate("/profil",{
      state:{
        me:me,
      },
      props:{
        sm:setMe
      }
      
    })
  }
  const signOut = () => {
    
    try {
      axiosYns.post('/logout')
      .then(({data}) => {
        if(data.success){
          Navigate('/login')
        }else{
          console.log(data);
        }
      })
      .catch((error)=>{
        const statusCode = error.response ? error.response.status : null;
        if(statusCode==401){
          Navigate('/login')
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  const loadUser= async ()=>{
    axiosYns.post('/me')
    .then((response)=>{
      console.log("ME",response.data);
      setMe(response.data.user)
    })
    .catch((error)=>{
      const statusCode = error.response ? error.response.status : null;
      if(statusCode==401){
        Navigate('/login')
      }
    })
  }
  useEffect(()=>{
    //loadUser()
    setMe(props.connectedUser)
  },[])
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar status='success' src={props.connectedUser==null?avatar_user:props.connectedUser.picture==null?avatar_user:`${base_API_Url.base_API_Url}/${props.connectedUser.picture}`} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem role={'button'} onClick={moveToProfil}>
          <CIcon icon={cilUser}  className="me-2" />
          {/* {me == null?"NOM PRENOM":me.name} */}
          {props.connectedUser == null?"NOM PRENOM":props.connectedUser.name}
        </CDropdownItem>
        <CDropdownItem role={'button'} onClick={signOut}>
          <CIcon icon={cilAccountLogout}  className="me-2" />
          Log Out
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={signOut}>
          <CIcon  className="me-2" />
          Log Out
        </CDropdownItem> */}
      </CDropdownMenu>

    </CDropdown>
  )
}

export default AppHeaderDropdown
