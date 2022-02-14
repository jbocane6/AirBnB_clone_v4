$(document).ready(function () {
  const url = "http://0.0.0.0:5001/api/v1/";
  const check_amenities = [];
  $("input:checkbox").change(function () {
    if ($(this).is(":checked")) {
      check_amenities.push($(this).parent().attr("data-name"));
    } else {
      const index = check_amenities.indexOf($(this).parent().attr("data-name"));
      if (index > -1) {
        check_amenities.splice(index, 1);
      }
    }
    $(".amenities h4").text(check_amenities.join(", "));
  });

  $.get(url + "status/", (data, status) => {
    if (status === "success" && data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  const search = (json_dict = {}) => {
    $.ajax({
      url: url + "places_search/",
      type: "POST",
      data: JSON.stringify(json_dict),
      contentType: "application/json ",
      success: (places) => {
        $("section.places").empty();
        for (const place of places) {
          $("section.places").append(`\
            <article>\
              <div class="title_box">\
                <h2>${place.name}</h2>\
                <div class="price_by_night">$${place.price_by_night}</div>\
              </div>\
              <div class="information">\
                <div class="max_guest">
                  ${place.max_guest} Guest${place.max_guest !== 1 ? "s" : ""}\
                </div>\
                <div class="number_rooms">
                  ${place.number_rooms} Bedroom${
            place.number_rooms !== 1 ? "s" : ""
          }\
                </div>\
                <div class="number_bathrooms">
                  ${place.number_bathrooms} Bathroom${
            place.number_bathrooms !== 1 ? "s" : ""
          }\
                </div>\
              </div>\
              <div class="description">${place.description}</div>\
            </article>\
          `);
        }
      },
    });
  };

  $("#search").click(() => {
    const checked_opts = {
      amenities: Object.keys(check_amenities),
    };
    search(checked_opts);
  });

  search();
});
