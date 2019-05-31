var map;
var geocoder;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];

function initialize() {	
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	
    var options = {
        zoom: 5,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

	map = new google.maps.Map(document.getElementById("mapa"), options);

}

initialize();

function abrirInfoBox(id, marker) {
	if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
		infoBox[idInfoBoxAberto].close();
	}

	infoBox[id].open(map, marker);
	idInfoBoxAberto = id;
}

function carregarPontos() {
	
	$.getJSON('js/pontos.json', function(pontos) {
		
		var latlngbounds = new google.maps.LatLngBounds();
		
		$.each(pontos, function(index, ponto) {
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(ponto.latitude, ponto.longitude),
				title: ponto.nome,
				icon: 'img/marcador.png'
			});
			
			var myOptions = {
				content: "<h1>" + ponto.nome + "</h1>"+ 
				"<div class='tabbed'>" +
				"<input type='radio' name='tabs' id='tab-nav-1' checked>" +
				"<label for='tab-nav-1'>Info</label>" +
				"<input type='radio' name='tabs' id='tab-nav-2'>" +
				"<label for='tab-nav-2'>Preços</label>" +
				"<div class='tabs'>" +
				"<div>" + "<p><b>Endereço: </b>" + ponto.logradouro + ", " + ponto.numero + ", " + ponto.bairro + ", " + ponto.cidade + " - " + ponto.estado + "</p>" + 
				"<p><b>Telefone: </b>" + ponto.telefone + "</p>" + "</div>" +
				"<div>" + 	"<table class='blueTable'>" +
						  	"<thead>" +
						  	"<tr>" +
						  	"<th>Produto</th>" +
						  	"<th>Valor</th>" +
						  	"<th>Atualização</th>" +
						  	"</tr>" +
						  	"</thead>" +
						  	"<tbody>" +
				  		  	"<tr>" +
						  	"<td>Gasolina</td>" +
						  	"<td>" + ponto.gasolina + "</td>" +
				  			"<td>" + ponto.atu_gasolina + "</td>" +
				 			"</tr>" +
							"<tr>" +
							"<td>Etanol</td>" +
							"<td>" + ponto.etanol + "</td>" +
							"<td>" + ponto.atu_etanol + "</td>" +
							"</tr>"+
							"<tr>"+
							"<td>Diesel</td>" +
						  	"<td>" + ponto.diesel + "</td>" +
				  			"<td>" + ponto.atu_diesel + "</td>" +
							"</tr>"+
							"<tr>"+
							"<td>Diesel S10</td>" +
						  	"<td>" + ponto.diesels10 + "</td>" +
				  			"<td>" + ponto.atu_diesels10 + "</td>" +
							"</tr>"+
							"</tbody>" + "</div>" +
							"</div>" +
							"</div>",


				pixelOffset: new google.maps.Size(-150, 0)
        	};

			infoBox[ponto.id_rede] = new InfoBox(myOptions);
			infoBox[ponto.id_rede].marker = marker;
			
			infoBox[ponto.id_rede].listener = google.maps.event.addListener(marker, 'click', function (e) {
				abrirInfoBox(ponto.id_rede, marker);
			});
			
			markers.push(marker);
			
			latlngbounds.extend(marker.position);
			
		});
		
		var markerCluster = new MarkerClusterer(map, markers,
		            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

		
		map.fitBounds(latlngbounds);
		
	});
	
}

carregarPontos();