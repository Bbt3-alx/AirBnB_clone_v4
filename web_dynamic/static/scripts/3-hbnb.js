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
	$.ajax({
		url: "http://0.0.0.0:5001/api/v1/places_search/",
		method: "POST",
		headers: {
			"Content-Type: application/json"
		},
		data: JSON.stringify({}),
		success: function(data) {
			data.forEach(function(place) {
				let article = `
				<article>
					<div class="title_box">
						<h2>${place.name}</h2>
						<div class="price_by_night">$${place.price_by_night}</div>
					</div>
					<div class="information">
						<div class="max_guest">${place.max_guest} Guests</div>
						<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
						<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
					</div>

					<div class="user">
						<b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
					</div>
					<div class="description">
						${place.description}
					</div>
				</article>`;

				$("section.places").append(article);
			});
		}

});
