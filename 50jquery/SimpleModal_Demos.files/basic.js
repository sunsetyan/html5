/*
 * SimpleModal Basic Modal Dialog
 * http://www.ericmmartin.com/projects/simplemodal/
 * http://code.google.com/p/simplemodal/
 *
 * Copyright (c) 2007 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Revision: $Id: basic.js 99 2008-02-04 16:31:09Z emartin24 $
 *
 */

$(document).ready(function () {
	$('#basicModal input:eq(0)').click(function (e) {
		e.preventDefault();
		$('#basicModalContent').modal();
	});
});