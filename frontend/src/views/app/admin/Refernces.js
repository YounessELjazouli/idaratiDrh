import React, { useEffect, useState } from 'react';
import axiosYns from 'src/axios';
import { CCard } from '@coreui/react';
import { cilCloudDownload, cilTrash, cilPenAlt, cilClearAll, cilFilterX, cilPlus, cilLibraryAdd, cilArrowCircleRight, cilArrowCircleLeft, cilAsteriskCircle, cilCalendar, cilSitemap } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
const moment = require('moment');
import { useNavigate } from 'react-router-dom';
import { CFormSelect } from '@coreui/react';

function Refernces() {
  const Navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [perpage, setPerPage] = useState(5);
  const [currentPages, setCurrentPages] = useState(1);
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

  const getData = async (page = currentPages) => {
    // await axiosYns.get('/correspondances')
    var PG = page
    switch (page) {
      case 0:
        PG = currentPages - 1;
        break;
      case pages.length - 1:
        PG = currentPages + 1;
        break;
    }
    var axios_params = { page: PG, per_page: perpage }
    console.log(axios_params);
    await axiosYns.get('/paginate/correspondances', { params: axios_params })
      .then(({ data }) => {
        // setlistRefs(data.data)
        setlistRefs(data.data.data)
        setPages(data.data.links)
        setCurrentPages(PG)
      }).catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getData();
  }, [perpage])

  useEffect(()=>{
    getDocTypes();
  },[])
  const filterByref = (value) => {
    setfilteredListRefs(listRefs.filter((e) => {
      return e.reference.toLowerCase().includes(value.toLowerCase());
    }))
    setIsFilterd(true);
  }

  const handlePerPageChange = async (value) => {
    setPerPage(value)
  };
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
  Navigate(`/updateRef/${id}`)
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
  setSelectedDoctype(value);

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
    <CCard className='shadow my-3 p-2 container'>
      <div className='row align-items-center justify-content-between'>
        <div className='col-md-2 d-flex align-items-center'>
          <CIcon className='m-2' size='lg' icon={cilAsteriskCircle} />

          <input
            type='text'
            placeholder='Filter par ref'
            onChange={(e) => filterByref(e.target.value)}
            className='form-control'
          />

        </div>
        <div className='col-md-6 d-flex align-items-center'>
          {/* <CIcon className='m-2'  size='xl' icon={cilAsteriskCircle} /> */}
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
            className='m-2 form-control'
          />
        </div>
        <div className='col-md-3 d-flex align-items-center'>
          <CIcon className='m-2' size='xl' icon={cilSitemap} />
        
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
        <div className='col-md-1'>
          {
            isFiltered ?
              <button onClick={clearFilter} className='mx-2 btn btn-danger'>
                <CIcon size='xl' icon={cilFilterX} />
              </button>
              :
              <button onClick={goToStorePage} className='btn btn-outline-success btn-block shadow-sm'>
                <CIcon size='xl' icon={cilLibraryAdd} />

              </button>
          }
        </div>
      </div>
    </CCard>
    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle text-center table-striped">
        <thead>
          <tr>
            <th scope="col">
              #
              {/* Réfernce */}
            </th>
            <th scope="col">Date</th>
            <th scope="col">Objet</th>
            <th scope="col">Type</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {

            listRefs ?
              (isFiltered ? filteredListRefs : listRefs).map((elem, index) => {
                return (
                  <tr key={index}>
                    <td scope="row">{elem.reference}</td>
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
              : <></>
          }
        </tbody>
      </table>
      {listRefs &&
      <nav aria-label="Page navigation example">

        <ul class="pagination justify-content-center">
          <li>
            <CFormSelect
              aria-label="Perpage"
              className='text-center'
              onChange={(e) => handlePerPageChange(e.target.value)}
              value={perpage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </CFormSelect>
          </li>
          {
            pages.map((p, index) => {
              var page_label = index == 0 ? <CIcon icon={cilArrowCircleLeft} /> : index == pages.length - 1 ? <CIcon icon={cilArrowCircleRight} /> : index
              var disabled = (currentPages==1&&index==0) ||(currentPages==pages.length - 2 && index == pages.length-1 )
              console.log(`${disabled} => pages : (${pages.length}/${pages.length - 2}) currentPage: ${currentPages} | index : (${index}/${index+1})`)
              return (
                <li className={`page-item ${disabled ? 'disabled' : ''}`} >
                  <button
                    onClick={() => getData(index)}
                    className={`page-link ${p.active ? 'active' : ''}`}
                    tabindex="-1">{page_label}</button>
                </li>
              )
            })
          }

          {/* <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li> */}
        </ul>
      </nav>}
    </div>
    {
      !listRefs &&
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  </div>
)
}

export default Refernces