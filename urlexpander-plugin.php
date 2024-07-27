<?php
/**
 * Plugin Name: URL Expander
 * Description: Expands shortened URLs using a backend API.
 * Version: 1.0
 * Author: Your Name
 */

// Enqueue the JavaScript file
function enqueue_scripts() {
    wp_enqueue_script('your-plugin-js', plugin_dir_url(__FILE__) . 'js/urlexpander-plugin.js', array('jquery'), '1.0', true);
	wp_localize_script('your-plugin-js', 'urlexpander_vars', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'api_url' => 'https://oyster-app-axykz.ondigitalocean.app/>',
		'nonce' => wp_create_nonce('rlexpander-nonce')
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');

// Create a shortcode to display the URL expander form
function url_expander_shortcode() {
   ob_start();
    ?>
    <div id="urlexpander-container">
        <input type="text" id="urlexpander-input" placeholder="Enter shortened URL">
        <button id="urlexpander-expand-btn">Expand URL</button>
        <div id="urlexpander-result"></div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('url_expander', 'url_expander_shortcode');

function urlexpander_ajax_handler() {
	check_ajax_referer('urlexpander-nonce', 'nonce');
    $short_url = sanitize_text_field($_POST['short_url']);
	$response = wp_remote_post('https://oyster-app-axykz.ondigitalocean.app/expand', array(
        'body' => json_encode(array('url' => $short_url)),
        'headers' => array('Content-Type' => 'application/json')
    ));
	
	if (is_wp_error($response)) {
        wp_send_json_error('Error connecting to the server');
    } else {
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        wp_send_json_success($data);
    }
}
add_action('wp_ajax_urlexpander', 'urlexpander_ajax_handler');
add_action('wp_ajax_nopriv_urlexpander', 'urlexpander_ajax_handler');
?>
