import { cil3d, cilActionUndo, cilBan, cilEnvelopeLetter, cilFolder, cilInstitution, cilLibraryAdd, cilNewspaper, cilPaperclip, cilPaperPlane, cilPenAlt, cilReload, cilTrash, cilUser, cilUserFemale, cilUserFollow, cilUserUnfollow, cilUserX, cilWallpaper } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAvatar, CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardSubtitle, CCardTitle, CCol, CRow } from '@coreui/react';
import React, { useState, useEffect, Suspense } from 'react'
import { useNavigate } from 'react-router-dom';
import av1 from 'src/assets/images/avatars/1.jpg'
import axiosYns from 'src/axios';

import base_API_Url  from 'src/Config/server'
import Swal from 'sweetalert2';
const Users = () => {
    const navigate=useNavigate();
    const [me,setMe] = useState(null);
    const [users,setUsers] = useState([]);
    const [removing,setRomoving] = useState([]);

    const getUsers=async()=>{

        var response =await axiosYns.get('/users')
        if(response.status==200){
            setMe(response.data.me)
            setUsers(response.data.other)
            console.log("users",users)
        }
    }
    useEffect(()=>{
        getUsers();
    }
    ,[])

    const addUser=()=>{
        navigate("/userCrud")
    }

    const updateUser=(user)=>{
        navigate("/profil",{
        // navigate("/userCrud",{
            state:{
                user:user
            }
        })
        
    }
    const recover = async (user,index)=>{
        await axiosYns.post("/update_user",{...user,restor:true})
        .then(({data})=>{
            console.log(data)
            var usrs=[...users]
            usrs[index]={...usrs[index],...data.user}
            setUsers(usrs)
            Swal.fire({
                title: "L'operation effectué ",
                icon:"success",
                iconColor:"green"
            });
        })
    }
    const removeUser=(user,index,destroy=false)=>{
        
        Swal.fire({
            title: `Do you want to remove user ${user.name} ?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "oui",
            denyButtonText: `Non`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setRomoving(user.id)
                await axiosYns.delete("/user",{data:{user:user,isDestroy:user.deleted_at!=null}})
                .then(({data})=>{
                    console.log("DATA",data)
                    if(user.deleted_at!=null)
                    {
                        setUsers(users.filter(item => item.id !== user.id))
                    }
                    else{
                        var usrs=[...users]
                        usrs[index]={...usrs[index],...data.user}
                        setUsers(usrs)
                    }
                    
                    setRomoving(0)
                    Swal.fire({
                        title: "L'operation effectué ",
                        icon:"success",
                        iconColor:"red"
                    });
                })
                .catch((error)=>{
                    if(error.response.status==401){
                        navigate("/login");
                    }
                })
              
            } else if (result.isDenied) {
              //Swal.fire("Changes are not saved", "", "info");
            }
          });
    }
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
                                <CButton onClick={addUser} color='success' className='shadow-sm mr-2 ml-2' variant="outline">
                                    <CIcon size='xl' icon={cilLibraryAdd} />
                                </CButton>
                                <CButton className='mr-2 ml-2' color="info" variant="outline">
                                    <CIcon icon={cilReload} size="lg" />
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    {false &&
                        <div class="text-center mt-2">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    <CCardBody>
                        <CRow className='d-flex justify-content-start'>
                            {
                                me&&
                                <CCol key={0} sm="3">
                                        <CCard className='m-2'>
                                            <CCardHeader className='d-flex justify-content-around align-items-center'>
                                                {/* <CIcon className='mr-5' icon={av1} size="lg" /> */}
                                                <CCardTitle className='ml-2'>YOU</CCardTitle>
                                            </CCardHeader>
                                            <CCardBody className='d-flex justify-content-around align-items-center'>
                                                <CAvatar className='shadow-sm' src={me.picture?`${base_API_Url.base_API_Url}/${me.picture}`:av1} size="lg" />
                                                <button onClick={()=>{updateUser(me)}} className='btn btn-primary'>
                                                    <CIcon icon={cilPenAlt} />
                                                </button>
                                            </CCardBody>
                                            <CCardFooter className="text-medium-emphasis">
                                                <CRow className='d-flex justify-content-around align-items-center'>
                                                    <CCol>
                                                        <CCardSubtitle className='d-flex justify-content-around align-items-center'>
                                                            <CIcon className='mr-5' icon={cilFolder} />
                                                            <span>{me.correspondances_count+me.texte_reglementaires_count}</span>
                                                        </CCardSubtitle>
                                                    </CCol>
                                                    <CCol>
                                                        <CCardSubtitle className='d-flex justify-content-around align-items-center'>
                                                            <CIcon className='mr-5' icon={cilInstitution} />
                                                            <span>{me.correspondances_count}</span>
                                                        </CCardSubtitle>
                                                    </CCol>
                                                    <CCol>
                                                        <CCardSubtitle className='d-flex justify-content-around align-items-center'>
                                                            <CIcon className='mr-5' icon={cilEnvelopeLetter} />
                                                            <span>{me.texte_reglementaires_count}</span>
                                                        </CCardSubtitle>
                                                    </CCol>
                                                </CRow>
                                            </CCardFooter>
                                        </CCard>
                                    </CCol>
                            }
                            {users.map((user, index) => {
                                return (
                                    <CCol key={index+1} sm="3">
                                        <CCard className='m-2'>
                                            <CCardHeader className='d-flex justify-content-around align-items-center'>
                                                {/* <CIcon className='mr-5' icon={av1} size="lg" /> */}
                                                <CAvatar src={user.picture?`${base_API_Url.base_API_Url}/${user.picture}`:av1} size="l" />
                                                <CCardTitle className='ml-2'>{user.name}</CCardTitle>
                                            </CCardHeader>
                                            <CCardBody className='d-flex justify-content-around align-items-center'>
                                                {removing==user.id?
                                                    <div class="text-center">
                                                        <div class="spinner-border text-danger" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                :
                                                <>
                                                {user.deleted_at&&
                                                <button onClick={()=>{recover(user,index)}} className={`btn ${user.deleted_at?"btn-success":"btn-primary"}`}>
                                                <CIcon icon={cilActionUndo}  />
                                                </button>}
                                                <button onClick={()=>{removeUser(user,index)}} className='btn btn-danger'>
                                                    <CIcon icon={user.deleted_at?cilTrash:cilBan} />
                                                </button>
                                                </>
                                                }
                                                
                                            </CCardBody>
                                            <CCardFooter className="text-medium-emphasis">
                                                <CRow className='d-flex justify-content-around align-items-center'>
                                                    {/* <CCol>
                                                        <CCardSubtitle className='d-flex'>
                                                            <CIcon icon={cilUser} />
                                                            <span>: Admin</span>
                                                        </CCardSubtitle>
                                                    </CCol> */}
                                                    <CCol>
                                                        <CCardSubtitle className='d-flex justify-content-around align-items-center'>
                                                            <CIcon className='mr-5' icon={cilFolder} />
                                                            <span>{user.correspondances_count+user.texte_reglementaires_count}</span>
                                                        </CCardSubtitle>
                                                    </CCol>
                                                    <CCol>
                                                        <CCardSubtitle className='d-flex justify-content-around align-items-center'>
                                                            <CIcon className='mr-5' icon={cilInstitution} />
                                                            <span>{user.correspondances_count}</span>
                                                        </CCardSubtitle>
                                                    </CCol>
                                                    <CCol>
                                                        <CCardSubtitle className='d-flex justify-content-around align-items-center'>
                                                            <CIcon className='mr-5' icon={cilEnvelopeLetter} />
                                                            <span>{user.texte_reglementaires_count}</span>
                                                        </CCardSubtitle>
                                                    </CCol>
                                                </CRow>
                                            </CCardFooter>
                                        </CCard>
                                    </CCol>
                                )
                            })}
                        </CRow>
                    </CCardBody>

                </CCard>
            </CRow>
        </div>
    )
}

export default Users;