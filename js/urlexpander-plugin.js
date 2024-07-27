jQuery(document).ready(function($) {
    $('#url-expander-form').on('submit', function(e) {
        e.preventDefault();

        var shortUrl = $('#short-url').val();

        $.ajax({
            url: 'https://oyster-app-axykz.ondigitalocean.app//expand',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ short_url: shortUrl }),
            success: function(response) {
                $('#expanded-url').text('Expanded URL: ' + response.expanded_url);
            },
            error: function() {
                $('#expanded-url').text('Error expanding URL.');
            }
        });
    });
});
