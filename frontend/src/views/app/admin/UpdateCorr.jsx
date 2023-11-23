import React, {useState, useEffect} from 'react'
import axiosYns from 'src/axios'
import { useParams } from 'react-router-dom'
import './newcorr.css'
const UpdateCorr = () => {

    const params = useParams()
    const currentId = params.id
    const [info, setInfo] = useState({})
    const [doctypes, setdoctypes] = useState(null)
    const [formData, setFormData] = useState(new FormData())



    const [corr, setCorr] = useState({
      ref: '',
      date:'',
      sujet:'',
      selectedDoctypes:'',
      texte:''
  })

    const getCorr = async () => {
      await axiosYns.get(`/types-textes-reglementaires`)
        .then(({ data }) => {
          setdoctypes(data.data)
        })
        .catch(err => {
          console.log('err', err)
        })
    }

    const getInfo = async () => {
      await axiosYns.get(`/textes-reglementaires/${currentId}`)
        .then(({ data }) => {
          setCorr({...corr, ref: data.data.ref, date: data.data.date, sujet: data.data.sujet, selectedDoctypes: data.data.doctype_id, texte: data.data.texte})
          
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  

    useEffect(() => {
      getCorr();
      getInfo()
    }, [])
    
    console.log(corr)

    const handleChange = e => {
      const value = e.target.id == "texte" ? e.target.files[0] : e.target.value
      setCorr({...corr, [e.target.id]: value})
  }


    const updateData = async (e) => {
        
        formData.set('ref', corr.ref);
        formData.set('date', corr.date);
        formData.set('sujet', corr.sujet);
        formData.set('selectedDoctypes', corr.selectedDoctypes);
        
        if (corr.texte instanceof File) {
          formData.set('texte', corr.texte);
        }
    
        console.log(corr.texte)
        
        e.preventDefault()

    
        
        try {
          const response = await axiosYns.post(`/texte-update/${currentId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept':'application/json'
            },
          });
      
          console.log('Response:', response);
        } catch (error) {
          console.error('Error updating data:', error);
        }
      };

  return (
    <div>
      <div className="d-flex w-75 mx-auto mb-3">
      <label htmlFor="reference">Reference</label>
        <input
          type="text"
          className="form-control"
          id="ref"
          value={corr.ref}
          onChange={handleChange}
        />
        
      </div>
      <div className="d-flex w-75 mx-auto mb-3">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={corr.date}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex w-75 mx-auto mb-3">
        <label htmlFor="sujet">Sujet</label>
        <textarea
          className="form-control"
          id="sujet"
          value={corr.sujet}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="d-flex w-75 mx-auto mb-3">
        <label htmlFor="docTypes">Document Types</label>
        <select
          className="form-select"
          id='selectedDoctypes'
          value={corr.selectedDoctypes !== null ? parseInt(corr.selectedDoctypes) : ''}
          onChange={handleChange}
        >
          <option value="">Select Document Type</option>
          {doctypes &&
            doctypes.map((d, index) => (
              <option key={index} value={d.id}>
                {d.nom}
              </option>
            ))}
        </select>
      </div>
      <div className="d-flex w-75 mx-auto mb-3">
        <input
          type="file"
          className="form-control"
          id='texte'
          
          onChange={handleChange}
        />
        
      </div>
      <button onClick={updateData} className='mt-3 d-block mx-auto w-25 btn btn-primary'>Ajouter</button>
      {JSON.stringify(corr)}
    </div>
  )
}

export default UpdateCorr