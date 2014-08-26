
///////////////////////
//   CAROUSEL INIT   //
///////////////////////

var carouselScroll;

function loaded () {
  if ($('#carousel').length > 0) {
    carouselScroll = new IScroll('#carousel', {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: true,
      snapSpeed: 500,
      keyBindings: true,
      eventPassthrough: true,
      preventDefault: false
    });
  }
}

$(function(){


  /////////////
  //   MAP   //
  /////////////

  var mapZoom = 17, bigmap, places;

  places = [
    { latitude: 43.11312, longitude: 131.880733, desc: 'ул. Алеутская, 11' },
    { latitude: 43.113456, longitude: 131.918408, desc: 'ул. Светланская, 147' },
    { latitude: 43.093801, longitude: 131.896426, desc: 'ул. Калинина, 230' },
    { latitude: 43.127019, longitude: 131.90037, desc: 'Партизанский пр-т, 36' },
    { latitude: 43.151037, longitude: 131.909613, desc: 'пр-т. 100 лет Владивостоку, 40а' },
    { latitude: 43.12817, longitude: 131.887084, desc: 'ул. Авроровская, 20' },
    { latitude: 43.125564, longitude: 131.879412, desc: 'ул. Западная, 29' }
  ];

  ymaps.ready(function () {

    if ($('.contacts__item__map').length > 0) {

      for (var i = 1; i <= places.length; ++i) {
        var temp = new ymaps.Map('map-' + i, { center: [places[i-1].latitude, places[i-1].longitude], zoom: mapZoom });
        var tempPlacemark = new ymaps.Placemark(temp.getCenter(), {});
        temp.geoObjects.add(tempPlacemark);
        temp.behaviors.disable('scrollZoom');
      }

    }

    if ($('#bigmap').length > 0) {

      var geolocation = ymaps.geolocation;

      bigmap = new ymaps.Map('bigmap', { center: [43.125564, 131.879412], zoom: 13 });
      bigmap.behaviors.disable('scrollZoom');

      for (var i = 1; i <= places.length; ++i) {
        var balloon = new ymaps.Balloon(bigmap, {
          closeButton: true
        });
        balloon.options.setParent(bigmap.options);
        balloon.options.closeButton
        balloon.open([places[i-1].latitude, places[i-1].longitude], places[i-1].desc + '<br><a href="/dest/contacts.html#map-' + i + '">Контакты</a>');
      }

      geolocation.get({
        provider: 'browser',
        mapStateAutoApply: false
      }).then(function (result) {
        bigmap.geoObjects.add(result.geoObjects);
      });

    }

  });

  ////////////////
  //   SCROLL   //
  ////////////////

  $(window).load(function(){
    if ($('.teachers__container').length > 0) {
      $(".teachers__container").mCustomScrollbar({
        axis:"y"
      });
    }
  });

  /////////////////
  //  NAV        //
  /////////////////

  var $menu = $('#menu'),
      $menulink = $('.navbar__menulink');

  $menulink.on('click', function(e) {
    e.preventDefault();
    $menulink.toggleClass('active');
    $menu.toggleClass('active');
    return false;
  });

  $('#menu .dropdown > a').on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
    return false;
  });

  /////////////////
  //  CAROUSEL   //
  /////////////////

  var time = 1000;
  var items = $('#carousel .carousel__item').length;
  var width = items * 100 + '%';
  var itemWidth = 100 / items + '%';
  $('#carousel .carousel__scroller').css('width', width);
  $('#carousel .carousel__item').css('width', itemWidth);

  $('#carousel .carousel__nav--left').on('click', function(e) {
    e.preventDefault();
    if (carouselScroll.currentPage.pageX == 0)
      carouselScroll.goToPage(carouselScroll.pages.length - 1, 0, time)
    else
      carouselScroll.prev(time);
  });

  $('#carousel .carousel__nav--right').on('click', function(e) {
    e.preventDefault();
    if (carouselScroll.currentPage.pageX == (carouselScroll.pages.length - 1))
      carouselScroll.goToPage(0, 0, time)
    else
      carouselScroll.next(time);
  });

});


