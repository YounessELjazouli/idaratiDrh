import { cil3d, cilBackspace, cilCheck, cilEnvelopeLetter, cilFolder, cilInstitution, cilLibraryAdd, cilLockLocked, cilNewspaper, cilPaperclip, cilPaperPlane, cilPen, cilPenAlt, cilReload, cilTrash, cilUser, cilUserFemale, cilUserFollow, cilUserUnfollow, cilUserX, cilWallpaper, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAvatar, CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardSubtitle, CCardTitle, CCol, CFormInput, CImage, CInputGroup, CInputGroupText, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane } from '@coreui/react';
import React, { useState, useEffect, Suspense } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import av1 from 'src/assets/images/avatars/1.jpg'
import axiosYns from 'src/axios';
import base_API_Url from 'src/Config/server'
import Swal from 'sweetalert2';

import avUser from 'src/assets/images/avatars/user.png'
import { useRef } from 'react';
import { FileUploader } from "react-drag-drop-files";
import DandD from 'src/components/DandD';



class PPictue extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: props.user,
            picture: props.pic,
            name: this.props.name,
            onPictureChange: props.onPictureChange 
        };
    }
    render() {
        const namePart = this.state.user.name.split(" ");
        const FL = namePart.map(word => word.charAt(0)).join('')
        return (
            <div className='d-flex'>
                {this.state.user.picture != null ?
                    <div className='d-flex flex-column align-items-end'>
                        {/* src={`${base_API_Url.base_API_Url}/${this.state.picture}`}  src={`${URL.createObjectURL(this.state.picture)}`}*/}
                        <CImage style={{ borderRadius: 50 }} width={100} height={100} color="secondary" src={this.state.picture instanceof File? `${URL.createObjectURL(this.state.picture)}` :`${base_API_Url.base_API_Url}/${this.state.picture}`}  />
                        <CAvatar className='align-self-center' role={'button'}>
                            <label htmlFor="picture" ><CIcon className='mr-5' icon={cilPen} size="sm" /></label>

                        </CAvatar>
                    </div>
                    :
                    <div className='d-flex justify-content-end align-items-end'>
                        {/* <CAvatar color="secondary" size="xl">{FL}</CAvatar> */}
                        <div color={'red'} style={{ height: 100, width: 100, border: 1, borderStyle: "solid", display: "flex", justifyContent: "center", alignItems: "center", borderColor: "red", borderRadius: 50, fontSize: 48, fontWeight: "bold" }}>{FL}</div>
                        <CAvatar className='align-self-center' role={'button'}>
                            <label htmlFor="picture" ><CIcon className='mr-5' icon={cilPen} size="l" /></label>
                        </CAvatar>
                    </div>
                }
                <input type="file" id="picture" onChange={(e) => { this.setState({ ...this.state, picture: e.target.files[0],user:{...this.state.user,picture: e.target.files[0]} }), this.state.onPictureChange(e.target.files[0]) }} className='d-none' />
            </div>
        )
    }

}
const Profil = (props) => {
    const fileTypes = ["PDF"];
    const [file, setFile] = useState(null);
    const [inpErrors, setInpErrors] = useState([])

    const handleChange = (file) => {
        setFile(file);
        console.log("Drop", file)
    };
    const params = useLocation()
    const fun = useParams()
    const pic = useRef()
    const navigate = useNavigate()

    // const [user, setUser] = useState(params.state.me);
    const [user, setUser] = useState(props.connectedUser);
    const [user_pic, setUser_pic] = useState();

    const [nameUpdate, setNameUpdate] = useState(false)
    const [emailUpdate, setEmailUpdate] = useState(false)
    const [activeKey, setActiveKey] = useState(1)

    const FileDandD = useRef()
    const setUserPic = (user_pic) => {
        setUser_pic(user_pic)
    }
    const saveUser = async () => {
        
        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('picture', pic.current.state.picture);
        formData.append('old_password', user.old_password?user.old_password:"");
        formData.append('new_password', user.new_password);
        formData.append('new_confirm_password', user.new_confirm_password);
        console.log("fd user",user)
        for(var [key,value] of formData){
            console.log(`${key} : ${value}`)
        }
        await axiosYns.post("/update_user",formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
            .then((response)=>{
                console.log(`Ok Status: ${response.status}`,response)
                if(response.status==200){
                    Swal.fire({
                        title: "l'enregistrement effectuer",
                        text: ``,
                        icon: "success",
                        showCancelButton: false
                    })
                    // setUser({...user,old_password:"",new_password:"",new_confirm_password:""})
                    setUser({...response.data.user})
                    props.refresh(response.data.user);
                    setInpErrors([])
                }
                
            })
            .catch((error)=>{
                if(error.response.status==422){
                    console.log(error)
                    const fields = Object.keys(error.response.data.errors);
                    // const messages = Object.values(error.response.data.errors);
                    console.log(fields)
                    setInpErrors(fields);

                }
            })
    }
    useEffect(() => {
        setUser({ ...user, picture: user_pic })
    }, [user_pic])
    useEffect(() => {
        try {
            setUser({ ...user, ...params.state.me })
            setUser_pic(params.state.me.picture)
        }
        catch (err) {

        }
    }
        , [])
    // useEffect(
    //     ()=>{
    //         pic.current.setState({...pic.current.state,name:user.name});
    //     }
    //     ,[user.name])

    return (

        <div>
            <CRow>
                <CCard className='p-0'>
                    <CCardHeader>
                        <CRow>
                            <CCol sm="3" className='d-flex justify-content-start align-items-center'>
                                <CIcon className='mr-5' icon={cilUser} size="lg" />
                                <CCardTitle>Profil</CCardTitle>
                            </CCol>
                            <CCol sm="7" className='d-flex justify-content-start align-items-center'>
                            </CCol>
                            <CCol className='d-flex justify-content-around align-items-center' sm="2">
                                <CButton onClick={saveUser} className='mr-2 ml-2' color="danger" variant="outline">
                                    <CIcon icon={cilCheck} size="lg" />
                                </CButton>
                                <CButton onClick={() => { navigate(-1) }} className='mr-2 ml-2' color="danger" variant="outline">
                                    <CIcon icon={cilBackspace} size="lg" />
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    {
                        user &&
                        <CCardBody>

                            {/* tabs */}
                            <CNav variant="tabs" role="tablist">
                                <CNavItem role="presentation">
                                    <CNavLink
                                        active={activeKey === 1}
                                        component="button"
                                        role="tab"
                                        aria-controls="home-tab-pane"
                                        aria-selected={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        <CIcon size='xl' icon={cilUser} />
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem role="presentation">
                                    <CNavLink
                                        active={activeKey === 2}
                                        component="button"
                                        role="tab"
                                        aria-controls="profile-tab-pane"
                                        aria-selected={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >
                                        <CIcon size='xl' icon={cilLockLocked} />
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                            {/* finTabs */}
                            <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
                                    <h1>Info</h1>
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <PPictue ref={pic} pic={user.picture} name={user.name} user={user} onPictureChange={setUserPic} />
                                        <CCol className='text-center' md={4}>
                                            {
                                                !nameUpdate ?
                                                    <h2>{user.name}
                                                        <CAvatar onClick={e => setNameUpdate(!nameUpdate)} className='align-self-center' role={'button'}>
                                                            <CIcon className='mr-5' icon={cilPen} size="sm" />
                                                        </CAvatar>
                                                    </h2>
                                                    :
                                                    <CInputGroup className="mb-3" md={1}>
                                                        <CInputGroupText>
                                                            <CIcon icon={cilUser} />
                                                        </CInputGroupText>
                                                        <CFormInput
                                                            required
                                                            placeholder="Name"
                                                            value={user.name}
                                                            onChange={(e) => { setUser({ ...user, name: e.target.value }) }}
                                                        />
                                                        <CInputGroupText onClick={e => setNameUpdate(!nameUpdate)} role={'button'}>
                                                            <CIcon icon={cilCheck} />
                                                        </CInputGroupText>
                                                    </CInputGroup>

                                            }
                                        </CCol>
                                        <CCol className='text-center' md={5}>
                                            {
                                                !emailUpdate ?
                                                    <h2>{user.email}
                                                        <CAvatar onClick={e => setEmailUpdate(!emailUpdate)} className='align-self-center' role={'button'}>
                                                            <CIcon className='mr-5' icon={cilPen} size="sm" />
                                                        </CAvatar>
                                                    </h2>
                                                    :
                                                    <CInputGroup className="mb-3" md={1}>
                                                        <CInputGroupText>
                                                            <CIcon icon={cilUser} />
                                                        </CInputGroupText>
                                                        <CFormInput
                                                            required
                                                            placeholder="Email"
                                                            value={user.email}
                                                            onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                                                        />
                                                        <CInputGroupText onClick={e => setEmailUpdate(!emailUpdate)} role={'button'}>
                                                            <CIcon icon={cilCheck} />
                                                        </CInputGroupText>
                                                    </CInputGroup>

                                            }
                                        </CCol>
                                    </div>
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 2}>
                                    <h1>Security</h1>
                                    <div>
                                    <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="old Password"
                                                invalid={inpErrors.includes("old_password")}
                                                value={user.old_password?user.old_password:""}
                                                onChange={(e) => { setInpErrors(inpErrors.filter(e => e != "old_password")); setUser({ ...user, old_password: e.target.value }) }}

                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="new Password"
                                                autoComplete="new-password"
                                                invalid={inpErrors.includes("new_confirm_password") || inpErrors.includes("new_password")}
                                                value={user.new_password?user.new_password:""}
                                                onChange={(e) => { setInpErrors(inpErrors.filter(e => e != "new_password")); setUser({ ...user, new_password: e.target.value }) }}

                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Repeat password"
                                                autoComplete="new-password"
                                                invalid={inpErrors.includes("new_confirm_password") || inpErrors.includes("new_password")}
                                                value={user.new_confirm_password?user.new_confirm_password:""}
                                                onChange={(e) => setUser({ ...user, new_confirm_password: e.target.value })}
                                            />
                                        </CInputGroup>
                                    </div>
                                </CTabPane>
                            </CTabContent>
                        </CCardBody>
                    }
                </CCard>
            </CRow>
        </div>
    )

}

export default Profil