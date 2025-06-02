import React from 'react';
import PersonCard from '../PersonCard/PersonCard';
import styles from './Personlist.module.css';

const PersonList = ({ employeeData, onUpdateEmployee }) => {
  return (
    <>
      <h1 className={styles.heading }>Employee Details</h1>
      <div className="employeeList">
        {employeeData.length > 0 ? (
          employeeData.map((employee) => (
            <PersonCard
              key={employee.id}      
              {...employee}
              onUpdate={onUpdateEmployee}
            />
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </>
  );
};

export default PersonList;
