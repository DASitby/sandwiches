//jquery ready function//
$(document).ready(function() {
  $('.sales-container').on('click', '.individual-sales-container', function() {

    $('.messages-conversation-container').empty();
    // Get sale ID from data attribute
    let saleId = $(this).data('sale-id');
    $.ajax({
      url: '/conversation',
      method: 'GET',
      success: function(messages) {
        // Handle the response from the server

        for (let message of messages) {
          if (message.sale_id === saleId) {
            if (message.admin_is_sender) {
              $('.messages-conversation-container').append(`<div class="admin-conversation-container">ADMIN: ${message.body}</div>`);
            }
            if (!message.admin_is_sender) {
              $('.messages-conversation-container').append(`<div class="user-conversation-container">ADMIN: ${message.body}</div>`);
            }
          }

        }
      },
      error: function(xhr, status, error) {
        // Handle any errors that occur during the AJAX request
        console.log('Error:', error);
      }
    });


    // // Hide all messages
    // $('.message').hide();

    // // Show messages related to clicked sale
    // $('.message').filter('[data-sale-id="' + saleId + '"]').show();
  });
});
