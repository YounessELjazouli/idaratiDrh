import React, { useEffect, useState } from 'react'
import axiosYns from 'src/axios'

function NewRefernces() {
  const [doctypes, setdoctypes] = useState(null)
  const [selectedDoctypes, setSelectedDoctypes] = useState(null)
  const [sujet, setSujet] = useState(null)
  const [reference, setRefernce] = useState(null)
  const [date, setDate] = useState(null)
  const [file, setFile] = useState(null)
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
    const formData = new FormData();
    formData.append('reference', reference);
    formData.append('date', date);
    formData.append('objet', sujet);
    formData.append('selectedDoctypes', selectedDoctypes);
    formData.append('file', file);
    const response = await axiosYns.post('/correspondances', formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Response:', response.data);

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
          onChange={(e) => setFile(e.target.value)}
        />
      </div>
      <button onClick={storeData} className='mt-3 d-block mx-auto w-25 btn btn-primary'>Ajouter</button>
    </div>
  )
}

export default NewRefernces