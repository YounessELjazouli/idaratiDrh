import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import axiosYns from 'src/axios'
import { useNavigate } from 'react-router-dom'
// sidebar nav config
import adminNav from '../router/admin_nav'
import userNav from '../router/user_nav'
import superAdminNav from '../router/superAdmin_nav'
import getCookie from 'src/helpers/getToken'

const AppSidebar = () => {
  const Navigate = useNavigate();
  const [userDash, setUserDash] = useState(null)
  useEffect(() => {
    let token = getCookie('token');
    let email = getCookie('email');
    console.log(token);
    if (token) {
      axiosYns.post('/check-login', { token: token, email: email })
        .then(({ data }) => {
              setUserDash(adminNav);
        
        })
        .catch((error) => {
          console.log(error);
          Navigate('/login');
        })
    } else {
      console.log("not authentified");
      Navigate('/login')

    }

  }, [])
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={userDash} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
