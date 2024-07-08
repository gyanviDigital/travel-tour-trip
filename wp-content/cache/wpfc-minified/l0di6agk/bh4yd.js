// source --> https://tourtripx.com/wp-content/plugins/ultrax/assets/seb-front.js?ver=6.5.4 
(function($){
	"use strict";

	const seb_validate_email = (email, target) => {
		let target_name = target.attr('name');
		$.get(`${seb_main.ajaxUrl}?action=ultrax_validate_email&email=${email}`, function(res){
			if( res.success == false ){
				if( $(`.${target_name}_error`).length > 0 ){
					$(`.${target_name}_error`).text(`${res.data.msg}`);
				}else{
					target.after(`<br/><small class="${target_name}_error" style="color:#dc3232;">${res.data.msg}</small>`);
				}
				target.parents('form').find('[type=submit]').attr('disabled', true);
			}else{
				$(`.${target_name}_error`).remove();
				target.parents('form').find('[type=submit]').attr('disabled', false);
			}

		});
	}

	const seb_validate_text = (data, target) => {
		let target_name = target.attr('name');
		$.get(`${seb_main.ajaxUrl}?action=ultrax_validate_text&data=${data}`, function(res){
			if( res.success == false ){
				if( $(`.${target_name}_error`).length > 0 ){
					$(`.${target_name}_error`).text(`${res.data.msg}`);
				}else{
					target.after(`<br/><small class="${target_name}_error" style="color:#dc3232;">${res.data.msg}</small>`);
				}
				target.parents('form').find('[type=submit]').attr('disabled', true);
			}else{
				$(`.${target_name}_error`).remove();
				target.parents('form').find('[type=submit]').attr('disabled', false);
			}
		});
	}

	$(document).ready(function(){
		var seb_timer;
		$('body').on('input', 'input[type=email]', function(e){
			clearTimeout(seb_timer);
			let _this = $(this);
			let email = _this.val();
			seb_timer = setTimeout( function(){
				seb_validate_email(email, _this);
			}, 1000);
		} );

		var seb_timer1;
		$('body').on('input', 'input[type=text], textarea', function(e){
			clearTimeout(seb_timer1);
			let _this = $(this);
			let data = _this.val();
			seb_timer1 = setTimeout(function(){
				seb_validate_text(data, _this);
			}, 1000);
		});
	});
})(jQuery);