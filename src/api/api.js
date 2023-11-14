//API.js interacting with a backend server to fetch and send data.
//Making API requests

import axios from "axios"; //to fetch data from server.
//uses axios library to make HTTP requests to an API endpoint

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const TOKEN_KEY = "token";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class EventApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${EventApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  }

  // Individual API routes
  //manages api calls in a structured manner to interact with backend
  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async authenticate(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page.--> updates */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async deleteProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "delete");
    return res.deleted;
  }

  /****PASSWORD */

  static async changePassword(username, password, newPassword) {
    let res = await this.request(
      `users/${username}/change-password`,
      { password, newPassword },
      "patch"
    );
    return res;
  }

  //*********** EVENTS *************/

  /** Get all events */

  static async getEvents() {
    let res = await this.request("events");
    return res.events;
  }

  /** Get details on a event by id. */

  static async getEventById(id) {
    let res = await this.request(`events/${id}`);
    return res.event;
  }

  /** Get events by artist id */
  static async getEventsByArtistId(artistId) {
    let res = await this.request(`events/events-by-artist/${artistId}`);
    return res.events;
  }

  static async getEventsWithArtists() {
    let res = await this.request("events/event-artists");

    return res.eventartists;
  }

  /** Search all events */
  static async searchEvents(userInput) {
    let res = await this.request(`events?term=${userInput}`);
    return res.events;
  }

  /** Get event suggestions */
  static async getSuggestions() {
    let res = await this.request(`suggest`);
    return res.suggest;
  }

  //*********** VENUES *************/

  /** Get all venues. */

  static async getVenues() {
    let res = await this.request("venues");
    return res.venues;
  }

  /** Get details on a venue by id. */

  static async getVenuesById(id) {
    let res = await this.request(`venues/${id}`);
    return res.venue;
  }

  /** Get venue by name */
  static async getVenuesByName(name) {
    let res = await this.request(`venues/by-name/${name}`);
    return res.venue;
  }

  /**search venues */
  static async searchVenues(userInput) {
    let res = await this.request(`venues?term=${userInput}`);
    return res.venues;
  }
  /** Get events by venue id */
  static async getEventsByVenueId(venueId) {
    let res = await this.request(`events/events-by-venue/${venueId}`);
    return res.events;
  }
  //*********** ARTISTS *************/

  /** Get all artists. */

  static async getArtists() {
    let res = await this.request("artists");
    return res.artists;
  }

  /** Get details on a artist by name. */
  static async getArtist(name) {
    let res = await this.request("artist", { name });
    return res.artist;
  }

  /** Get details on a artist by id. */

  static async getArtistById(id) {
    let res = await this.request(`artists/${id}`);
    return res.artist;
  }

  /** Search artists */
  static async searchArtists(userInput) {
    let res = await this.request(`artists?term=${userInput}`);
    return res.artists;
  }

  //*********** REVIEWS *************/

  /** Get all reviews */
  static async getReviews(username) {
    let res = await this.request(`users/${username}/reviews`);
    return res.reviews;
  }
  /** Add Review */
  static async addReview(username, artistId, data) {
    try {
      console.log("Adding Review:", { username, artistId, data });

      let res = await this.request(
        `users/${username}/reviews/${artistId}`,
        data,
        "post"
      );

      console.log("API Response:", res);

      return res.added;
    } catch (error) {
      console.error("Error in addReview:", error);
      throw error; // Rethrow the error to handle it at the component level if needed
    }
  }

  /** Edit Review.--> updates */

  static async editReview(username, reviewId, data) {
    let res = await this.request(
      `users/${username}/reviews/${reviewId}`,
      data,
      "patch"
    );
    return res.user;
  }

  /**Get reviews by artist */
  static async getReviewsByArtistId(artist_id) {
    try {
      let res = await this.request(`users/reviews-by-artist/${artist_id}`);
      console.log("API Response:", res);
      return res.reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; // Rethrow the error to handle it at the component level if needed
    }
  }

  /*Check if Artist Reviewed*/
  static async checkIfArtistIsReviewed(username, artistId) {
    try {
      const response = await this.request(
        `users/${username}/reviews/${artistId}`
      );
      return response.reviewed; // Assuming your API returns a boolean value
    } catch (error) {
      // Handle any API request errors here
      console.error("Error checking if artist is reviewed:", error);
      return false; // Return false by default if there's an error
    }
  }

  /** Delete Review */
  static async deleteReview(username, artistId) {
    try {
      const res = await this.request(
        `users/${username}/reviews/${artistId}`,
        null, // No data is needed for a DELETE request
        "delete"
      );

      if (res.deleted) {
        console.log("Artist removed from reviews successfully.");
        return true;
      } else {
        console.log("Artist removal was not successful.");
        return false;
      }
    } catch (error) {
      console.error("Error while removing artist from reviews:", error);
      return false; // Return false if there's an error
    }
  }

  //*********** FAVORITES *************/

  /** Get all favorites */
  static async getFavorites(username) {
    let res = await this.request(`users/${username}/favorites`);
    return res.favorites;
  }
  /** Add favorite */
  static async addFavorite(username, artistId, data) {
    let res = await this.request(
      `users/${username}/favorites/${artistId}`,
      data,
      "post"
    );
    return res.added;
  }

  static async checkIfArtistIsFavorited(username, artistId) {
    try {
      const response = await this.request(
        `users/${username}/favorites/${artistId}`
      );
      return response.favorited; // Assuming your API returns a boolean value
    } catch (error) {
      // Handle any API request errors here
      console.error("Error checking if artist is favorited:", error);
      return false; // Return false by default if there's an error
    }
  }

  /** Delete favorite */
  static async deleteFavorite(username, artistId) {
    try {
      const res = await this.request(
        `users/${username}/favorites/${artistId}`,
        null, // No data is needed for a DELETE request
        "delete"
      );

      if (res.deleted) {
        console.log("Artist removed from favorites successfully.");
        return true;
      } else {
        console.log("Artist removal was not successful.");
        return false;
      }
    } catch (error) {
      console.error("Error while removing artist from favorites:", error);
      return false; // Return false if there's an error
    }
  }
  //*********** CATEGORIES *************/

  /** Get all categories*/
  static async getCategories() {
    let res = await this.request(`categories`);
    return res.categories;
  }

  /** Get events by category name*/
  static async getEventsByCategory(categoryName) {
    let res = await this.request(`events/events-by-category/${categoryName}`);
    return res.events;
  }

  //*********** GENRES *************/

  /** Get all genres*/
  static async getGenres() {
    let res = await this.request(`genres`);
    return res.genres;
  }
}
export default EventApi;
