
var carouselAuto = true, carouselInterval = 4000;

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

  ////////////////////
  //   MDOAL INIT   //
  ////////////////////

  $('.modal-open').magnificPopup({
    type: 'inline'
  });

  ////////////////////////
  //   FASTCLICK INIT   //

  ////////////////////////
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

  if (carouselAuto) {
    setInterval(function(){
      $('#carousel .carousel__nav--right').click();
    }, carouselInterval);
  }

});


//////////////
//   CALC   //
//////////////

var theoryA =    {price: 6120, title: 'Теория А'},
    theoryB1 =   {price: 11050, title: 'Теория (обучение на 1 категорию)'},
    theoryB2 =   {price: 11650, title: 'Теория (обучение на 2+ категории)'},
    theoryBB1 =  {price: 11350, title: 'Теория (обучение на 1 категорию)'},
    theoryBB2 =  {price: 12150, title: 'Теория (обучение на 2+ категории)'},
    practAM =    {price: 15300, title: 'Категория А (МКПП)', hours: 18},
    practBM =    {price: 35560, title: 'Категория B (МКПП)', hours: 56},
    practBA =    {price: 34280, title: 'Категория B (АКПП)', hours: 54},
    practC =     {price: 35550, title: 'Категория C (МКПП) переподготовка', hours: 38},
    addPrices =  {docs: 2150, car: {a: 400, b: 1000, c: 1300}, med: 1900};

var tempOption, carPriceFinal;

function calculate() {

  var sum = 0;

  var place = $('#select-place').val();

  var placeName = $('#select-place option:selected').html();
  var typeName = $('#select-type option:selected').html();
  var schemeName = $('#select-scheme option:selected').html();
  var catName = $('#select-cat option:selected').html();

  var type = $('#select-type').val();
  if (type === null || type == 0) {
    $('.result .result-1').html('<i class="fa fa-minus-circle"></i> Выберите форму обучения');
    return false;
  }

  var cat = $('#select-cat').val();
  if (cat === null || cat == 0) {
    $('.result .result-1').html('<i class="fa fa-minus-circle"></i> Выберите категорию');
    return false;
  }

  var scheme = $('#select-scheme').val();
  if (scheme === null || scheme == 0) {
    $('.result .result-1').html('<i class="fa fa-minus-circle"></i> Выберите программу обучения');
    return false;
  }

  var fullPrice = calcTheory(type, cat) + calcPractice(scheme, cat);

  $('.result .result-1').html( '<strong>Стоимость обучения:</strong> ' + fullPrice + ' рублей.' + '<br>' +
                     '<strong>Место обучения:</strong> ' + placeName + '<br>' +
                     '<strong>Категория:</strong> ' + catName );

  $('.result .result-2').html( '<strong>Форма обучения:</strong> ' + typeName + '<br>' +
                     '<strong>Программа обучения:</strong> ' + schemeName );

  $('.calc__additional').show();

  if ( $('#check-docs').prop('checked') )
    fullPrice += addPrices.docs;
  if ( $('#check-med').prop('checked') )
    fullPrice += addPrices.med;
  if ( $('#check-car').prop('checked') )
    fullPrice += carPriceFinal;

  $('.calc__total').show();

  $('.calc__total h2').html( 'Итого ' + fullPrice + ' руб.' );

}

function calcTheory(type, cat) { // Расчет теории
  switch (cat) {
    case '1':
      return theoryA.price;
    case '2':
    case '3':
      if (type == '2')
        return theoryB1.price;
      if (type == '1')
        return theoryB2.price;
    case '4':
    case '5':
    case '6':
    case '7':
      if (type == '2')
        return theoryBB2.price;
      if (type == '1')
        return theoryBB1.price;
  }
}

function calcPractice(trans, cat) {
  switch (cat) {
    case '1':
      carPriceFinal = addPrices.car.a;
      return practAM.price;
    case '2':
      carPriceFinal = addPrices.car.b;
      if (trans == '1')
        return practBM.price;
      if (trans == '2')
        return practBA.price;
    case '3':
      carPriceFinal = addPrices.car.c;
      return practC.price;
    case '4':
      carPriceFinal = addPrices.car.a + addPrices.car.b;
      if (trans == '1')
        return practAM.price + practBM.price;
      if (trans == '2')
        return practBA.price + practAM.price;
    case '5':
      carPriceFinal = addPrices.car.a + addPrices.car.c;
      return practAM.price + practC.price;
    case '6':
      carPriceFinal = addPrices.car.b + addPrices.car.c;
      if (trans == '1')
        return practBM.price + practC.price;
      if (trans == '2')
        return practBA.price + practC.price;
    case '7':
      carPriceFinal = addPrices.car.a + addPrices.car.b + addPrices.car.c;
      if (trans == '1')
        return practAM.price + practBM.price + practC.price;
      if (trans == '2')
        return practBA.price + practC.price + practAM.price;
  }
}

function setType(type) {
  if (type == 1) { // МКПП
    //$('#select-scheme option.akpp').attr('disabled', 'disabled');
    if (tempOption === undefined)
      tempOption = $('#select-scheme option.akpp');
    $('#select-scheme option.akpp').remove();
  }
  if (type == 2) { // АКПП
    //$('#select-scheme option.akpp').removeAttr('disabled');
    $('#select-scheme').append( tempOption );
  }
}

$('.calc select').on( "change", function(){
  setType(1);
  switch ( $('#select-cat').val() ) {
    case '1':
    case '3':
    case '5':
      setType(1);
      break;
    case '2':
    case '4':
    case '6':
    case '7':
      setType(2);
      break;
  }
  calculate();
});

$('.calc__additional input').on( "change", function(){
  calculate();
});

$(function(){
 calculate();
});
