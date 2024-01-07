import { cil3d, cilCheck, cilClearAll, cilEnvelopeLetter, cilFolder, cilInstitution, cilLibraryAdd, cilLockLocked, cilNewspaper, cilPaperclip, cilPaperPlane, cilPen, cilPenAlt, cilReload, cilTrash, cilUser, cilUserFemale, cilUserFollow, cilUserUnfollow, cilUserX, cilWallpaper, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAvatar, CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardSubtitle, CCardTitle, CCol, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import React, { useState, useEffect, Suspense } from 'react'
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import av1 from 'src/assets/images/avatars/1.jpg'
import axiosYns from 'src/axios';

import base_API_Url from 'src/Config/server'
import Swal from 'sweetalert2';

const UsersCrud = () => {
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const [inpErrors,setInpErrors]=useState([])
    const params = useLocation();
    const [isUpdate,setIsUpdate]=useState(false);
    const [user,setUser]=useState({name:"",email:"",password:"",password_confirmation:""})
    const saveUser=async()=>{
        if(isUpdate)
        {console.log("update :",user)}
        else
        {
            axiosYns.post("/register",user)
            .then((response)=>{
                console.log(`Ok Status: ${response.status}`,response)
                if(response.status==201){
                    let user =response.data.user
                    Swal.fire({
                        title: "l'enregistrement effectuer",
                        text: `l'utilisateur ${user.name} a été bien sauvegarder avec l'ID : ${user.id}
                            voullez-vous ajouter un autre ?                    
                        `,
                        icon: "success",
                        showCancelButton: true,
                        confirmButtonText: "OUI",
                        cancelButtonText: "NON!",
                        reverseButtons: true
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            setUser({name:"",email:"",password:"",password_confirmation:""});
                            setInpErrors([])
                            inputRef.current.focus()
                        }
                        else{
                            navigate(-1);
                        }
                    });
                }
            })
            .catch((error)=>{
                console.log(`Error Status: ${error.response.status}`,error)
                
                switch(error.response.status){
                    case 422:
                        const response=error.response.data
                        const fields = Object.keys(error.response.data.errors);
                        const messages = Object.values(error.response.data.errors);
                        
                        setInpErrors(fields);
                        const htmlMessage=`
                                <ul class="list-group list-group-flush">`+
                                    fields.map((f,i)=>{
                                        return(`<li class="list-group-item" key=${i}>${f} : ${messages[i][0]}</li>`)
                                    })                           
                                +`</ul>`
                            
                        Swal.fire({
                            title: "Erreur d'enregistrement ?",
                            html: htmlMessage,
                            icon: "error",
                            showCancelButton: false,
                        });
                        break;
                }

            })
        }
    }
    useEffect(()=>{
        try{
            setUser(params.state.user)
            setIsUpdate(true);
        }
        catch(error){
        }
    },[])
    return (
        <div>
            <CRow>
                <CCard className='p-0'>
                    <CCardHeader>
                        <CRow>
                            <CCol sm="3" className='d-flex justify-content-start align-items-center'>
                                <CIcon className='mr-5' icon={cilUser} size="lg" />
                                <CCardTitle>Users</CCardTitle>
                            </CCol>
                            <CCol sm="7" className='d-flex justify-content-start align-items-center'>
                            </CCol>
                            <CCol className='d-flex justify-content-around align-items-center' sm="2">
                                <CButton onClick={saveUser} color='success' className='shadow-sm mr-2 ml-2' variant="outline">
                                    <CIcon size='xl' icon={isUpdate?cilPenAlt:cilCheck} />
                                </CButton>
                                <CButton  onClick={()=>{navigate(-1)}} className='mr-2 ml-2' color="danger" variant="outline">
                                    <CIcon icon={cilX} size="lg" />
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className="justify-content-center">
                            <CCol md={9} lg={7} xl={6}>
                                <CCard >
                                    <CCardBody className="p-4">
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    invalid={inpErrors.includes("name")}
                                                    autoFocus
                                                    ref={inputRef}
                                                    required
                                                    placeholder="Name"
                                                    autoComplete="name"
                                                    value={user.name}
                                                    onChange={(e) => setUser({...user,name:e.target.value})}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>@</CInputGroupText>
                                                <CFormInput required placeholder="Email" autoComplete="email"
                                                value={user.email}
                                                invalid={inpErrors.includes("email")}
                                                onChange={(e) => setUser({...user,email:e.target.value})}
                                                     />
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="new-password"
                                                    invalid={inpErrors.includes("password")}
                                                    value={user.password}
                                                    onChange={(e) =>{ setInpErrors(inpErrors.filter(e=>e!="password"));setUser({...user,password:e.target.value})}}
                                                    
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
                                                    invalid={inpErrors.includes("password_confirmation")||inpErrors.includes("password")}

                                                    value={user.password_confirmation}
                                                    onChange={(e) => setUser({...user,password_confirmation:e.target.value})}
                                                />
                                            </CInputGroup>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCardBody>

                </CCard>
            </CRow>
        </div>
    )
}

export default UsersCrud;