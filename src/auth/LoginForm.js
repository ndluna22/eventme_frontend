import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { ButtonsStyles } from "../common/Buttons";
/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /homepage route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors",
    formErrors
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /events.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    // Reset form errors
    setFormErrors([]);

    try {
      let result = await login(formData);

      if (result.success) {
        navigate("/");
      } else {
        // Check for specific error conditions
        if (result.errors.includes("Invalid username/password")) {
          setFormErrors(["Invalid username or password. Please try again."]);
        } else {
          setFormErrors(result.errors);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setFormErrors(["An unexpected error occurred. Please try again."]);
    }
  }

  /** Update form data field */ function handleChange(name, value) {
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <form onSubmit={handleSubmit}>
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
              <h3>Log In</h3>
              <Grid item xs={6}>
                <div className="card-body">
                  <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    value={formData.username}
                    onChange={(evt) =>
                      handleChange("username", evt.target.value)
                    }
                    autoComplete="username"
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
                  autoComplete="password"
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
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
