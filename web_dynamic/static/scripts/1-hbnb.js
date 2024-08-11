$(document).ready(function() {
	let checkedAmenity = [];

	$('.amenities inpu[type="checkbox"]').change(function() {
		let amenityId = $(this).attr('data-id');
		let amenityName = $(this).attr('data-name');

		if ($(this).is(':checked')) {
			checkedAmenities.push(amenityName);
		} else {
			checkedAmenities = checkedAmenities.filter(name => name !== amenityName);
		}
		$('.amenities h4').text(checkedAmenities.join(','));

	});
});
