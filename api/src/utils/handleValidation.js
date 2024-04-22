const handleValidation = ({ name, url }) => {
  let emptyField = "";
  if (!name || name === "") {
    emptyField = "Name";
  }
  if (!url || url === "") {
    emptyField = "URL";
  }

  if (emptyField !== "") {
    return {
      valid: false,
      message: `${emptyField} cannot be empty`,
    };
  }

  return {
    valid: true,
    message: "All fields are filled.",
  };
};

module.exports = handleValidation;
