import React, { useState, useContext } from "react";
import { Alert } from "../common/Alert";
import EventApi from "../api/api";
import UserContext from "../auth/UserContext";
import { ButtonsStyles, IconLabelButtons } from "../common/Buttons";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
// import { red } from "@mui/material/colors";

import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  console.debug(
    "ProfileForm",
    "currentUser=",
    currentUser,
    "formData=",
    formData,
    "formErrors=",
    formErrors,
    "saveConfirmed=",
    saveConfirmed,
    "deleteConfirmed=",
    deleteConfirmed
  );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await EventApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData((f) => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  }
  /** Handle form data changing */
  function handleChange(name, value) {
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleDelete() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (isConfirmed) {
      let username = formData.username;

      try {
        const response = await EventApi.deleteProfile(username);
        console.log("Delete Profile Response:", response);
        setDeleteConfirmed(true);
        setCurrentUser(null); // Clear the current user from context or perform any necessary cleanup
      } catch (errors) {
        // Handle errors if needed
        console.error("Error deleting profile:", errors);
        setFormErrors(["Error deleting profile. Please try again."]);
      }

      setFormData((f) => ({ ...f, password: "" }));
      setFormErrors([]);
      setDeleteConfirmed(true);
    }
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
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
          <h3>Edit Profile</h3>
          <Grid item xs={6}>
            <div className="card-body">
              <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                value={formData.username}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              name="firstName"
              value={formData.firstName}
              onChange={(evt) => handleChange("firstName", evt.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              name="lastName"
              value={formData.lastName}
              onChange={(evt) => handleChange("lastName", evt.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={(evt) => handleChange("email", evt.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-required"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(evt) => handleChange("password", evt.target.value)}
            />
          </Grid>
          {formErrors.length ? (
            <Alert type="danger" messages={formErrors} />
          ) : null}

          {saveConfirmed ? (
            <Alert type="success" messages={["Updated successfully."]} />
          ) : null}

          <ButtonsStyles
            text="Save Changes"
            className="form-group"
            onClick={handleSubmit}
          ></ButtonsStyles>

          {deleteConfirmed ? (
            formErrors.length === 0 ? (
              <Alert type="success" messages={["Deleted successfully."]} />
            ) : (
              <Alert type="danger" messages={formErrors} />
            )
          ) : null}

          <IconLabelButtons
            text="Delete Profile"
            className="form-group"
            onClick={handleDelete}
          ></IconLabelButtons>
        </Grid>
      </Box>
    </div>
  );
}
export default ProfileForm;
