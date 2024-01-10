import React, { useEffect, useState } from 'react'
import axiosYns from 'src/axios'
import { useNavigate } from 'react-router-dom'
import { CFormInput, CProgress, CProgressBar } from '@coreui/react'
import moment from 'moment'


function NewRefernces() {
  const [doctypes, setdoctypes] = useState(null)
  const [selectedDoctypes, setSelectedDoctypes] = useState(null)
  const [sujet, setSujet] = useState(null)
  const [reference, setRefernce] = useState(null)
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
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
    <div className="addcard-container">
      <div className="addcard">
        <div className="addcard-body">      
        <div className="d-flex w-75 mx-auto mb-3">
          <label htmlFor="reference">Reference</label>
          <CFormInput
            type="text"
            className="form-control text-center"
            id="reference"
            onChange={(e) => setRefernce(e.target.value)}
          />
        </div>
          <div className="d-flex w-75 mx-auto mb-3">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control text-center"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="d-flex w-75 mx-auto mb-3">
            <label htmlFor="sujet">Sujet</label>
            <textarea
              className="form-control text-center"
              id="sujet"
              onChange={(e) => setSujet(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex w-75 mx-auto mb-3">
            <label htmlFor="docTypes">Type</label>
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
          </div>
          <div className="d-flex w-75 mx-auto mb-3">
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
      </div>
    </div>
  )
}

export default NewRefernces