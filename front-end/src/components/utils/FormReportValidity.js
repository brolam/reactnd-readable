
/**
 * simulates the reportValidity method when the web browser is not compatible.
 */
export function reportValidity() {
  const value = getValueOrDefaulValue(this)
  if (isInputRequiredAndNotValid(this, value)) return false
  if (isInputHasMinLengthAndNotValid(this, value)) return false
  if (isInputHasMaxLengthAndNotValid(this, value)) return false
  return true;
}

export function parseReportValidityMethod(input) {
  if (isNotNeedToSetNewReportValidityMethod(input)) return
  //Set a new reportValidity method: 
  input.reportValidity = reportValidity
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
