// Client facing scripts here
$(() => {
  $('#user-btn').on('click', (event) => {
    event.preventDefault();
    document.cookie = "user=true";
    window.location.href = '/listings';
  });
  $('#admin-btn').on('click', (event) => {
    event.preventDefault();
    document.cookie = "admin=true";
    window.location.href = '/listings';
  });
});
