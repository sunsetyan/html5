
jQuery.fn.checkboxToggle = function(opt){

   var check = jQuery(this).next()[0].checked == true;
   jQuery(this)
		   .attr({ src: check ? opt.unchecked : opt.checked })
		   .next()[0].checked = !check;
}

jQuery.fn.checkbox = function(opt){
   jQuery(":checkbox", this)

	   // Hide each native checkbox
	   .hide()

	   // Iterate through checkboxes and do all the magical stuff
	   .each(function (){

		   jQuery("<img>")

			   // Set image attributes
			   .attr({src: this.checked ? opt.checked : opt.unchecked, alt: "" })

			   //
			   .click(function() {
				   jQuery(this).checkboxToggle(opt);
			   })

			   // Attach image
			   .insertBefore(this);
	   });
}

jQuery.fn.cssCheckboxToggle = function(){
   jQuery(this).each(function(){
      var label = jQuery(this);
      label.toggleClass("checked");
      var check = jQuery(":checkbox[@name='"+label.attr("for")+"']")[0];
      check.checked = !check.checked;
   });
}

jQuery.fn.cssCheckboxCheck = function(){
   jQuery(this).each(function(){
      var label = jQuery(this);
      label.addClass("checked");
      var check = jQuery(":checkbox[@name='"+label.attr("for")+"']")[0];
      check.checked = true;
   });
}

jQuery.fn.cssCheckboxUncheck = function(){
   jQuery(this).each(function(){
      var label = jQuery(this);
      label.removeClass("checked");
      var check = jQuery(":checkbox[@name='"+label.attr("for")+"']")[0];
      check.checked = false;
   });
}

jQuery.fn.cssCheckbox = function(){
   jQuery(":checkbox", this)

	   // Hide native checkboxes
	   .hide()

	   // Find related labels and add all the fancy stuff
	   .each(function(){

		   var check = this;
		   var jlabel = jQuery("label[@for='"+jQuery(check).attr("name")+"']");

		   // Initial state check
		   if (check.checked) {
			   jlabel.addClass("checked");
		   }

		   jlabel

			   // Label hover state
			   .hover(
				   function() { jQuery(this).addClass("over"); },
				   function() { jQuery(this).removeClass("over"); }
			   )

			   // Label click state
			   .click(function(){
				   jQuery(this).cssCheckboxToggle();
			   });
	   });
}