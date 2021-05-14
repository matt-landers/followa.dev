<?php
/**
 * Plugin Name: FollowA.Dev
 * Description: FollowA.Dev
 * Author: Matt Landers
 * Author URI: http://www.mattlanders.com
 * Version: 0.0.1
 * Text Domain: followa.dev
 * Domain Path: /languages/
 * License: GPL-3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 */

 
require_once plugin_dir_path( __FILE__ ) . '/src/PrefersColorSchemeEnum.php';
require_once plugin_dir_path( __FILE__ ) . '/src/UserUpdateFields.php';
require_once plugin_dir_path( __FILE__ ) . '/src/ResetPasswordSettings.php';

(new FollowADev\PrefersColorSchemeEnum())->register_hooks();
(new FollowADev\UserUpdateFields())->register_hooks();
(new FollowADev\ResetPasswordSettings())->register_hooks();