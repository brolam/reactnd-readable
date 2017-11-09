export function parseReportValidityMethod(inputElement) {
  if (isNotNeedToSetNewReportValidityMethod(inputElement)) return
  //Set a new reportValidity method: 
  inputElement.reportValidity = function () {
    const value = getValueOrDefaulValue(inputElement)
    if (isInputElementRequiredAndValid(inputElement, value)) return true
    return false;
  }
}

function isNotNeedToSetNewReportValidityMethod(inputElement) {
  return inputElement.reportValidity
}

function getValueOrDefaulValue(inputElement) {
  return (inputElement.value.length) === 0 ?
    inputElement.defaultValue
    :
    inputElement.value
}

function isInputElementRequiredAndValid(inputElement, value) {
  return ((inputElement.required) && value && value.trim().length > 0)
}
