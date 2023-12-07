import React, {useState, useEffect,Suspense} from 'react'
import axiosYns from 'src/axios'
import { useNavigate } from 'react-router-dom'
import './newcorr.css'
import { CProgress, CProgressBar } from '@coreui/react'
const NewCorr = () => {
const navigate = useNavigate()
    const [doctypes, setdoctypes] = useState(null)
    const [selectedDoctypes, setSelectedDoctypes] = useState(null)
    const [sujet, setSujet] = useState(null)
    const [reference, setRefernce] = useState(null)
    const [date, setDate] = useState(null)
    const [file, setFile] = useState(null)

    const [uploaded_percent,setUploaded_percent]=useState(0);

    const [loading,setLoading] = useState(false)
    const getDocTypes = async () => {
      await axiosYns.get('/types-textes-reglementaires')
        .then(({ data }) => {
          setdoctypes(data.data)
        })
    }
    useEffect(() => {
      getDocTypes();
    }, [])
    const uploadProgress = (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setUploaded_percent(percent);
      
    };
    const storeData = async () => {
        const formData = new FormData();
        formData.append('ref', reference);
        formData.append('date', date);
        formData.append('sujet', sujet);
        formData.append('selectedDoctypes', selectedDoctypes);
        formData.append('texte', file);  // Make sure 'file' matches the name used in the Laravel controller
       
        try {
          setLoading(true);
          const response = await axiosYns.post('/textes-reglementaires', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: uploadProgress//progressEvent => console.log(progressEvent.loaded)
          });
      
          console.log('Response:', response.data);
          setUploaded_percent(0);
          navigate('/correspondances-juridiques')
        } catch (error) {
          console.error('Error storing data:', error);
        }
        setLoading(false);
      };

  return (
    <div>
      <div className="d-flex w-75 mx-auto mb-3">
      <label htmlFor="reference">Reference</label>
        <input
          type="text"
          className="form-control"
          id="reference"
          onChange={(e) => setRefernce(e.target.value)}
        />
        
      </div>
      <div className="d-flex w-75 mx-auto mb-3">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="d-flex w-75 mx-auto mb-3">
        <label htmlFor="sujet">Sujet</label>
        <textarea
          className="form-control"
          id="sujet"
          onChange={(e) => setSujet(e.target.value)}
        ></textarea>
      </div>
      <div className="d-flex w-75 mx-auto mb-3">
        <label htmlFor="docTypes">Document Types</label>
        <select
          className="form-select"
          onChange={(e) => setSelectedDoctypes(e.target.value)}
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
      <div className="d-flex flex-column w-75 mx-auto mb-3">
        <input
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {
        uploaded_percent>0 &&
        <CProgress value={uploaded_percent}>
          <CProgressBar className="overflow-visible text-dark px-2" color="success">{uploaded_percent<100?"Téléchargement : "+uploaded_percent+" %":"Sauvegarde..."}</CProgressBar>
        </CProgress>
        }
      </div>
        <button disabled={loading} onClick={storeData} className='mt-3 d-block mx-auto w-25 btn btn-primary'>
        
          {loading?<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>:""} 
          <span role="status">Ajouter</span>
          
          </button>
      
    </div>
  )
}

export default NewCorr