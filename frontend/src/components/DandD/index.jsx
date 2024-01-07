import { cilFile } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CRow } from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'





const DandD = () => {
    const props=useParams();
    const [fileDandD,setFileDandD]=useState()
    useEffect(()=>{
        console.log("param",props)
    },[])
    return (
        <CCard className='p-0'>
            <CCardHeader>
                <CRow>
                    <CCol sm="3" className='d-flex justify-content-start align-items-center'>
                        <CIcon className='mr-5' icon={cilFile} size="lg" />
                        <CCardTitle>Profil</CCardTitle>
                    </CCol>
                    <CCol sm="7" className='d-flex justify-content-start align-items-center'>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                
            </CCardBody>
        </CCard>
    )
}

export default DandD