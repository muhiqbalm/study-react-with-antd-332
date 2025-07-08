const isAllowedControlKey = (e) => {
  return (
    e.ctrlKey ||
    e.metaKey ||
    [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ].includes(e.key)
  );
};

const onlyAlphanumeric = (e) => {
  const key = e.key;
  const isValid = /^[a-zA-Z0-9]$/.test(key);
  if (!isValid && !isAllowedControlKey(e)) {
    e.preventDefault();
  }
};

const onlyNumeric = (e) => {
  const key = e.key;
  const isValid = /^[0-9]$/.test(key);
  if (!isValid && !isAllowedControlKey(e)) {
    e.preventDefault();
  }
};

const passwordValidation = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*().]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

export { onlyAlphanumeric, onlyNumeric, passwordValidation };
