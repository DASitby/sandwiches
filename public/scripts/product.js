$(() => {
  $('.favorite-btn').on('click', (event) => {
    let listingID = event.target.baseURI.substring(31);
    $.post(`/favorites/${listingID}`);
  });
});

$(() => {
  $('.del-favorite-btn').on('click', (event) => {
    let listingID = event.target.baseURI.substring(31);
    $.post(`/favorites/delete/${listingID}`);
  });
});

$(() => {
  $('.garbage-icon').on('click', (event) => {
    let listingID = event.target.baseURI.substring(31);
    $.post(`/listings/${listingID}/delete`);
  });
});

$(() =>{
  $('.buy-btn').on('click', (event) => {
    let listingID = event.target.baseURI.substring(31);
    $.post(`/listings/${listingID}/buy`);
  });
});
