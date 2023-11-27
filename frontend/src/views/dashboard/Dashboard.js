import React, { useEffect, useState } from 'react'

import MY_ICONS from 'src/Config/icon'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import axiosYns from 'src/axios'

import {cilBalanceScale, cilEnvelopeLetter, cilInstitution, cilReload} from '@coreui/icons';



const Dashboard = () => {
  
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const [abstractReff, setAbstractReff] = useState([]);
  const [abstractCorr, setAbstractCorr] = useState([]);
  const getStats = async (only="*") => {
    try {
      console.log("louading..................");
      const resAbstract = await axiosYns.get('/abstract',
      {
        params: {
            only: only
        }
      }
      );
      console.log("ready !!");
      console.log("Set Data...");
      if(resAbstract.data.select=="REF"||resAbstract.data.select=="*"){
        setAbstractReff(resAbstract.data.REF);
      }
      if(resAbstract.data.select=="COR"||resAbstract.data.select=="*"){
        setAbstractCorr(resAbstract.data.COR);
      }
      setLoadingMsg(false);
      setLoadingRef(false);
      setLoadingGlobal(false);
      console.log(resAbstract.data);
    } catch (error) {
      console.error(error);
    }
  };
  const loadRefs=()=>{
    setLoadingRef(true);
    getStats("ref");
  }
  const loadMsg=()=>{
    setLoadingMsg(true);
    getStats("cor");
  }
  useEffect(() => {
    setLoadingMsg(true);
    setLoadingRef(true);
    setLoadingGlobal(true);
    getStats();
  }, []);
  return (
    <>
    <CRow>
        <CCard className='p-0'>
          <CCardHeader>
          <CRow>
            <CCol sm="5" className='d-flex justify-content-start'>
              <CIcon className='mr-5' icon={cilBalanceScale} size="lg" />
              <CCardTitle>References juridique</CCardTitle>
            </CCol>
            <CCol className='d-flex justify-content-end' sm="7">
              <CButton color="info" variant="outline" onClick={loadRefs}>
                <CIcon icon={cilReload} size="lg" />
              </CButton>
            </CCol>

          </CRow>
          </CCardHeader>
          {loadingGlobal&&
          <div class="text-center mt-2">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div> 
          }
          <CCardBody>
            <CRow className='d-flex justify-content-start'>
            {abstractReff.map((ref,index)=>{
              return (
                <CCol key={index} sm="3">
                <CCard className='m-2'>
                  <CCardHeader className='d-flex'>
                    <CIcon className='mr-5' icon={MY_ICONS[ref.nom]} size="lg" />
                    <CCardTitle>{ref.nom}</CCardTitle>
                  </CCardHeader>
                  <CCardBody >
                    {loadingRef?
                        <div class="text-center mt-2">
                          <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>:
                        <CCardSubtitle className='text-center fs-1'>
                          {ref.correspondances_count}
                        </CCardSubtitle>
                    }
                    
                  </CCardBody>
                </CCard>
              </CCol>
              )
            })}
            </CRow>
          </CCardBody>
          
        </CCard>
    </CRow>
    <CRow className='mt-2'>
        <CCard className='p-0'>
        <CCardHeader>
          <CRow>
            <CCol sm="2" className='d-flex justify-content-start'>
              <CIcon icon={cilEnvelopeLetter} size="lg" />
              <CCardTitle>Messagerie</CCardTitle>
            </CCol>
            <CCol className='d-flex justify-content-end' sm="10">
              <CButton color="info" variant="outline" onClick={loadMsg}>
                <CIcon icon={cilReload} size="lg" />
              </CButton>
            </CCol>

          </CRow>
          </CCardHeader>
          {loadingGlobal&&
          <div class="text-center mt-2">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          }
          
          <CCardBody>
            <CRow className='d-flex justify-content-start'>
            {abstractCorr.map((ref,index)=>{
              return (
                <CCol key={index} sm="3">
                <CCard className='m-2'>
                  <CCardHeader className='d-flex'>
                    <CIcon className='mr-5' icon={MY_ICONS[ref.nom]} size="lg" />
                    <CCardTitle>{ref.nom}</CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    
                      {loadingMsg?
                      <div class="text-center mt-2">
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>:
                      <CCardSubtitle className='text-center fs-1'>
                        {ref.textesreglementaires_count}
                      </CCardSubtitle>
                      }
                  </CCardBody>
                </CCard>
              </CCol>
              )
            })}
            </CRow>
          </CCardBody>
          
        </CCard>
    </CRow>
  </>
  )
}

export default Dashboard
