import { useState } from "react";
import { useNavigate } from "react-router";
import styles from './AddEmployee.module.css';

const AddEmployee = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    salary: '',
    phone: '',
    email: '',
    animal: '',
    startDate: '',
    location: '',
    department: '',
    skills: '',
    profilePicture: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      ...formData,
      salary: Number(formData.salary),
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    // ✅ Just pass to parent – let App.js handle POST + state
    onAddEmployee(newEmployee);
    navigate('/person');

    // Optionally reset form
    setFormData({
      name: '',
      title: '',
      salary: '',
      phone: '',
      email: '',
      animal: '',
      startDate: '',
      location: '',
      department: '',
      skills: '',
      profilePicture: ''
    });
  };

  return (
    <>
      <h1 className={styles.title}>Add New Employee</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {[
          { name: 'name', placeholder: 'Name' },
          { name: 'title', placeholder: 'Title' },
          { name: 'salary', placeholder: 'Salary', type: 'number' },
          { name: 'phone', placeholder: 'Phone Number', type: 'number' },
          { name: 'email', placeholder: 'Email', type: 'email' },
          { name: 'animal', placeholder: 'Animal' },
          { name: 'startDate', placeholder: 'Start Date' },
          { name: 'location', placeholder: 'Location' },
          { name: 'department', placeholder: 'Department' },
          { name: 'skills', placeholder: 'Skills (comma-separated)' },
          { name: 'profilePicture', placeholder: 'Profile Picture URL' }
        ].map(({ name, placeholder, type = 'text' }) => (
          <input
            key={name}
            type={type}
            placeholder={placeholder}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={styles.input}
            required
          />
        ))}

        <button type="submit" className={styles.submitButton}>
          Add Employee
        </button>
      </form>
    </>
  );
};

export default AddEmployee;