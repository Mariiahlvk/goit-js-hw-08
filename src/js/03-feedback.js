import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

let currentFormData = formData;

formDataStorage();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));

function onTextareaInput(event) {
  currentFormData = {
    ...currentFormData,
    [event.target.name]: event.target.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentFormData));
}

function onFormSubmit(event) {
  event.preventDefault();
  currentFormData = formData;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentFormData));

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  currentFormData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || formData;
  return currentFormData;
}

function formDataStorage() {
  const { email, message } = populateTextarea();
  input.value = email;
  textarea.value = message;
}
