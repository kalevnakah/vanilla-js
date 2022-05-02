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
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Alias is not valid');
  }
}

//Check required fields
function checkRequired(inputArr){
  let isRequired = false;
  inputArr.forEach(function(input){
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
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

//Check passwords match
function checkKeyCodesMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, 'KeyCodes do not match');
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
  checkEmail(alias);
  checkKeyCodesMatch(keyCode, keyCode2);
  console.log(prisonerId.value);
});