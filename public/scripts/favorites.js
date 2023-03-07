$(() => {
  $('.favorite-btn').on('click', (event) => {
    event.preventDefault();
    $.post('/favorites');
  });
});
