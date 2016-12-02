var socket = io.connect('http://192.168.1.60:3001'); 

var app = angular.module("miapp", []);
      
app.controller('PaperController', function($scope) {
    
$scope.x = 0;
$scope.y = 0;
$scope.posicion = []



//inicio variables fijas
$scope.cuadernos = [
{id:'1',nombre:'Lienzo1'},
{id:'2',nombre:'Lienzo2'},
{id:'3',nombre:'Lienzo3'},
{id:'4',nombre:'Lienzo4'}
];

$scope.hojas = [
{id:'1',nombre:'hoja1'},
{id:'2',nombre:'hoja1'},
{id:'3',nombre:'hoja1'},
{id:'4',nombre:'hoja1'}
];


$scope.colores = [
{id:'#dd1144',nombre:'color1'}
];
//fin variables fijas

	
//inicia metodo paper Escritura propia
	var path;
	var drag = false;
	
	var drag2 = false;

	$scope.mouseUp = function(){
		//Clear Mouse Drag Flag

		
		socket.emit('PosicionUp',{ id: $scope.posicion });
		$scope.posicion = [];
		drag = false;
		path.simplify(10);
	};
	$scope.mouseDrag = function(event){
		if(drag){

			
			path.add(new paper.Point(event.x, event.y));
			$scope.x = event.x;
			$scope.y = event.y;
		
			$scope.posicion.push({x:event.x, y: event.y})

			


			//socket.emit('PosicionArrastre',{ id: $scope.IdLinea, x: $scope.x, y: $scope.y});
			path.smooth();

		}
	};
	$scope.mouseDown = function(event){
		//Set  flag to detect mouse drag
		console.log($scope.Sesion);
		socket.emit('ObtenerIdLinea',{ sesion: $scope.Sesion, x: event.x, y: event.y });
		
			
		drag = true;
		path = new paper.Path();
		path.strokeColor = 'black';
		path.add(new paper.Point(event.x, event.y));
	};
	init();
	function init(){
		paper.install(window);
		paper.setup('canvas');			
	}
//fin metodo escritura propia

//inicio metodo cliente visualiza



	






socket.on('PosicionDown',function (data) {

// path1 = new paper.Path();
// path1.strokeColor = 'blue';
// path1.add(new paper.Point(data.x, data.y));

// drag2 = true;




});



socket.on('visualiza',function (data) {
//  if(drag2){ 

// path1.add(new paper.Point(data.x, data.y));
// path1.smooth();

// console.log('www' + data.hoja + 'www' + data.x + 'www' + data.y );
// }
//if(drag2){
//path1.add(new paper.Point(data.x, data.y));
//path1.smooth();
//}

});


socket.on('PosicionUp',function (data) {

//path1.simplify(11);
//drag2 = false;


console.log(data.id[0])




var path1;
path1 = new paper.Path();
path1.strokeColor = 'blue';

var a = data.id;

for (x=0;x<a.length;x++){
	path1.add(new paper.Point(a[x].x, a[x].y));

}


path1.smooth();
path1.simplify(10);


});



//fin metodo cliente visualiza



$scope.fncGuardaEspacio = function(datos1){

datos1.Usuariounico = $scope.keyUnique;
$scope.Sesion = datos1;
socket.emit('validarEspacio',{ sesion: datos1 });

}


socket.on('sesionactiva',function (data) {
    console.log('key' + data.key);
    $scope.keyUnique = data.key;
  });


socket.on('IdLinea',function (data) {
    $scope.IdLinea = data.id;
    console.log($scope.IdLinea);
  });

  
});
    
  
