import React, { useEffect, useState } from 'react';
import axiosYns from 'src/axios';
import { CCard, CFormInput, CImage, CInputGroup, CInputGroupText, CNav, CNavItem, CNavLink } from '@coreui/react';
import { cilCloudDownload, cilTrash, cilPenAlt, cilClearAll, cilFilterX, cilPlus, cilLibraryAdd, cilArrowCircleRight, cilArrowCircleLeft, cilAsteriskCircle, cilCalendar, cilSitemap, cilCaretRight, cilCaretLeft, cilViewStream, cilLowVision, cilLayers, cilActionUndo } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
const moment = require('moment');
import { useNavigate } from 'react-router-dom';
import { CFormSelect } from '@coreui/react';
import eyes from 'src/assets/icons/eyes.svg'

// import dayjs, { Dayjs } from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';



function Refernces() {
  const Navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [perpage, setPerPage] = useState(5);
  const [currentPages, setCurrentPages] = useState(1);
  const [listRefs, setlistRefs] = useState(null);
  const [filteredListRefs, setfilteredListRefs] = useState(null);
  const [isFiltered, setIsFilterd] = useState(false);
  const [dateDebut, setDateDebut] = useState(moment().format('YYYY-MM-DD'));
  const [dateFin, setDateFin] = useState(moment().format('YYYY-MM-DD'));
  const [doctypes, setdoctypes] = useState(null)
  const [selectedDoctype, setSelectedDoctype] = useState('');
  const [loading_page,setLoading_page] = useState(false)
  const [activeKey, setActiveKey] = useState(1)

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
    setCurrentPages(PG);
    setLoading_page(true);
    var axios_params = { page: PG, per_page: perpage,variant:activeKey }
    console.log(axios_params);
    await axiosYns.get('/paginate/correspondances', { params: axios_params })
      .then(({ data }) => {
        // setlistRefs(data.data)
        setlistRefs(data.data.data)
        setPages(data.data.links)
      }).catch((err) => {
        console.log(err);
      })
      setLoading_page(false);
  }
  useEffect(() => {
    getData();
  }, [perpage,activeKey])

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

  // const DD = moment(dateD);
  // const DF = moment(dateF);

  setDateDebut(dateD);
  setDateFin(dateF);

  const filteredData = listRefs.filter((item) => {
    if (dateD && dateF) {
      const itemDate = moment(item.date);
      const formattedDate = itemDate.format('YYYY-MM-DD');
      // console.log(`${dateD} <===============(${formattedDate})=============> ${dateF}`)
      return formattedDate >= dateD && formattedDate <= dateF;
      // return formattedDate >= DD && formattedDate <= DF;
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
const viewPDF = (url) => {
  var pdfURL=`http://localhost:8000/${url}`;
  Navigate(`/pdf`,{
    state: {
      url: pdfURL,
    }
  })
}
const download = (url) => {
  window.open(`http://localhost:8000/${url}`, '_blank')
}
const update = async(ref) => {
  if(activeKey==2){
    await axiosYns.put('/correspondance', {id:ref.id,restor:true})
    .then((response)=>{
      console.log("restor REF",response.data)
      getData();
    })
  }
  else{
    Navigate(`/updateRef/${ref.id}`)
  }
}
const deleteRef = (id) => {
  axiosYns.delete(`/correspondances/${id}`,{data:{isDestroy:activeKey==2}})
    .then((response) => {
      console.log("destroy",response.data)
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
          <CInputGroup className="">
            <CInputGroupText>
              <CIcon icon={cilLayers} />
            </CInputGroupText>
            <CFormSelect
              aria-label="Perpage"
              className='text-center'
              onChange={(e) => handlePerPageChange(e.target.value)}
              value={perpage}
            >
              <option value="5">5/page</option>
              <option value="10">10/page</option>
              <option value="15">15/page</option>
              <option value="20">20/page</option>
              <option value="25">25/page</option>
              <option value="30">30/page</option>
            </CFormSelect>
          </CInputGroup>
        </div>
        <div className='col-md-2 d-flex align-items-center'>
          <CInputGroup className="">
            <CInputGroupText>
              <CIcon icon={cilClearAll} />
            </CInputGroupText>
            <CFormInput placeholder="Filter par ref" onChange={(e) => filterByref(e.target.value)} />
          </CInputGroup>
        </div>
        <div className='col-md-4 d-flex justify-content-center align-items-center'>
          <CInputGroup className="">
            <CInputGroupText>
              <CIcon icon={cilCaretRight} />
            </CInputGroupText>
            <CFormInput
              type='date' 
              value={dateDebut}
              placeholder='date debut'
              onChange={(e) => filterByDate(e.target.value, dateFin)}
              />
          </CInputGroup>
          <CInputGroup className="">
            <CInputGroupText>
              <CIcon icon={cilCaretLeft} />
            </CInputGroupText>
            <CFormInput
              type='date' 
              placeholder='date Fin'
              value={dateFin}
              onChange={(e) => filterByDate(dateDebut, e.target.value)}
              />
          </CInputGroup>
          {/* <input
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
          />*/}
        </div>
        <div className='col-md-3 d-flex align-items-center'>
          <CInputGroup className="">
            <CInputGroupText>
              <CIcon icon={cilSitemap} />
            </CInputGroupText>
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
          </CInputGroup>
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
            <CIcon size='xl' icon={cilLayers} />
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
            <CIcon size='xl' icon={cilTrash} />
          </CNavLink>
        </CNavItem>
      </CNav>
      {/* finTabs */}
    <div style={{minHeight:300}} class="table-responsive">
      {
        loading_page ?
        <div class="text-center mt-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        :
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
            <th scope="col">created By</th>
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
                    <td>{elem.user?elem.user.name:"***"}</td>
                    <td className='d-flex justify-content-around'>
                      <button onClick={() => update(elem)} className='btn btn-primary'>
                        <CIcon icon={activeKey==1?cilPenAlt:cilActionUndo} />
                      </button>
                      <button onClick={() => deleteRef(elem.id)} className='btn btn-danger'>
                        <CIcon icon={cilTrash} />
                      </button>
                      <button onClick={() => viewPDF(elem.file)} className='btn btn-secondary'>
                        {/* <CIcon icon={cilLowVision} /> */}
                        <CImage width={18} height={18} src={eyes} />
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
      }
      
    </div>
    {(listRefs && pages.length>3 ) &&
      <nav aria-label="Page navigation example">

        <ul class="pagination justify-content-center">
          {
            pages.map((p, index) => {
              var page_label = index == 0 ? <CIcon icon={cilArrowCircleLeft} /> : index == pages.length - 1 ? <CIcon icon={cilArrowCircleRight} /> : index
              var disabled = (currentPages==1&&index==0) ||(currentPages==pages.length - 2 && index == pages.length-1 )
              // console.log(`${disabled} => pages : (${pages.length}/${pages.length - 2}) currentPage: ${currentPages} | index : (${index}/${index+1})`)
              return (
                <li className={`page-item ${disabled ? 'disabled' : ''}`} >
                  <button
                    onClick={() => getData(index)}
                    className={`page-link ${p.active ? 'active' : ''}`}
                    tabindex="-1">
                      {(loading_page && currentPages==index)?<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>:page_label} 
                      </button>
                </li>
              )
            })
          }
        </ul>
      </nav>}
    {
      // !listRefs &&
      // <div class="text-center">
      //   <div class="spinner-border" role="status">
      //     <span class="visually-hidden">Loading...</span>
      //   </div>
      // </div>
    }
  </div>
)
}

export default Refernces