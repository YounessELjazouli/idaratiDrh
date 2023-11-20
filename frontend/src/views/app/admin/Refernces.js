import React, { useEffect, useState } from 'react';
import axiosYns from 'src/axios';
import { CCard } from '@coreui/react';
const moment = require('moment');

function Refernces() {
  const [listRefs, setlistRefs] = useState(null);
  const [filteredListRefs, setfilteredListRefs] = useState(null);
  const [isFiltered, setIsFilterd] = useState(false);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

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

  const filterByref = (value) => {
    setfilteredListRefs(listRefs.filter((e) => {
      return e.reference.toLowerCase().includes(value.toLowerCase());
    }))
    setIsFilterd(true);
  }

  const handleDateChange = (value) => {
    setDateRange(value);
    filterDataByDate(value);
  };

  const filterByDate = (dateD,dateF) => {
    console.log(dateD+" "+dateF);
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

  return (
    <div>
      <CCard className='my-3 container'>
        <div className='row'>
          <input type='text'
            placeholder='Filter par ref'
            onChange={(e) => filterByref(e.target.value)}
            className='w-25' />
        <div>
          <input type="date" value={dateDebut} onChange={(e) => filterByDate(e.target.value,dateFin)} />
          <input type="date"  value={dateFin}  onChange={(e) => filterByDate(dateDebut,e.target.value)} />
        </div>
        </div>

      </CCard>
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
                (isFiltered ? filteredListRefs : listRefs).map((elem, index) => {
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