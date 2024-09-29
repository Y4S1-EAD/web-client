import React, {useState} from "react";
import {Form, Button, Alert} from "react-bootstrap";
import axios from "axios"; // Import axios
import "../../styles/login.css";
import BackgroundImage from "../../assets/background.png";
import Logo from "../../assets/logo.png";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputRole, setInputRole] = useState("Select Role"); // New state for role

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Simple validation to ensure role is selected
    if (inputRole === "Select Role") {
      setShow(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_WEB_API}/users/login`,
        {
          username: inputUsername,
          password: inputPassword,
          role: inputRole, // Send role to API
        }
      );

      // Assuming the API returns success with user data
      if (response.data) {
        console.log(`Login successful for user: ${response.data.username}`);

        // Store username and role in session storage
        sessionStorage.setItem("username", inputUsername);
        sessionStorage.setItem("role", inputRole);

        // Redirect to the dashboard or another page
        window.location.href = "/";
      } else {
        setShow(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setShow(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (role) => {
    setInputRole(role); // Set selected role
  };

  const handlePassword = () => {
    // Add your "forgot password" logic here
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{backgroundImage: `url(${BackgroundImage})`}}
    >
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>
        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username, password, or role.
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="userRole">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="user-role"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {inputRole}
            </button>
            <div className="dropdown-menu" aria-labelledby="user-role">
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleRoleChange("Admin")}
              >
                I am Admin
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleRoleChange("CRM")}
              >
                I am CRM
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleRoleChange("Vendor")}
              >
                I am Vendor
              </a>
            </div>
          </div>
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Forgot password?
          </Button>
        </div>
      </Form>
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by SLIIT-SSD | &copy;2024
      </div>
    </div>
  );
};

export default Login;
