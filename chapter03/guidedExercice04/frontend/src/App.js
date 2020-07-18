import React, { useState, useEffect } from 'react';
import * as api from './api/apiService';
import GradesControl from './components/GradesControl';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGrades = async() => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000)
    };

    // api.getAllGrades().then((grades) => {
    //   setTimeout(() => {
    //     setAllGrades(grades)
    //   }, 2000)
    //   }
    // )

    getGrades();
  });

  const handleDelete = () => {
    
  }
  const handlePersist = () => {
    
  }

  return (
    <div>
      <h1>Grades control</h1>

      {allGrades.length == 0 && <p>Loading grades</p>}

      {allGrades.length > 0 && <GradesControl grades={allGrades} onDelete={handleDelete} onPersist={handlePersist}/>}
    </div>
  )
}
