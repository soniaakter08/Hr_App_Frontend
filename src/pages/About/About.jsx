import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./About.module.css";

const About = () => {
  return (
    <>
      
      <main className={styles.aboutContainer}>
        <section>
          <h1 className={styles.header}>Welcome to the HR App</h1>
          <p>
            This simple yet powerful tool helps manage employee data with ease.
            Whether you're a small team or a growing organization, this app
            lets you track and update essential staff information in one place.
          </p>
        </section>

        <section>
          <h2>What You Can Do</h2>
          <ul>
            <li> View employee details including contact, role, and salary</li>
            <li>Edit employee data like department, skills, or location</li>
            <li>Add new employees with a simple form</li>
            <li>Real-time data updates via a connected backend (JSON server)</li>
            <li>Responsive and user-friendly interface</li>
          </ul>
        </section>

        <section>
          <h2>Getting Started</h2>
          <p>
            Navigate to <strong>Employees</strong> to see all current team
            members or head to <strong>Add new employee</strong> to register a new
            team member. All updates are saved automatically to the backend.
          </p>
        </section>
      </main>
      
    </>
  );
};

export default About;
