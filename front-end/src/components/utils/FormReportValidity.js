export function parseReportValidityMethod(input) {
  if (isNotNeedToSetNewReportValidityMethod(input)) return
  //Set a new reportValidity method: 
  input.reportValidity = function () {
    const value = getValueOrDefaulValue(input)
    if (isInputRequiredAndNotValid(input, value)) return false
    if (isInputHasMinLengthAndNotValid(input, value)) return false
    if (isInputHasMaxLengthAndNotValid(input, value)) return false
    return true;
  }
}

function isInputHasMinLengthAndNotValid(input, value) {
  return (input.minLength > 0) && (value.trim().length < input.minLength)
}

function isInputHasMaxLengthAndNotValid(input, value) {
  return (input.maxLength > 0) && (value.trim().length > input.maxLength)
}

function isNotNeedToSetNewReportValidityMethod(input) {
  return input.reportValidity
}

function getValueOrDefaulValue(input) {
  return (input.value.length) === 0 ?
    input.defaultValue
    :
    input.value
}

function isInputRequiredAndNotValid(input, value) {
  return !((input.required) && value && value.trim().length > 0)
}
