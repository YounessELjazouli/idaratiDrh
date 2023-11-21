import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
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



const Dashboard = () => {
  const [statistic1Data, setStatistic1Data] = useState([]);
  const [statistic2Data, setStatistic2Data] = useState(0);
  const [statistic3Data, setStatistic3Data] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response1 = await axiosYns.get('/stats-1');
        setStatistic1Data(response1.data.statistic_1);
  
        const response2 = await axiosYns.get('/stats-2');
        setStatistic2Data(response2.data.statistic_2);
  
        const response3 = await axiosYns.get('/stats-3');
        setStatistic3Data(response3.data.statistic_3);
      } catch (error) {
        console.error(error);
      }
    };
  
    getStats();
    console.log(statistic1Data)
    console.log(statistic2Data)
    console.log(statistic3Data)
  }, []);
  return (
    <>
    <CRow>
      <CCol sm="4">
        <CCard>
          <CCardHeader>Statistic 1</CCardHeader>
          <CCardBody>
            <CChartLine
              datasets={[
                {
                  label: 'Statistic 1',
                  borderColor: 'rgb(0,123,255)',
                  backgroundColor: 'rgba(0,123,255,0.1)',
                  data: statistic1Data,
                },
              ]}
              options={{
                // Chart options
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="4">
        <CCard>
          <CCardHeader>Statistic 2</CCardHeader>
          <CCardBody>
            <CChartLine
              datasets={[
                {
                  label: 'Statistic 2',
                  borderColor: 'rgb(255,193,7)',
                  backgroundColor: 'rgba(255,193,7,0.1)',
                  data: [statistic2Data], // Converted to an array for single value
                },
              ]}
              options={{
                // Chart options
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="4">
        <CCard>
          <CCardHeader>Statistic 3</CCardHeader>
          <CCardBody>
            <CChartLine
              datasets={[
                {
                  label: 'Statistic 3',
                  borderColor: 'rgb(40,167,69)',
                  backgroundColor: 'rgba(40,167,69,0.1)',
                  data: [statistic3Data], // Converted to an array for single value
                },
              ]}
              options={{
                // Chart options
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </>
  )
}

export default Dashboard
