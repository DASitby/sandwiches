$(() => {
  $('.favorite-btn').on('click', (event) => {
    let listingID = event.target.baseURI.substring(31);
    $.post(`/favorites/:${listingID}`);
  });
});
