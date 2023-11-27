import React, { useEffect, useState } from 'react'
import axiosYns from 'src/axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function NewRefernces() {
  const params = useParams()
  const currentId = params.id

  const [doctypes, setdoctypes] = useState(null)
  const [newDoctypes, setNewDoctypes] = useState(null)
  const [selectedDoctypes, setSelectedDoctypes] = useState(null)
  const [newSelectedDoctypes, setNewSelectedDoctypes] = useState(null)
  const [sujet, setSujet] = useState(null)
  const [newSujet, setNewSujet] = useState(null)
  const [reference, setRefernce] = useState(null)
  const [newReference, setNewRefernce] = useState(null)
  const [date, setDate] = useState(null)
  const [newDate, setNewDate] = useState(null)
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
    });
    if (response) {
      Navigate('/references-juridiques')
    }
    setIsLoading(false);
  }
  return (
    <div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="reference"
          onChange={(e) => setRefernce(e.target.value)}
        />
        <label htmlFor="reference">Reference</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="date"
          className="form-control"
          id="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="date">Date</label>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          id="sujet"
          onChange={(e) => setSujet(e.target.value)}
        ></textarea>
        <label htmlFor="sujet">Sujet</label>
      </div>
      <div className="form-floating mb-3">
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
        <label htmlFor="docTypes">Document Types</label>
      </div>
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <button onClick={storeData} className='mt-3 d-block mx-auto w-25 btn btn-primary'
        disabled={isLoading}>Ajouter</button>
    </div>
  )
}

export default NewRefernces