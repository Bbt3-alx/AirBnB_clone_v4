$(document).ready(function() {
	let checkedAmenities = [];

	$('.amenities input[type="checkbox"]').change(function() {
		let amenityId = $(this).attr('data-id');
		let amenityName = $(this).attr('data-name');

		if ($(this).is(':checked')) {
			checkedAmenities.push(amenityName);
		} else {
			checkedAmenities = checkedAmenities.filter(name => name !== amenityName);
		}
		$('.amenitys h4').text(checkedAmenities.join(','));

	});
	
	$.ajax({
		url: "http://0.0.0.0:5001/api/v1/status/",
		method: "GET",
		success: function() {
			$("div#api_status").addClass("available");
		},
		error: function() {
			$("div#api_status").removeClass("available");
		}
	});
});
