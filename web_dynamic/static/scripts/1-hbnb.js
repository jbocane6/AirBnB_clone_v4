$(document).ready(function () {
  const check_amenities = [];
  $("input:checkbox").change(function () {
    if ($(this).is(":checked")) {
      check_amenities.push($(this).parent().attr("data-name"));
    } else {
      const index = check_amenities.indexOf($(this).attr("data-name"));
      if (index > -1) {
        check_amenities.splice(index, 1);
      }
    }
    $(".amenities h4").text(check_amenities.join(", "));
  });
});
