import React, { useEffect, useState } from 'react';
import axiosYns from 'src/axios';

function Refernces() {
  const [listRefs, setlistRefs] = useState(null);
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
  }, [])
  return (
    <div>
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Réfernce</th>
              <th>Date</th>
              <th>Objet</th>
              <th>Type</th>
              <th>File</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {
              listRefs ?
                listRefs.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <td>{elem.reference}</td>
                      <td>{elem.date}</td>
                      <td>{elem.objet}</td>
                      <td>{elem.type}</td>
                      <td>{elem.file}</td>
                      <td>
                        <button onClick={() => update(elem.id)} className='btn btn-primary'>Update</button>
                        <button onClick={() => delete (elem.id)} className='btn btn-danger'>Delete</button>
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