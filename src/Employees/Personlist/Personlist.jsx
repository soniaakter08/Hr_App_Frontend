import React, { useState } from 'react';
import PersonCard from '../PersonCard/PersonCard';
import styles from './Personlist.module.css';
import axios from 'axios';

const PersonList = ({ employeeData, onUpdateEmployee, onDeleteEmployee }) => {
  const [search, setSearch] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const uniqueTitles = [...new Set(employeeData.map(emp => emp.title))];

  const filteredEmployees = employeeData.filter(emp => {
    const matchesName = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesTitle = selectedTitle ? emp.title === selectedTitle : true;
    return matchesName && matchesTitle;
  });

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`https://hr-app-backend-9g16.onrender.com/employees/${id}`);
  //     onDeleteEmployee(id);
  //   } catch (err) {
  //     console.error("Error deleting employee:", err);
  //     alert("Failed to delete employee.");
  //   }
  // };

  const handleSearchClick = () => {
  };

  return (
    <>
      <h1 className={styles.heading}>Employee Details</h1>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
        />
        <select
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All</option>
          {uniqueTitles.map((title) => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </div>
      <div className={styles.employeeList}>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <PersonCard
              key={employee.id}
              {...employee}
              onUpdate={onUpdateEmployee}
              onDelete={onDeleteEmployee} 
            />
          ))
        ) : (
          <div className={styles.noEmployees}>
            <p>No employees match your search criteria.</p>
            <p>Try different search terms or filters.</p>
            
          </div>
        )}
      </div>
    </>
  );
};

export default PersonList;
