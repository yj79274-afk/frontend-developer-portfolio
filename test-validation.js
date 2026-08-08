const assert = require('assert');
const { validateFullName, validateEmail, validateTimezone, validateLanguage, validateBio, validateSettings, MAX_BIO_LENGTH } = require('./validation.js');

const validPayload = {
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  timezone: 'UTC',
  language: 'en',
  bio: 'Product-focused frontend developer.'
};

function runValidationCases() {
  const fullNameValid = validateFullName('Ada');
  assert.strictEqual(fullNameValid.isValid, true, 'names with two or more characters should pass');

  const fullNameInvalid = validateFullName('  ');
  assert.strictEqual(fullNameInvalid.isValid, false, 'whitespace-only name should fail');
  assert.strictEqual(fullNameInvalid.message, 'Full name is required.', 'empty whitespace should produce the required-name message');

  const nameTooShort = validateFullName('A');
  assert.strictEqual(nameTooShort.isValid, false, 'single-character name should fail');
  assert.strictEqual(nameTooShort.message, 'Full name must be at least 2 characters.', 'single-character name should show the minimum length message');

  const emailValid = validateEmail('user@example.com');
  assert.strictEqual(emailValid.isValid, true, 'well-formed email should pass');

  const emailInvalid = validateEmail('not-an-email');
  assert.strictEqual(emailInvalid.isValid, false, 'invalid email should fail');
  assert.strictEqual(emailInvalid.message, 'Enter a valid email address.', 'invalid email should show the email format message');

  const emailRequired = validateEmail('');
  assert.strictEqual(emailRequired.isValid, false, 'empty email should fail');
  assert.strictEqual(emailRequired.message, 'Email is required.', 'empty email should show the required message');

  const timezoneRequired = validateTimezone('');
  assert.strictEqual(timezoneRequired.isValid, false, 'empty timezone should fail');
  assert.strictEqual(timezoneRequired.message, 'Choose a timezone.', 'empty timezone should show a timezone-specific error');

  const languageRequired = validateLanguage('');
  assert.strictEqual(languageRequired.isValid, false, 'empty language should fail');
  assert.strictEqual(languageRequired.message, 'Choose a language.', 'empty language should show a language-specific error');

  const bioValid = validateBio('This bio is within the limit.');
  assert.strictEqual(bioValid.isValid, true, 'short bio should pass');

  const bioTooLong = validateBio('x'.repeat(MAX_BIO_LENGTH + 1));
  assert.strictEqual(bioTooLong.isValid, false, 'bio over the maximum should fail');
  assert.strictEqual(bioTooLong.message, 'Bio cannot exceed 250 characters.', 'overlong bio should show the maximum-length message');

  const submission = validateSettings(validPayload);
  assert.strictEqual(submission.isValid, true, 'complete valid settings payload should pass validation');

  const rejected = validateSettings({
    fullName: 'A',
    email: 'bad',
    timezone: '',
    language: '',
    bio: ''.padEnd(MAX_BIO_LENGTH + 1, 'x')
  });

  assert.strictEqual(rejected.isValid, false, 'incomplete invalid payload should be rejected');
  assert.strictEqual(rejected.fullName.isValid, false, 'short full name should be rejected');
  assert.strictEqual(rejected.email.isValid, false, 'invalid email should be rejected');
  assert.strictEqual(rejected.timezone.isValid, false, 'missing timezone should be rejected');
  assert.strictEqual(rejected.language.isValid, false, 'missing language should be rejected');
  assert.strictEqual(rejected.bio.isValid, false, 'overlong bio should be rejected');

  console.log('Validation test suite passed: valid payload, whitespace and min-length name checks, invalid email, required selects, and bio-length edge cases verified.');
}

runValidationCases();
