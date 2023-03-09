$(() => {
  $('.garbage-icon').on('click', (event) => {
    let listingID = event.target.baseURI.substring(31);
    $.post(`/listings/${listingID}/delete`);
  });
});
