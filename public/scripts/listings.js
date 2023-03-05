// Function to check if a with a certain name exists
const  checkCookieExists = function(cookieName) {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName + '=') === 0) {
      return true;
    }
  }
  return false;
};

$(() => {
  if (checkCookieExists('admin')) {
    $('.nav-menu-buttons span:eq(1)').text('MY FAVOURITES');
  }
});
