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
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');

// Create a shortcode to display the URL expander form
function url_expander_shortcode() {
    return '
    <form id="url-expander-form">
        <input type="text" id="short-url" placeholder="Enter shortened URL">
        <button type="submit">Expand URL</button>
    </form>
    <div id="expanded-url"></div>
    ';
}
add_shortcode('url_expander', 'url_expander_shortcode');
