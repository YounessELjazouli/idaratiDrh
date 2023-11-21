import React, { useEffect, useState } from 'react';
import axiosYns from 'src/axios';
import { CCard } from '@coreui/react';
import { cilCloudDownload, cilTrash, cilPenAlt, cilClearAll, cilFilterX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
const moment = require('moment');
import { useNavigate } from 'react-router-dom';
import { CFormSelect } from '@coreui/react';

function Refernces() {
  const Navigate = useNavigate();
  const [listRefs, setlistRefs] = useState(null);
  const [filteredListRefs, setfilteredListRefs] = useState(null);
  const [isFiltered, setIsFilterd] = useState(false);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [doctypes, setdoctypes] = useState(null)
  const [selectedDoctype, setSelectedDoctype] = useState('');

  const getDocTypes = async () => {
    await axiosYns.get('/types-correspondances')
      .then(({ data }) => {
        setdoctypes(data.data)
      })
  }

  const getData = async () => {
    await axiosYns.get('/correspondances')
      .then(({ data }) => {
        setlistRefs(data.data)
      }).catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getData();
    getDocTypes();
  }, [])

  const filterByref = (value) => {
    setfilteredListRefs(listRefs.filter((e) => {
      return e.reference.toLowerCase().includes(value.toLowerCase());
    }))
    setIsFilterd(true);
  }

  const handleDateChange = (value) => {
    setDateRange(value);
    filterDataByDate(value);
  };

  const filterByDate = (dateD, dateF) => {
    console.log(dateD + " " + dateF);
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
  const goToStorePage = () => {
    Navigate('/newRefJuridique');
  }
  const download = (url) => {
    window.open(`http://localhost:8000/${url}`, '_blank')
  }
  const update = (id) => {

  }
  const deleteRef = (id) => {
    axiosYns.delete(`/correspondances/${id}`)
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.error('Error deleting correspondence:', error);
      });
  }

  const handleDoctypeChange = (value) => {
    const lowercaseValue = value.toLowerCase();
    setSelectedDoctype(lowercaseValue);
  
    const filteredRefs = listRefs.filter((ref) => {
      return lowercaseValue === ref.doctype.nom.toLowerCase();
    });
  
    setfilteredListRefs(filteredRefs);
    setIsFilterd(true);
  };
  const clearFilter = () => {
    setIsFilterd(false);
  }
  
  return (
    <div>
      <CCard className='my-3 container'>
        <div className='row align-items-center'>
          <div className='col-md-3'>
            <input
              type='text'
              placeholder='Filter par ref'
              onChange={(e) => filterByref(e.target.value)}
              className='form-control'
            />
            
          </div>
          <div className='col-md-3 d-flex'>
            <input
              type='date'
              value={dateDebut}
              placeholder='date debut'
              onChange={(e) => filterByDate(e.target.value, dateFin)}
              className='form-control'
            />

            <input
              type='date'
              value={dateFin}
              onChange={(e) => filterByDate(dateDebut, e.target.value)}
              className='form-control'
            />
          </div>
          <div className='col-md-3'>
            <CFormSelect
              aria-label="Select Document Type"
              onChange={(e) => handleDoctypeChange(e.target.value)}
              value={selectedDoctype}
            >
              {doctypes && doctypes.map((doctype) => (
                <option key={doctype.id} value={doctype.nom}>
                  {doctype.nom}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div className='col-md-3'>
            <button onClick={clearFilter} className='mx-2 btn btn-danger'>
              <CIcon icon={cilFilterX} />
            </button>
            <button onClick={goToStorePage} className='btn btn-success btn-block'>Ajouter</button>
          </div>
        </div>
      </CCard>
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Réfernce</th>
              <th>Date</th>
              <th>Objet</th>
              <th>Type</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {

              listRefs ?
                (isFiltered ? filteredListRefs : listRefs).map((elem, index) => {
                  return (
                    <tr key={index}>
                      <td>{elem.reference}</td>
                      <td>{elem.date}</td>
                      <td>{elem.objet}</td>
                      <td>{elem.doctype.nom}</td>
                      <td className='d-flex justify-content-around'>
                        <button onClick={() => update(elem.id)} className='btn btn-primary'>
                          <CIcon icon={cilPenAlt} />
                        </button>
                        <button onClick={() => deleteRef(elem.id)} className='btn btn-danger'>
                          <CIcon icon={cilTrash} />
                        </button>
                        <button onClick={() => download(elem.file)} className='btn btn-info'>
                          <CIcon icon={cilCloudDownload} />
                        </button>
                      </td>
                    </tr>
                  )
                })
                : <>Wait to fetch</>
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Refernces