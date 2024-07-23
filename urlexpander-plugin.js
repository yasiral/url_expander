jQuery(document).ready(function($) {
    $('#url-expander-form').on('submit', function(e) {
        e.preventDefault();

        var shortUrl = $('#short-url').val();

        $.ajax({
            url: 'http://64.23.184.164:8001/expand',
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
