// 🎯 PART 1 & 2: EVENT HANDLING + INTERACTIVE ELEMENTS

// =============================================
// 🌓 1. DARK MODE TOGGLE
// =============================================
const darkModeToggle = document.getElementById('darkModeToggle');

// Check for saved preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  // Save preference
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// =============================================
// 🎮 2. COUNTER GAME
// =============================================
const counterDisplay = document.getElementById('counterDisplay');
const counterBtn = document.getElementById('counterBtn');
let count = 0;

counterBtn.addEventListener('click', function() {
  count++;
  counterDisplay.textContent = count;
  // Change color if over 10
  counterDisplay.style.color = count > 10 ? '#4CAF50' : '#333';
});

counterBtn.addEventListener('dblclick', function() {
  count = 0;
  counterDisplay.textContent = count;
  counterDisplay.style.color = '#333';
});

// =============================================
// ❓ 3. COLLAPSIBLE FAQ
// =============================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    answer.classList.toggle('show');
    // Toggle ARIA for accessibility
    const isExpanded = answer.classList.contains('show');
    this.setAttribute('aria-expanded', isExpanded);
  });
});

// =============================================
// 📑 4. TABBED INTERFACE
// =============================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active to clicked tab
    this.classList.add('active');
    const targetTabId = this.getAttribute('data-tab');
    document.getElementById(targetTabId).classList.add('active');
  });
});

// =============================================
// 📋✅ 5. FORM VALIDATION (PART 3)
// =============================================
const form = document.getElementById('userForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const ageInput = document.getElementById('age');

// Helper: Set validation state
function setValidationState(input, isValid, message) {
  const errorSpan = input.nextElementSibling;
  if (isValid) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorSpan.textContent = '✅';
    errorSpan.style.color = '#4CAF50';
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
    errorSpan.textContent = message;
    errorSpan.style.color = '#f44336';
  }
}

// Validate Full Name
function validateName() {
  const value = fullNameInput.value.trim();
  const isValid = value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
  setValidationState(fullNameInput, isValid, '❌ Name must be at least 2 letters (no numbers/symbols)');
  return isValid;
}

// Validate Email
function validateEmail() {
  const value = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  setValidationState(emailInput, isValid, '❌ Please enter a valid email');
  return isValid;
}

// Validate Password
function validatePassword() {
  const value = passwordInput.value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValid = passwordRegex.test(value);
  setValidationState(passwordInput, isValid, '❌ 8+ chars, 1 uppercase, 1 number, 1 symbol');
  return isValid;
}

// Validate Confirm Password
function validateConfirmPassword() {
  const isValid = confirmPasswordInput.value === passwordInput.value;
  setValidationState(confirmPasswordInput, isValid, '❌ Passwords do not match');
  return isValid;
}

// Validate Age
function validateAge() {
  const value = parseInt(ageInput.value);
  const isValid = !isNaN(value) && value >= 13 && value <= 120;
  setValidationState(ageInput, isValid, '❌ Age must be between 13 and 120');
  return isValid;
}

// Attach real-time validation
fullNameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);
ageInput.addEventListener('input', validateAge);

// Form Submit Validation
form.addEventListener('submit', function(e) {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirmPassword();
  const isAgeValid = validateAge();

  if (!(isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isAgeValid)) {
    e.preventDefault(); // ❌ Prevent form submission
    alert('❌ Please fix all errors before submitting.');
  } else {
    alert('✅ Form submitted successfully!');
    // Normally you'd send data to server here
  }
});