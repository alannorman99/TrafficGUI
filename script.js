// Map options
function initMap() {
	var options = {
		zoom:13,
		center:{lat:27.6648, lng:-81.5158}
	}
	// New map
	var map = new google.maps.Map(document.getElementById('map'), options);
	addMarker({coords:{lat:26.6406, lng:-81.8723}, content:'<h1>Fort Myers</h1>'}); //FM
	addMarker({coords:{lat:26.4381, lng:-81.8068}, content:'<h1>Estero</h1>'}); //Estero
	addMarker({coords:{lat:26.4637, lng:-81.7753}, content:'<h1>FGCU</h1>'}); //FGCU

	// Add Marker function
	function addMarker(props){
	var marker = new google.maps.Marker({
	position:props.coords,
	map:map
	});
	// Check content
	if (props.content){
		var infoWindow = new google.maps.InfoWindow({
		content:props.content
	});
	marker.addListener('click', function(){
		infoWindow.open(map, marker);
	});
	}
   }
}
