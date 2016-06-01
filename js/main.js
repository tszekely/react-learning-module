$(document).ready(function () {
  var $nav = $('#navigation');

  $nav.affix({
    offset: {
      top: $('.jumbotron')[0].offsetHeight
    }
  });

  $nav.on('affix.bs.affix', function () {
    $nav.css({
      width: $nav.parent().width()
    });
  });
});