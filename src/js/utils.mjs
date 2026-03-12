// wrapper for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// get/set local storage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get URL parameter
export function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}