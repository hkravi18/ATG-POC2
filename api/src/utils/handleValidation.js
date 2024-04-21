const handleValidation = ({
  name,
  url,
  about,
  bio,
  location,
  followerCount,
  connectionCount,
}) => {
  let emptyField = "";
  if (name === "") {
    emptyField = "Name";
  }
  if (url === "") {
    emptyField = "URL";
  }
  if (about === "") {
    emptyField = "About";
  }
  if (bio === "") {
    emptyField = "Bio";
  }
  if (location === "") {
    emptyField = "Location";
  }
  if (followerCount === "") {
    emptyField = "Follower Count";
  }
  if (connectionCount === "") {
    emptyField = "Connection Count";
  }

  if (emptyField !== "") {
    return {
      valid: false,
      message: `${emptyField} cannot be empty`,
    };
  }
};

module.exports = handleValidation;
