import { Link } from "react-router-dom";
const About: React.FC = () => {
  return (
    <>
      <h1>About</h1>
      <p>
        Welcome to a simple shopping cart example, you can navigate to{" "}
        <Link to="/store">store</Link> to test the application
      </p>
    </>
  );
};

export default About;
