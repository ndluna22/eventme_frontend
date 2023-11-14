import React from "react";

const extractChannelId = (url) => {
  try {
    const urlObject = new URL(url);
    const path = urlObject.pathname;
    const parts = path.split("/");
    return parts[parts.length - 1];
  } catch (error) {
    console.error("Error extracting channel ID:", error);
    return null; // or handle the error in a way that makes sense for your application
  }
};

export default extractChannelId;
