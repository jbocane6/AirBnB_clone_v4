$(document).ready(function () {
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

  const url = "http://0.0.0.0:5001/api/v1/status/";
  $.get(url, (status) => {
    if (status === "OK") {
      $("#api_status").addClass("available");
    }
    else {
      $("#api_status").removeClass("available");
    }
  });
});
