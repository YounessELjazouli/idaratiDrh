import React, { useEffect, useState } from 'react';
import axiosYns from 'src/axios';
import { CCard } from '@coreui/react';
import moment from 'moment'
import { cilCloudDownload, cilTrash, cilPenAlt, cilClearAll, cilFilterX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';

import './correspondances.css'
function Correspondances() {

  const navigate = useNavigate()

  const [listRefs, setlistRefs] = useState(null);
  const [filteredListRefs, setfilteredListRefs] = useState([]);
  const [isFiltered, setIsFilterd] = useState(false);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const getData = async () => {
    await axiosYns.get('/textes-reglementaires')
      .then(({ data }) => {
        setlistRefs(data.data)
      }).catch((err) => {
        console.log(err);
      })
  }

  const filterByref = (value) => {
    setfilteredListRefs(listRefs.filter((e) => {
      return e.ref.toLowerCase().includes(value.toLowerCase());
    }))
    setIsFilterd(true);
  }
  
  const filterByType = (value) => {
    setfilteredListRefs(listRefs.filter((e) => {
        return e.doctype.nom.toLowerCase().includes(value.toLowerCase());
      }))
      setIsFilterd(true);
  }

  const filterBySujet = (value) => {
    setfilteredListRefs(listRefs.filter((e) => {
      return e.sujet.toLowerCase().includes(value.toLowerCase());
    }))
    setIsFilterd(true);
  }

  const handleDateChange = (value) => {
    setDateRange(value);
    filterDataByDate(value);
  };

  const filterByDate = (dateD,dateF) => {
    console.log(dateD+" "+dateF);
    setDateDebut(dateD);
    setDateFin(dateF);
    const filteredData = listRefs.filter((item) => {
      if (dateD && dateF) {
        const itemDate = moment(item.date);
        const formattedDate = itemDate.format('YYYY-MM-DD');
        console.log(formattedDate);
        return formattedDate >= dateD && formattedDate <= dateF;
      }
      return true;
    });
    setIsFilterd(true);
    setfilteredListRefs(filteredData)
    // // Use filteredData for your display or further operations
    // console.log(filteredData);
  };


  useEffect(() => {
    getData();
  }, [])

  const goToStorePage = () => {
    navigate('/newCorrAdm');
  }

  const deleteCorr = async (id) => {
    try {
      await axiosYns.delete(`/textes-reglementaires/${id}`);
      console.log('Corr Deleted');
      getData();
    } catch (error) {
      console.error('Error deleting correspondence:', error);
    }
      
  }

  const goToUpdate = (id) => {
    navigate(`/updateCorr/${id}`)
  }


  const download = (url) => {
    // window.open(`http://localhost:8000/${url}`, '_blank')
    window.open(`axiosYns.defaults.baseURL/${url}`, '_blank')
  }
  return (
    <div>
        <CCard className='my-3 p-3 container text-center'>
          <div className='row align-items-center m-2'>
            <div className='col-md-2'>
              {/* <label htmlFor='ref'>Réference</label> */}
              <input type='text'
                id='ref'
                placeholder='Filter par Réference'
                onChange={(e) => filterByref(e.target.value)}
                className='w-50' />
            </div>
            <div className='col-md-2'>
              {/* <label htmlFor='sujet'>Sujet</label> */}
              <input type='text'
              id='sujet'
              placeholder='Filter par Sujet'
              onChange={(e) => filterBySujet(e.target.value)}
              className='w-50' />
            </div>
            <div className='col-md-2'>

              {/* <label htmlFor='type'>Type</label> */}
              <input type='text'
              id='type'
              placeholder='Filter par Type'
              onChange={(e) => filterByType(e.target.value)}
              className='w-50' />
            </div>
            <div className='col-md-6 form-group d-flex'>
              {/* <label htmlFor="date">Date</label> */}

              <input type="date" className='form-control w-20' value={dateDebut} onChange={(e) => filterByDate(e.target.value,dateFin)} />
              <input type="date" className='form-control w-20 ml-1' value={dateFin}  onChange={(e) => filterByDate(dateDebut,e.target.value)} />
        
            </div>
                      
          </div>
          <div className='row d-flex justify-content-center'>
            <button onClick={goToStorePage} className='btn btn-success w-25 m-2'>Ajouter</button>
          </div>
      </CCard>
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr className='text-center'>
              <th>Réference</th>
              <th>Date</th>
              <th>Sujet</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              listRefs ?
              (isFiltered ? filteredListRefs : listRefs).map((elem, index) => {
                  return (
                    <tr key={index} className='text-center'>
                      <td>{elem.ref}</td>
                      <td>{elem.date}</td>
                      <td>{elem.sujet}</td>
                      <td>{elem.doctype.nom}</td>
                      
                      <td>
                        <button onClick={() => goToUpdate(elem.id)} className='btn btn-primary'>Update</button>
                        <button onClick={() => deleteCorr(elem.id)} className='btn btn-danger'>Delete</button>
                        <button onClick={() => download(elem.texte)} className='btn btn-info'>
                          <CIcon icon={cilCloudDownload} />
                        </button>
                      </td>
                    </tr>
                  )
                })
                : <></>
            }
          </tbody>
        </table>
      </div>
      {
        !listRefs&&
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        }
    </div>
  )
}

export default Correspondances