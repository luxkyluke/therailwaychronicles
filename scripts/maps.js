function getJSON(url){
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': url,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}

function initMap(_callback){
  if(document.getElementById('destinations_map') != undefined){

    var mapStyle = getJSON("scripts/json/map_style.json");

    var styledMap = new google.maps.StyledMapType(mapStyle,{name: "Styled Map"});

    var mapOptions = {
      zoom: 2,
      center: new google.maps.LatLng(33.574946, -25.914465),
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      //scaleControl: false,
      mapTypeControl : false, 
      streetViewControl: false,   
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };

    var points = getJSON('scripts/json/map_locations.json');

    if(points == null)
      return false;

    var map = new google.maps.Map(document.getElementById('destinations_map')
      , mapOptions);

    map.setOptions({styles: styledMap});

    var marker, pos;
    points.forEach(function(point) {
      pos = {lat:parseFloat(point.latitude), lng: parseFloat(point.longitude)};
      id = parseInt(point.id);
      
      marker = new google.maps.Marker({
          position: pos,
          map: map,
          id : id,  
          icon: 'img/logos/location_marker.png'
        }
      );
      google.maps.event.addListener(marker, 'click', function(){
          markerClickEvent(this.id);
      });

      google.maps.event.addListenerOnce(map, 'idle', function(){
          _callback();
      });

      $(window).on('resize', function() {
          var currCenter = map.getCenter();
          google.maps.event.trigger(map, 'resize');
          map.setCenter(currCenter);
      });
    });

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
  }
}
