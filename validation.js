(function (root) {
  const MAX_BIO_LENGTH = 250;

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function validateFullName(value) {
    const trimmedValue = String(value || '').trim();

    if (trimmedValue.length === 0) {
      return { isValid: false, message: 'Full name is required.' };
    }

    if (trimmedValue.length < 2) {
      return { isValid: false, message: 'Full name must be at least 2 characters.' };
    }

    return { isValid: true, message: '' };
  }

  function validateEmail(value) {
    const trimmedValue = String(value || '').trim();

    if (trimmedValue.length === 0) {
      return { isValid: false, message: 'Email is required.' };
    }

    if (!isValidEmail(trimmedValue)) {
      return { isValid: false, message: 'Enter a valid email address.' };
    }

    return { isValid: true, message: '' };
  }

  function validateTimezone(value) {
    if (String(value || '').trim() === '') {
      return { isValid: false, message: 'Choose a timezone.' };
    }

    return { isValid: true, message: '' };
  }

  function validateLanguage(value) {
    if (String(value || '').trim() === '') {
      return { isValid: false, message: 'Choose a language.' };
    }

    return { isValid: true, message: '' };
  }

  function validateBio(value) {
    const bioValue = String(value || '');

    if (bioValue.length > MAX_BIO_LENGTH) {
      return { isValid: false, message: 'Bio cannot exceed 250 characters.' };
    }

    return { isValid: true, message: '' };
  }

  function validateSettings(data) {
    const fullName = validateFullName(data.fullName);
    const email = validateEmail(data.email);
    const timezone = validateTimezone(data.timezone);
    const language = validateLanguage(data.language);
    const bio = validateBio(data.bio);

    return {
      isValid: fullName.isValid && email.isValid && timezone.isValid && language.isValid && bio.isValid,
      fullName,
      email,
      timezone,
      language,
      bio
    };
  }

  const api = {
    MAX_BIO_LENGTH,
    isValidEmail,
    validateFullName,
    validateEmail,
    validateTimezone,
    validateLanguage,
    validateBio,
    validateSettings
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  root.SettingsValidation = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
