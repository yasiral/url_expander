jQuery(document).ready(function($) {
    $$('#urlexpander-expand-btn').on('click', function() {
        e.preventDefault();

        var shortUrl = $('#urlexpander-input').val();

        $.ajax({
            type: 'POST',
            url: urlexpander_vars.ajax_url,
            data: {
                action: 'urlexpander',
				nonce: urlexpander_ajax.nonce,
                short_url: shortUrl
            },
            beforeSend: function() {
                    $('#rlexpander-result').html('Expanding URL...');
                },
            success: function(response) {
                    if (response.success) {
                        $('#rlexpander-result').html('Expanded URL: <a href="' + response.data.expanded_url + '" target="_blank">' + response.data.expanded_url + '</a>');
                    } else {
                        $('#rlexpander-result').html('Error: ' + response.data);
                    }
                },
                error: function() {
                    $('#rlexpander-result').html('An error occurred. Please try again.');
                }
            });
        } else {
            $('#rlexpander-result').html('Please enter a URL to expand.');
        }
    });
});


