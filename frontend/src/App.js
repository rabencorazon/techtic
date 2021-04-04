import './App.css';

import { useEffect, useState } from 'react';
import Table from './components/table/table';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let startDatePicker = <DatePicker selected={startDate} onChange={date => setStartDate(date)} />;
  let endDatePicker = <DatePicker selected={endDate} onChange={date => setEndDate(date)} />

  useEffect(() => {
    fetch("http://localhost:4545/stats")
      .then(response => response.json())
      .then(resData => {
        console.log(resData)
        setData(resData.data);
      })
  }, []);

  const getStats = ({ clear = false }) => {
    let url = "http://localhost:4545/stats";

    if (startDate && !clear) url += `?sd=${startDate}&ed=${endDate ? endDate : new Date()}`;

    fetch(url)
      .then(response => response.json())
      .then(resData => {
        console.log(resData)
        setData(resData.data);
      })
  }

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    getStats({ clear: true });
  }

  return (
    <div>
      <div>
        Start Date : {startDatePicker}
      </div>

      <div>
        End Date : {endDatePicker}
      </div>
      {/* {show} */}
      <button onClick={getStats}>Get stats!</button>
      <button onClick={clearFilters}>Remove filters!</button>
      <Table records={data} />
    </div>
  );
}

export default App;
