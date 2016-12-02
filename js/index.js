var socket = io.connect('http://192.168.1.60:3001'); 

var app = angular.module('myApp', []);
      
app.controller('myCtrl', function($scope) {
    


$scope.fncGuardaEspacio = function(strEspacio){

socket.emit('validarEspacio',{ name: parseInt(strEspacio) });

}


socket.on('Autorizacion',function (data) {
    alert(data.msg)
  });

socket.on('sesionactiva',function (data) {
    console.log('key' + data.key)
  });



  
});
    
  
