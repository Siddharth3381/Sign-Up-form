const form = document.querySelector(".form");

const fieldIDs = ["firstName", "lastName", "emailAddress", "password"];
const fieldIDsVsInputElement = fieldIDs.reduce((acc, key) => {
  return { ...acc, [key]: document.getElementById(key) };
}, {});

const fieldIDsVsInputElementError = fieldIDs.reduce((acc, key) => {
  return { ...acc, [key]: document.querySelector(`.${key}Error`) };
}, {});

fieldIDs.forEach((fieldId) => {
  const inputElement = fieldIDsVsInputElement[fieldId];
  const errorElement = fieldIDsVsInputElementError[fieldId];
  inputElement.addEventListener("input", () => {
    if (inputElement.validity.valid) {
      errorElement.textContent = "";
      errorElement.className = "error";
    } else showError(fieldId);
  });
});

form.addEventListener("submit", (event) => {
  let formValidated = true;
  fieldIDs.forEach((fieldId) => {
    const inputElement = fieldIDsVsInputElement[fieldId];
    if (!inputElement.validity.valid) {
      showError(fieldId);
      formValidated = false;
    }
  });
  if (!formValidated) {
    event.preventDefault();
    return;
  }
  fieldIDs.forEach((fieldId) => {
    const inputElement = fieldIDsVsInputElement[fieldId];
    inputElement.value = "";
  });
  alert("Details Submitted");
});

function showError(fieldId) {
  const inputElement = fieldIDsVsInputElement[fieldId];
  const errorElement = fieldIDsVsInputElementError[fieldId];
  if (inputElement.validity.valueMissing) {
    errorElement.textContent = `${fieldId} cannot be empty`;
    errorElement.className = "error active";
  }
  if (fieldId === "emailAddress" && inputElement.validity.typeMismatch) {
    errorElement.textContent = "looks like this is not an Email";
    errorElement.className = "error active";
  }
}
