import React, { useState, useEffect } from 'react';
import styles from './PersonCard.module.css';

const PersonCard = ({
  id,
  name,
  title,
  salary,
  phone,
  email,
  animal,
  startDate,
  location,
  department,
  skills = [],
  profilePicture, 
  onUpdate,
  onDelete
}) => {
  const calculateExperience = () => {
    const start = new Date(startDate);
    const now = new Date();
    const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return { years, months };
  };

  const { years, months } = calculateExperience();

  const reminder =
    [5, 10, 15].includes(years) && months === 0
      ? '🎉 Schedule recognition meeting.'
      : years === 0 && months < 6
      ? '🔔 Schedule probation review.'
      : '';

  const addAnimalEmoji = (animalName) => {
    const emojiMap = {
      rabbit: '🐇', tiger: '🐅', dog: '🐕', cat: '🐈', fox: '🦊',
      panda: '🐼', 'polar bear': '🐻‍❄️', seal: '🦭', owl: '🦉', lion: '🦁', bear: '🐻'
    };
    return emojiMap[animalName?.toLowerCase()] || '';
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    salary: salary.toString(),
    location,
    department,
    skills: Array.isArray(skills) ? skills.join(', ') : skills,
  });

  useEffect(() => {
    setFormState({
      salary: salary.toString(),
      location,
      department,
      skills: Array.isArray(skills) ? skills.join(', ') : skills,
    });
  }, [salary, location, department, skills]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const updated = {
      salary: Number(formState.salary),
      location: formState.location,
      department: formState.department,
      skills: formState.skills.split(',').map((s) => s.trim()),
    };
    await onUpdate(id, updated);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormState({
      salary: salary.toString(),
      location,
      department,
      skills: Array.isArray(skills) ? skills.join(', ') : skills,
    });
    setIsEditing(false);
  };

  return (
    <div className={styles.personCard}>
      {isEditing ? (
        <>
          {Object.entries(formState).map(([key, value]) => (
            <div key={key} className={styles.field}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          ))}
          <div className={styles.divider}></div>  
          <div className={styles.buttons}>
            <button className={`${styles.buttonBase} ${styles.save}`} onClick={handleSave}>Save</button>
            <button className={`${styles.buttonBase} ${styles.cancel}`} onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
       <div className={styles.nameTitle}>
  {profilePicture && (
    <img src={profilePicture} alt="Profile" className={styles.avatar} />
  )}
  <div className={styles.nameTitleText}>
    <h3 className={styles.name}>{name}</h3>
    <p className={styles.title}>{title}</p>
  </div>
</div>



          <p><strong>Salary:</strong> {salary}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Animal:</strong> {animal} {addAnimalEmoji(animal)}</p>
          <p><strong>Start Date:</strong> {startDate}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Department:</strong> {department}</p>
          <p><strong>Skills:</strong> {Array.isArray(skills) ? skills.join(', ') : skills}</p>

          {reminder && (
            <div className={`${styles.reminderMessage} ${reminder.includes('🎉') ? styles.celebration : styles.probation}`}>
              {reminder}
            </div>
          )}
          <div className={styles.divider}></div>
          <div className={styles.buttonGroup}>
            <button className={styles.buttonBase} onClick={() => setIsEditing(true)}>Edit</button>
            <button className={`${styles.buttonBase} ${styles.delete}`} onClick={() => onDelete(id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonCard;
