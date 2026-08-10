const settingsForm = document.getElementById('settings-form');
const ValidationApi = window.SettingsValidation;

const fields = {
  fullName: {
    element: document.getElementById('full-name'),
    error: document.getElementById('full-name-error')
  },
  email: {
    element: document.getElementById('email'),
    error: document.getElementById('email-error')
  },
  timezone: {
    element: document.getElementById('timezone'),
    error: document.getElementById('timezone-error')
  },
  language: {
    element: document.getElementById('language'),
    error: document.getElementById('language-error')
  },
  bio: {
    element: document.getElementById('bio'),
    error: document.getElementById('bio-error')
  }
};

const maxBioLength = ValidationApi.MAX_BIO_LENGTH;
const bioCounter = document.getElementById('bio-counter');
const successMessage = document.getElementById('success-message');

function showError(fieldName, message) {
  const fieldConfig = fields[fieldName];
  const field = fieldConfig.element;

  field.classList.add('is-invalid');
  field.classList.remove('is-valid');

  field.setAttribute('aria-invalid', 'true');
  fieldConfig.error.textContent = message;
  fieldConfig.error.classList.add('has-error');
}

function clearError(fieldName) {
  const fieldConfig = fields[fieldName];
  const field = fieldConfig.element;

  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  field.setAttribute('aria-invalid', 'false');
  fieldConfig.error.textContent = '';
  fieldConfig.error.classList.remove('has-error');
}

function validateFullName() {
  const result = ValidationApi.validateFullName(fields.fullName.element.value);

  if (!result.isValid) {
    showError('fullName', result.message);
    return false;
  }

  clearError('fullName');
  return true;
}

function validateEmail() {
  const result = ValidationApi.validateEmail(fields.email.element.value);

  if (!result.isValid) {
    showError('email', result.message);
    return false;
  }

  clearError('email');
  return true;
}

function validateTimezone() {
  const result = ValidationApi.validateTimezone(fields.timezone.element.value);

  if (!result.isValid) {
    showError('timezone', result.message);
    return false;
  }

  clearError('timezone');
  return true;
}

function validateLanguage() {
  const result = ValidationApi.validateLanguage(fields.language.element.value);

  if (!result.isValid) {
    showError('language', result.message);
    return false;
  }

  clearError('language');
  return true;
}

function validateBio() {
  const result = ValidationApi.validateBio(fields.bio.element.value);

  if (!result.isValid) {
    showError('bio', result.message);
    return false;
  }

  clearError('bio');
  return true;
}

function validateSettings() {
  const validFullName = validateFullName();
  const validEmail = validateEmail();
  const validTimezone = validateTimezone();
  const validLanguage = validateLanguage();
  const validBio = validateBio();

  return validFullName && validEmail && validTimezone && validLanguage && validBio;
}

function updateBioCounter() {
  const valueLength = fields.bio.element.value.length;
  const remaining = maxBioLength - valueLength;
  bioCounter.textContent = `${valueLength} / ${maxBioLength}`;

  if (remaining < 30) {
    bioCounter.style.color = '#9a5f15';
  } else {
    bioCounter.style.color = '#667782';
  }
}

fields.fullName.element.addEventListener('input', () => {
  const trimmedValue = fields.fullName.element.value.trim();

  if (trimmedValue.length > 0) {
    validateFullName();
  } else {
    showError('fullName', 'Full name is required.');
  }
});

fields.email.element.addEventListener('input', () => {
  const trimmedValue = fields.email.element.value.trim();

  if (trimmedValue.length > 0) {
    validateEmail();
  } else {
    showError('email', 'Email is required.');
  }
});

fields.timezone.element.addEventListener('change', validateTimezone);
fields.language.element.addEventListener('change', validateLanguage);

fields.bio.element.addEventListener('input', () => {
  updateBioCounter();

  const result = ValidationApi.validateBio(fields.bio.element.value);

  if (!result.isValid) {
    showError('bio', result.message);
  } else {
    fields.bio.error.textContent = '';
    fields.bio.error.classList.remove('has-error');
    fields.bio.element.classList.remove('is-invalid');
    fields.bio.element.classList.add('is-valid');
  }
});

settingsForm.addEventListener('reset', () => {
  window.setTimeout(() => {
    Object.keys(fields).forEach((fieldName) => {
      fields[fieldName].element.classList.remove('is-valid', 'is-invalid');
      fields[fieldName].element.setAttribute('aria-invalid', 'false');
      fields[fieldName].error.textContent = '';
      fields[fieldName].error.classList.remove('has-error');
    });

    fields.bio.element.value = '';
    updateBioCounter();
    successMessage.hidden = true;
  }, 0);
});

settingsForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const isValid = validateSettings();

  if (!isValid) {
    successMessage.hidden = true;
    return;
  }

  successMessage.hidden = false;
  successMessage.textContent = 'Settings saved successfully.';
});

updateBioCounter();
