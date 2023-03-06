// Client facing scripts here

$(() => {
  $('#user-btn').on('click', (event) => {
    document.cookie = "admin= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "admin_id= ";
    event.preventDefault();
    document.cookie = "user=true";
    document.cookie = "user_id=1";
    window.location.href = '/listings';
  });
  $('#admin-btn').on('click', (event) => {
    document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user_id= ";
    event.preventDefault();
    document.cookie = "admin=true";
    document.cookie = "admin_id=1";
    window.location.href = '/listings';
  });
});
