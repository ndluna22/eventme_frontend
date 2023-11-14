import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  const [value, setValue] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  function loggedInNav() {
    return (
      <Box sx={{ typography: "body1", marginLeft: "auto" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Search" value="1" component={NavLink} to="/search" />
              <Tab
                label="Artists"
                value="2"
                component={NavLink}
                to="/artists"
              />
              <Tab label="Events" value="3" component={NavLink} to="/events" />

              <FormControl>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    Categories
                  </MenuItem>
                  <MenuItem
                    value="Arts & Theatre"
                    onClick={() => navigate(`/categories/${selectedCategory}`)}
                  >
                    Arts & Theatre
                  </MenuItem>

                  <MenuItem
                    value="Music"
                    onClick={() => navigate(`/categories/${selectedCategory}`)}
                  >
                    Music
                  </MenuItem>
                  <MenuItem
                    value="Sports"
                    onClick={() => navigate(`/categories/${selectedCategory}`)}
                  >
                    Sports
                  </MenuItem>
                  <MenuItem
                    value="Miscellaneous"
                    onClick={() => navigate(`/categories/${selectedCategory}`)}
                  >
                    Miscellaneous
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    My Profile
                  </MenuItem>

                  <MenuItem
                    value="My Favorites"
                    onClick={() =>
                      navigate(`/users/${currentUser.username}/favorites`)
                    }
                  >
                    My Favorites
                  </MenuItem>

                  <MenuItem
                    value="My Reviews"
                    onClick={() =>
                      navigate(`/users/${currentUser.username}/reviews`)
                    }
                  >
                    My Reviews
                  </MenuItem>

                  <MenuItem
                    value="Edit Profile"
                    onClick={() => navigate(`/profile`)}
                  >
                    Edit Profile
                  </MenuItem>
                  <MenuItem
                    value="Log Out"
                    onClick={() => {
                      logout(); // Assuming logout is a function that logs the user out
                      navigate(`/profile`);
                    }}
                  >
                    {`Log out (${
                      currentUser.first_name || currentUser.username
                    })`}
                  </MenuItem>

                  {/* <Tab
                label={`Log out ${
                  currentUser.first_name || currentUser.username
                }`}
                value="7"
                component={Link}
                to="/"
                onClick={logout}
              /> */}
                </Select>
              </FormControl>
            </TabList>
          </Box>
        </TabContext>
      </Box>
    );
  }

  function loggedOutNav() {
    return (
      <Box sx={{ typography: "body1", marginLeft: "auto" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Login" value="1" component={NavLink} to="/login" />

              <Tab label="Sign Up" value="2" component={NavLink} to="/signup" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Home" value="1" component={NavLink} to="/" />

            {currentUser ? loggedInNav() : loggedOutNav()}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}

export default Navigation;
