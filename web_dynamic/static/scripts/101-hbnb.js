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
		$('.amenities h4').text(checkedAmenities.join(','));

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
	$("buton").click(function(){
		$.ajax({
			url: "http://0.0.0.0:5001/api/v1/places_search/",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify({ amenities: checkedAmenities }), 
			success: function(data) {
				$("section.places").empty();

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
							<div class="number_bathrooms">${place.number_bathrooms} Bathrom${place.number_bathrooms !== 1 ? 's' : ''}</div>
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

	});
	$('locations input[type="checkbox"]').change(function() {
		let checkedStates = [];
		let checkedCities = [];

		let id = $(this).attr("data-id");
		let name = $(this).attr("data-name");
		let isState = $(this).hasClass("state");
		let isCity = $(this).hasClass("city");

		if ($(this).is(":checked")) {
			if (isState) {
				selectedStates.push({ id: id, name: name });
			} else if (isCity) {
				selectedCity.push({ id: id, name: name });
			}
		} else {
			if (isState) {
				selectedStates = selectedStates.filter(item => item.id !== id);
			} else if (isCity) {
				selectedCities = selectedCities.filter(item => item.id != id);
			}
		}

		let selectedNames = [...selectedStates.map(item => item.name), ...selectedCities.map(item => item.name)];
		$('.locations h4').text(selectedNames.join(', '));

	});
	$('button').click(function() {
		let postData = {
			amenities: selectedAmenities,
			states: selectedStates.map(item => item.id),
			cities: selectedCities.map(item => item.id)
		};

		$Send POST request to place_seach with the selected filters
		$.ajax({
			url: "http://0.0.0.0:5001/api/v1/places_search/",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(postData),
			success: function(data) {
				$('section.places').empty();
				data.forEach(function(place) {
					let article = `
					<article>
						<div class="title">
							<h2>${place.name}</h2>
							<div class="price_by_night">$${place.price_by_night}</div>
						</div>
						<div class="information">
							<div class="max_guest">
								${place.max_guest} Guests
							</div>
							<div class="number_rooms">
								${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : '' }
							</div>
							<div class="number_bathrooms">
								${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : '' %}
							</div>
							<div class="description">
								${place.description}
							</div>
						</div>
					</article>`;
					$('section.places').append(article);
				});
			}
		});
	});
});
