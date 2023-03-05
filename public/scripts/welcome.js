// Client facing scripts here

$(() => {
  $('#user-btn').on('click', (event) => {
    document.cookie = "admin= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    event.preventDefault();
    document.cookie = "user=true";
    window.location.href = '/listings';
  });
  $('#admin-btn').on('click', (event) => {
    document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    event.preventDefault();
    document.cookie = "admin=true";
    window.location.href = '/listings';
  });
});
