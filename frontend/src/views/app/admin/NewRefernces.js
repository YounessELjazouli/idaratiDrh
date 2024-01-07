import React, { useEffect, useState } from 'react'
import axiosYns from 'src/axios'
import { useNavigate } from 'react-router-dom'
import { CFormInput, CProgress, CProgressBar } from '@coreui/react'


function NewRefernces() {
  const [doctypes, setdoctypes] = useState(null)
  const [selectedDoctypes, setSelectedDoctypes] = useState(null)
  const [sujet, setSujet] = useState(null)
  const [reference, setRefernce] = useState(null)
  const [date, setDate] = useState(null)
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [uploaded_percent, setUploaded_percent] = useState(0);
  const uploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    setUploaded_percent(percent);

  };
  const Navigate = useNavigate();
  const getDocTypes = async () => {
    await axiosYns.get('/types-correspondances')
      .then(({ data }) => {
        setdoctypes(data.data)
      })
  }
  useEffect(() => {
    getDocTypes();
  }, [])
  const storeData = async () => {
    setIsLoading(true);
    const formData = new FormData();

    await Promise.all([
      formData.append('reference', reference),
      formData.append('date', date),
      formData.append('objet', sujet),
      formData.append('selectedDoctypes', selectedDoctypes),
      formData.append('file', file),
    ]);


    const response = await axiosYns.post('/correspondances', {
      'reference': reference,
      'date': date,
      'objet': sujet,
      'selectedDoctypes': selectedDoctypes,
      'file': file,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: uploadProgress
    });
    if (response) {
      Navigate('/references-juridiques')
    }
    setIsLoading(false);
  }
  return (
    <div>
      <div className="form-floating mb-3">
        <CFormInput
          type="text"
          className="form-control text-center"
          id="reference"
          onChange={(e) => setRefernce(e.target.value)}
        />
        <label htmlFor="reference">Reference</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="date"
          className="form-control text-center"
          id="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="date">Date</label>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control text-center"
          id="sujet"
          onChange={(e) => setSujet(e.target.value)}
        ></textarea>
        <label htmlFor="sujet">Sujet</label>
      </div>
      <div className="form-floating mb-3">
        <select
          className="form-control text-center form-select"
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
        <label htmlFor="docTypes">Document Types</label>
      </div>
      <div className="d-flex flex-column mb-3">
        <input
          type="file"
          className="form-control text-center"
          onChange={(e) => setFile(e.target.files[0])}
          accept="application/pdf"
          />
          
        {
          uploaded_percent > 0 &&
          <CProgress value={uploaded_percent}>
            <CProgressBar className="overflow-visible text-dark px-2" color="success">{uploaded_percent < 100 ? "Téléchargement : " + uploaded_percent + " %" : "Sauvegarde..."}</CProgressBar>
          </CProgress>
        }
      </div>
      <div className='d-flex justify-content-center'>
        <button onClick={() => { Navigate(-1) }} className='mt-3 d-block mx-auto w-25 btn btn-danger'>
          <span role="status">Annuler</span>
        </button>
        <button onClick={storeData} className='mt-3 d-block mx-auto w-25 btn btn-primary'
          disabled={isLoading}>
          {isLoading ? <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> : ""}
          <span role="status">Ajouter</span>
        </button>
        
      </div>
    </div>
  )
}

export default NewRefernces