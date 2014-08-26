
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

  FastClick.attach(document.body);


  /////////////
  //   MAP   //
  /////////////

  var mapZoom = 17, bigmap, places, mapArr = new Array();

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
        var temp = new ymaps.Map('map-' + i, { center: [places[i-1].latitude, places[i-1].longitude], zoom: mapZoom, controls: ['zoomControl', 'trafficControl', 'geolocationControl', 'searchControl', 'typeSelector'] });
        var tempPlacemark = new ymaps.Placemark(temp.getCenter(), {});
        temp.geoObjects.add(tempPlacemark);
        temp.behaviors.disable('scrollZoom');
        temp.container.fitToViewport();
        mapArr[i-1] = temp;
      }

      //////////////////
      //   MAP BTNS   //
      //////////////////

      $('.contacts__item__showmap').on('click', function(e) {
        e.preventDefault();
        //$(this).parent().find('.contacts__item__map').addClass('contacts__item__map--fullscreen');
        var id = parseInt($(this).parent().find('.contacts__item__map').attr('id').replace( /^\D+/g, ''));
        mapArr[id-1].container.enterFullscreen();
        $(this).parent().find('.contacts__item__hidemap').addClass('active');
      });

      $('.contacts__item__hidemap').on('click', function(e) {
        e.preventDefault();
        //$(this).parent().find('.contacts__item__map').removeClass('contacts__item__map--fullscreen');
        var id = parseInt($(this).parent().find('.contacts__item__map').attr('id').replace( /^\D+/g, ''));
        mapArr[id-1].container.exitFullscreen();
        $(this).removeClass('active');
      });

    }

    if ($('#bigmap').length > 0) {

      var geolocation = ymaps.geolocation;

      bigmap = new ymaps.Map('bigmap', { center: [43.125564, 131.879412], zoom: 13, controls: ['zoomControl', 'trafficControl', 'geolocationControl', 'searchControl', 'typeSelector'] });
      bigmap.behaviors.disable('scrollZoom');

      for (var i = 1; i <= places.length; ++i) {

        // var balloon = new ymaps.Balloon(bigmap, {
        //   closeButton: true,
        //   panelMaxMapArea: 0,
        //   autoPan: false,
        //   minHeight: 55
        // });
        // balloon.options.setParent(bigmap.options);
        // balloon.options.closeButton
        // balloon.open([places[i-1].latitude, places[i-1].longitude], places[i-1].desc + '<br><a href="/dest/contacts.html#map-' + i + '">Контакты</a>');

        var tempGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [places[i-1].latitude, places[i-1].longitude]
            },
            properties: {
                iconContent: places[i-1].desc,
                balloonContent: places[i-1].desc + '<br><a href="/dest/contacts.html#map-' + i + '">Контакты</a>'
                //hintContent: '<br><a href="/dest/contacts.html#map-' + i + '">Контакты</a>'
            }
        }, {
            preset: 'islands#darkBlueStretchyIcon',
            draggable: false
        });

        bigmap.geoObjects.add(tempGeoObject);

      }

      geolocation.get({
        provider: 'browser',
        mapStateAutoApply: false
      }).then(function (result) {
        bigmap.geoObjects.add(result.geoObjects);
      });

      $('.contacts__item__showBigmap').on('click', function(e) {
        e.preventDefault();
        // $('#bigmap').addClass('bigmap--fullscreen');
        bigmap.container.enterFullscreen();
        $('.contacts__item__hideBigmap').addClass('active');
      });

      $('.contacts__item__hideBigmap').on('click', function(e) {
        e.preventDefault();
        // $('#bigmap').removeClass('bigmap--fullscreen');
        bigmap.container.exitFullscreen();
        $(this).removeClass('active');
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


