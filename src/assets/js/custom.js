export function initializeWedos() {
	if (jQuery('#otp').length > 0)
		$('.digit-group').find('input').each(function () {
			$(this).attr('maxlength', 1);
			$(this).on('keyup', function (e) {
				var thisVal = $(this).val();
				var parent = $($(this).parent());

				if (e.keyCode === 8 || e.keyCode === 37) {
					var prev = parent.find('input#' + $(this).data('previous'));

					if (prev.length) {
						$(prev).select();
					}
				} else {
					var next = parent.find('input#' + $(this).data('next'));

					if (!$.isNumeric(thisVal)) {
						$(this).val('');
						return false;
					}

					if (next.length) {
						$(next).select();
					} else {
						if (parent.data('autosubmit')) {
							parent.submit();
						}
					}
				}
			});
		});

}