import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { ButtonsStyles } from "../common/Buttons";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "SignupForm",
    "signup=",
    typeof signup,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /homepage.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      navigate("/homepage"); // Change this line
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(name, value) {
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid
            container
            spacing={2}
            columns={10}
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <h3>Sign Up</h3>
            <Grid item xs={6}>
              <div className="card-body">
                <TextField
                  required
                  id="outlined-required"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={(evt) => handleChange("username", evt.target.value)}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(evt) => handleChange("password", evt.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-password-input"
                label="First Name"
                name="firstName"
                required
                value={formData.firstName}
                onChange={(evt) => handleChange("firstName", evt.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-password-input"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={(evt) => handleChange("lastName", evt.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-password-input"
                label="E-mail"
                type="email"
                name="email"
                value={formData.email}
                onChange={(evt) => handleChange("email", evt.target.value)}
              />
            </Grid>

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            <ButtonsStyles
              text="Submit"
              className="form-group"
              onClick={handleSubmit}
            ></ButtonsStyles>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default SignupForm;
