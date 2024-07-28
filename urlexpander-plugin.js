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
                if (response.success && response.data) {
                  //  $('#urlexpander-result').html(response.data.expanded_url); // Adjust depending on actual API response structure
		    var expandedUrl = response.data.expanded_url;
                    var formattedResponse = '<p style="font-weight: bold; font-size: 14px; text-decoration: underline;">Here is your full URL:</p>';
                    formattedResponse += '<a href="' + expandedUrl + '" target="_blank">' + expandedUrl + '</a>';
                    $('#urlexpander-result').html(formattedResponse);
                } else {
                    $('#urlexpander-result').html('Failed to expand URL');
                }
            }
        });
    });
});

