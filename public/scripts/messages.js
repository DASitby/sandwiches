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
        let gluten_free;
        let vegetarian;
        for (let message of messages) {
          if (message.sale_id === saleId) {
            if (message.admin_is_sender) {
              $('.messages-conversation-container').append(`<div class="admin-conversation-container">ADMIN: ${message.body}</div>`);
            }
            if (!message.admin_is_sender) {
              $('.messages-conversation-container').append(`<div class="user-conversation-container">USER: ${message.body}</div>`);
            }
          }
        }

        for (let message of messages) {
          if (message.sale_id === saleId) {
            if (message.glute_free) {
              gluten_free = 'Yes';
            } else {
              gluten_free = 'No';
            }
            if (message.vegetarian) {
              vegetarian = 'Yes';
            } else {
              vegetarian = 'No';
            }
            $('.listing-display-container').html(`
            <div class="messages-image-container">
            <img src="${message.thumbnail_url}" alt="listing image">
            </div>

          <section class="listing-description-container">
            <ul>
              <td><span style="color: #e0e0e0">TITLE: ${message.title}</span></td><br>
              <td><span style="color: #e0e0e0">DESCRIPTION: ${message.description}</span></td><br>
              <td><span style="color: #e0e0e0">SIZE: ${message.size} </span></td><br>
              <td><span style="color: #e0e0e0">GLUTEN FREE: ${gluten_free}</span></td><br>
              <td><span style="color: #e0e0e0">VEGETARIAN: ${vegetarian}</span></td><br>
              <td><span style="color: #e0e0e0">PROTEIN: ${message.protein}</span></td><br>
              <td><span style="color: #e0e0e0">BREAD: ${message.bread_type}</span></td><br>
              <td><span style="color: #e0e0e0">PRICE: $${message.price / 100}</span></td>
            </ul>
          </section>
            `);
            $('.message-input-form').html(`
            <form method="POST" class="message-and-button-container" action="/messages/${message.sale_id}">
              <textarea name="text" id="message-text" class="messages-text-enter"></textarea>
              <button type="submit" class="messages-send-button">Send</button>
          </form>
            `);
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
