import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axiosYns from 'src/axios'


import {cilArrowCircleLeft, cilArrowLeft, cilBalanceScale, cilEnvelopeLetter, cilFile, cilInstitution, cilReload} from '@coreui/icons';
import { useLocation, useNavigate } from 'react-router-dom';


const PDFR = () => {
  const navigate = useNavigate()
  const params = useLocation()
  const [url,setUrl] = useState("") ;
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(()=>{
    setUrl(params.state.url);
    console.log("url",url);
  },[])
  function onDocumentLoadSuccess(numPage) {
    setNumPages(numPages);
  }
  return (
    
    <CRow>
        <CCard className='p-0'>
          <CCardHeader>
            <CRow>
              <CCol className='d-flex justify-content-start'>
                <CIcon icon={cilArrowCircleLeft} onClick={() => {navigate(-1)}} size="lg" className='mx-3' />
                <CIcon className='mr-2' icon={cilFile} size="lg" />
                <CCardTitle className='ml-2'>PDF Reader</CCardTitle>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow className='d-flex justify-content-start'>
              <iframe style={{minHeight: 700}} src={url}>

              </iframe>
            </CRow>
          </CCardBody>
          
        </CCard>
    </CRow>
  )
}

export default PDFR
