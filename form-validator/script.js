const prisonCell = document.getElementById('prisonCell');
const prisonerId = document.getElementById('prisonerId');
const alias = document.getElementById('alias');
const keyCode = document.getElementById('keyCode');
const keyCode2 = document.getElementById('keyCode2');

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

//show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//Check email is valid
function isValidEmail(email) {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return pattern.test(String(email).toLowerCase()); 
}

//Check required fields
function checkRequired(inputArr){
  inputArr.forEach(function(input){
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });
}

//Check input length
function checkLength(input, min, max){
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}


// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listener
prisonCell.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([prisonerId, alias, keyCode, keyCode2]);
  checkLength(prisonerId, 3, 15);
  checkLength(keyCode, 6, 25);
  console.log(prisonerId.value);
});