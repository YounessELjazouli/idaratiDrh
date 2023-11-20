import { useEffect, useState, useRef } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CForm,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormTextarea
} from '@coreui/react';
import { DocsExample } from 'src/components'
import axiosYns from 'src/axios';
import CIcon from '@coreui/icons-react';
import { cilSave, cilXCircle, cilTrash, cilHighlighter, cilX } from '@coreui/icons';
import { Toast } from 'src/helpers/toast';
import Swal from 'sweetalert2';
import { Hourglass } from 'react-loader-spinner';
import Popup from 'reactjs-popup';

const Projects = () => {
  const [showForm, setshowForm] = useState(false);
  const [nomProject, setNomProject] = useState(null);
  const [description, setDescription] = useState(false);
  const [projects, setProjects] = useState(null)
  const [dataLoading, setDataLoading] = useState(false)

  const toogleForm = () => {
    setshowForm(!showForm);
    console.log(showForm);
  }
  const cancelStoreProject = () => {
    setshowForm(false);
  }
  const getProject = async () => {
    setDataLoading(true)
    await axiosYns.get('/projects')
      .then(async ({ data }) => {
        if (data.success) {
          await setProjects(data.projects)
          setDataLoading(false)

        }
      }).catch(() => {
        setDataLoading(false)
      })
  }
  useEffect(() => {
    getProject();


  }, [projects]);

  const editProject = (n, d, id) => {
    setshowForm(true);
    setNomProject(n);
    setDescription(d);
  };
  const deleteProject = (id) => {
    axiosYns.delete(`/projects/${id}`).then((response) => {
      if (response.success) {
        Toast.fire(response.data.message, '', 'info');
        getProject();
      } else {
        Toast.fire(response.data.message, '', 'info')
      }
    })
  }

  const storeProject = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: nomProject,
        description: description,
      }
      await axiosYns.post('/projects', formData)
        .then(({ data }) => {
          if (data.success) {
            Toast.fire(data.message, '', 'info');
            getProject();
            setshowForm(false);
          }
        })
    } catch (error) {
      console.log(error);
      Swal.fire("Failed", error, cilSave)

    }

  }
  return (
    <div>
      <CRow className="justify-content-end">
        <CCol xs={12} sm={5} md={4} lg={3} className='mb-3'>
          <div>
            <CButton
              type="button"
              className="button"
              onClick={toogleForm}
              component="input"
              color="success"
              value="Add a new Project"
            ></CButton>


          </div>
        </CCol>
        {
          showForm ?
            <CForm className='mb-2 '>
              <CRow className='justify-content-center align-items-center'>
                <CCol xs={12} sm={5} md={3}>
                  <CFormFloating className='mb-2 '>
                    <CFormInput
                      type="text"
                      id="floatingInputValue"
                      placeholder="Name of your project"
                      value={nomProject || ''}
                      required
                      onChange={(e) => setNomProject(e.target.value)}
                    // defaultValue="test@example.com"
                    />
                    <CFormLabel htmlFor="floatingInputValue">Name of the project</CFormLabel>
                  </CFormFloating>

                </CCol>
                <CCol xs={12} sm={6} md={7}>
                  <CInputGroup className='mb-2'>
                    <CFormTextarea required
                      placeholder="A short descriptiona about your project"
                      value={description || ''}
                      onChange={(e) => setDescription(e.target.value)} ></CFormTextarea>
                  </CInputGroup>
                </CCol>
                <CCol xs={12} sm={1} md={2}>
                  <CButton onClick={storeProject} component="button" variant='outline' type="submit" color="success" style={{ marginRight: "6px" }}>
                    <CIcon icon={cilSave} />
                  </CButton>
                  <CButton onClick={cancelStoreProject} component="button" type="submit" variant='outline' color="danger">
                    <CIcon icon={cilX} />
                  </CButton>
                </CCol>

              </CRow>
            </CForm> : <></>
        }

        <CCol xs={12}>
          <CCard className="mb-4 mx-auto d-block">
            <CCardHeader>
              <small>List of</small> <strong>Created Projects</strong>
            </CCardHeader>
            {
              (projects && projects.length >= 1) ?
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Descreption</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      projects.map((p, index) => {
                        return (
                          <CTableRow key={index}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{p.name}</CTableDataCell>
                            <CTableDataCell>{p.description}</CTableDataCell>
                            <CTableDataCell>
                              <CButton type="button" color="success" onClick={() => editProject(p.name, p.description, p.id)} >
                                <CIcon icon={cilHighlighter} />
                              </CButton>
                              <CButton type="button" color="danger" onClick={() => deleteProject(p.id)} className="ml-2">
                                <CIcon icon={cilTrash} />
                              </CButton>

                            </CTableDataCell>
                          </CTableRow>
                        )
                      })
                    }


                  </CTableBody>
                </CTable>
                : (projects && projects.length < 1) ?
                  <>
                    <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                      <h1>You have not created a project yet</h1>
                      <h2>Add one to get started</h2>
                    </div>
                  </> :
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <Hourglass
                      height="80"
                      width="80"
                      radius="9"
                      color="green"
                      ariaLabel="loading"
                    />
                  </div>
            }


          </CCard>
        </CCol>

      </CRow>
    </div>
  )
}

export default Projects