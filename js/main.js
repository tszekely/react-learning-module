$(document).ready(function () {
  var $nav = $('#navigation');

  $('title').length && $nav.find('li:contains("' + $('title').text() + '")').addClass('active');

  $nav.affix({
    offset: {
      top: $('.jumbotron')[0].offsetHeight
    }
  });

  $nav.on('affix.bs.affix', function () {
    if (window.innerWidth < 768) {
      return false;
    }

    $nav.css({
      width: $nav.parent().width(),
      maxHeight: window.innerHeight - 15 - $('footer')[0].offsetHeight
    });
  });

  $nav.on('affixed-top.bs.affix', function () {
    if (window.innerWidth < 768) {
      return false;
    }

    $nav.css({
      width: "",
      maxHeight: ""
    });
  });
});