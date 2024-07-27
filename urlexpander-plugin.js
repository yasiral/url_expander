jQuery(document).ready(function($) {
    $('#urlexpander-expand-btn').on('click', function(e) {
        e.preventDefault();

        var shortUrl = $('#urlexpander-input').val();

        $.ajax({
            type: 'POST',
            url: urlexpander_vars.ajax_url,
            data: {
                action: 'urlexpander',
		nonce: urlexpander_vars.nonce,
                short_url: shortUrl
            },
            beforeSend: function() {
                    $('#urlexpander-result').html('Expanding URL...');
                },
            success: function(response) {
                $('#urlexpander-result').html(response);
            }
        });
    });
});


