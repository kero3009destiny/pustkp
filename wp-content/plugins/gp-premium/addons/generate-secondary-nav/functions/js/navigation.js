/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
jQuery( document ).ready( function($) {
	if (typeof jQuery.fn.GenerateMobileMenu !== 'undefined' && jQuery.isFunction(jQuery.fn.GenerateMobileMenu)) {
		// Initiate our mobile menu
		$( '#secondary-navigation .menu-toggle' ).GenerateMobileMenu({
			menu: '.secondary-navigation',
			dropdown_toggle: true
		});
	} else {
		( function() {
			var secondary_container, secondary_button, secondary_menu, secondary_links, secondary_subMenus;

			secondary_container = document.getElementById( 'secondary-navigation' );
			if ( ! secondary_container ) {
				return;
			}

			secondary_button = secondary_container.querySelector('.secondary-menu-toggle');
			if ( 'undefined' === typeof secondary_button ) {
				return;
			}

			secondary_menu = secondary_container.getElementsByTagName( 'ul' )[0];

			// Hide menu toggle button if menu is empty and return early.
			if ( 'undefined' === typeof secondary_menu ) {
				secondary_button.style.display = 'none';
				return;
			}

			secondary_menu.setAttribute( 'aria-expanded', 'false' );
			if ( -1 === secondary_menu.className.indexOf( 'nav-menu' ) ) {
				secondary_menu.className += ' nav-menu';
			}

			secondary_button.onclick = function() {
				if ( -1 !== secondary_container.className.indexOf( 'toggled' ) ) {
					secondary_container.className = secondary_container.className.replace( ' toggled', '' );
					secondary_button.setAttribute( 'aria-expanded', 'false' );
					secondary_menu.setAttribute( 'aria-expanded', 'false' );
				} else {
					secondary_container.className += ' toggled';
					secondary_button.setAttribute( 'aria-expanded', 'true' );
					secondary_menu.setAttribute( 'aria-expanded', 'true' );
				}
			};

			// Get all the link elements within the menu.
			secondary_links    = secondary_menu.getElementsByTagName( 'a' );
			secondary_subMenus = secondary_menu.getElementsByTagName( 'ul' );

			// Set menu items with submenus to aria-haspopup="true".
			for ( var i = 0, len = secondary_subMenus.length; i < len; i++ ) {
				secondary_subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
			}

			// Each time a menu link is focused or blurred, toggle focus.
			for ( i = 0, len = secondary_links.length; i < len; i++ ) {
				secondary_links[i].addEventListener( 'focus', toggleFocus, true );
				secondary_links[i].addEventListener( 'blur', toggleFocus, true );
			}

			/**
			 * Sets or removes .focus class on an element.
			 */
			function toggleFocus() {
				var secondary_self = this;

				// Move up through the ancestors of the current link until we hit .nav-menu.
				while ( -1 === secondary_self.className.indexOf( 'nav-menu' ) ) {

					// On li elements toggle the class .focus.
					if ( 'li' === secondary_self.tagName.toLowerCase() ) {
						if ( -1 !== secondary_self.className.indexOf( 'focus' ) ) {
							secondary_self.className = secondary_self.className.replace( ' focus', '' );
						} else {
							secondary_self.className += ' focus';
						}
					}

					secondary_self = secondary_self.parentElement;
				}
			}
		} )();
		// Add dropdown toggle that display child menu items.
		jQuery( '.secondary-navigation .page_item_has_children > a, .secondary-navigation .menu-item-has-children > a' ).after( '<a href="#" class="dropdown-toggle" aria-expanded="false"><i class="fa fa-caret-down"></i></a>' );
	}
});