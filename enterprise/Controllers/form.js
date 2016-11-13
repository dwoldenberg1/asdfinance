/** Angular Code **/

angular.module('userForm', [])
    .controller('dataController', ['$scope', function($scope) {
      $scope.master = {};
      
      var socket = io.connect('http://localhost:5000');
      socket.emit('nextday');
      socket.on('parsedmint', function (data) {
        $scope.category = data;
        $scope.totalSpentToday = data.f + data.e + data.n;
         
        $scope.food = Math.round((data.n/$scope.totalSpentToday)*100);         
        $scope.entertainment = Math.round((data.n/$scope.totalSpentToday)*100);      
        $scope.necessities = Math.round((data.n/$scope.totalSpentToday)*100);        
         
        console.log($scope.food);
        console.log($scope.entertainment);
        console.log($scope.necessities);
        console.log($scope.totalSpentToday);
        console.log(data);

        var ctxPie1 = document.getElementById("actualPie");
            var actualPie = new Chart(ctxPie1, {
                type: 'pie',
                data: {

                    labels: ["Food (%)", "Necessities (%)", "Entertainment (%)"],

                    datasets: [{
                        data: [30, 60, 10],
                    backgroundColor: [
                        "#c02dff",
                        "#f97b36",
                        "#368bf9"
                    ],
                    hoverBackgroundColor: [
                        "#c02dff",
                        "#f97b36",
                        "#368bf9"
                    ]}]
                }
            });

        var ctxPie2 = document.getElementById("idealPie");
            var idealPie = new Chart(ctxPie2, {
                type: 'pie',
                data: {

                    labels: ["Food (%)", "Necessities (%)", "Entertainment (%)"],

                    datasets: [{
                        data: [$scope.food, $scope.necessities, $scope.entertainment],
                    backgroundColor: [
                        "#a8db11",
                        "#db4011",
                        "#11dbac"
                    ],
                    hoverBackgroundColor: [
                        "#a8db11",
                        "#db4011",
                        "#11dbac"
                    ]}]
                }
            });

        var ctxRadar = document.getElementById("compRadar");
            var compRadar = new Chart(ctxRadar, {
                type: 'radar',
                data : {
                    labels: ["Food", "Necessities", "Entertainment"],
                    datasets: [
                        {
                            label: "Ideal Percentage (%)",
                            backgroundColor: "rgba(16, 204, 78,0.2)",
                            borderColor: "rgba(16, 204, 78,1)",
                            pointBackgroundColor: "rgba(16, 204, 788,1)",
                            pointBorderColor: "#fff",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(16, 204, 78,1)",
                            data: [30, 60, 10]
                        },
                        {
                            label: "Actual Percentage (%)",
                            backgroundColor: "rgba(219, 19, 19,0.2)",
                            borderColor: "rgba(219, 19, 19,1)",
                            pointBackgroundColor: "rgba(219, 19, 19,1)",
                            pointBorderColor: "#fff",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(219, 19, 19,1)",
                            data: [$scope.food, $scope.necessities, $scope.entertainment]
                        }
                    ]
                },
                options: {
                    scale: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            });
    });
      
      $scope.update = function(user) {
        $scope.master = angular.copy(user);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
    }]);

$( "#idealGraph" ).click(
  function() {
    $( this ).css("background-color", "rgb(196, 196, 196)");
    $("#actualGraph").css("background-color", "rgb(255, 255, 255)");
    $("#compGraph").css("background-color", "rgb(255, 255, 255)");

    var socket = io.connect('http://localhost:5000');
    if ($('#idealAdvanced').is(":checked")){
        socket.emit('mode', 1);
    } else {
        socket.emit('mode', 1);
    }
  });

/*** Ideal Graph ***/

$( "#idealGraph" ).click(
  function() {
    $( this ).css("background-color", "rgb(196, 196, 196)");
    $("#actualGraph").css("background-color", "rgb(255, 255, 255)");
    $("#compGraph").css("background-color", "rgb(255, 255, 255)");

    var socket = io.connect('http://localhost:5000');
    if ($('#idealAdvanced').is(":checked")){
        socket.emit('mode', 1);
    } else {
        socket.emit('mode', 3);
    }
  });

$('#idealAdvanced').change(function(){
  var socket = io.connect('http://localhost:5000');  
  if($(this).is(':checked') && $("#idealGraph").css(background-color) == "rgb(255, 255, 255)"){
    socket.emit('mode', 1);
  }
});

/*** Actual Graph ***/

$( "#actualGraph" ).click(
  function() {
    $( this ).css("background-color", "rgb(196, 196, 196)");
    $("#idealGraph").css("background-color", "rgb(255, 255, 255)");
    $("#compGraph").css("background-color", "rgb(255, 255, 255)");

    var socket = io.connect('http://localhost:5000');
    if ($('#actualAdvanced').is(":checked")){
        socket.emit('mode', 0);
    } else {
        socket.emit('mode', 3);
    }
  });

$('#actualAdvanced').change(function(){
  var socket = io.connect('http://localhost:5000');  
  if($(this).is(':checked') && $("#actualGraph").css(background-color) == "rgb(255, 255, 255)"){
    socket.emit('mode', 0);
  }
});

/*** Comparison Graph ***/

$( "#compGraph" ).click(
  function() {
    $( this ).css("background-color", "rgb(196, 196, 196)");
    $("#idealGraph").css("background-color", "rgb(255, 255, 255)");
    $("#actualGraph").css("background-color", "rgb(255, 255, 255)");

    var socket = io.connect('http://localhost:5000');
    if ($('#compAdvanced').is(":checked")){
        socket.emit('mode', 5);
    } else {
        socket.emit('mode', 2);
    }
  });

$('#compAdvanced').change(function(){
  var socket = io.connect('http://localhost:5000');  
  if($(this).is(':checked') && $("#compGraph").css(background-color) == "rgb(255, 255, 255)"){
    socket.emit('mode', 5);
  }
});

/*** Ideal Graph ***/

$( "#idealGraph" ).click(
  function() {
    $( this ).css("background-color", "rgb(196, 196, 196)");
    $("#actualGraph").css("background-color", "rgb(255, 255, 255)");
    $("#compGraph").css("background-color", "rgb(255, 255, 255)");

    var socket = io.connect('http://localhost:5000');
    if ($('#idealAdvanced').is(":checked")){
        socket.emit('mode', 1);
    } else {
        socket.emit('mode', 3);
    }
  });

$('#idealAdvanced').change(function(){
  var socket = io.connect('http://localhost:5000');  
  if($(this).is(':checked') && $("#idealGraph").css(background-color) == "rgb(255, 255, 255)"){
    socket.emit('mode', 1);
  }
});

/*** Actual Graph ***/

$( "#actualGraph" ).click(
  function() {
    $( this ).css("background-color", "rgb(196, 196, 196)");
    $("#idealGraph").css("background-color", "rgb(255, 255, 255)");
    $("#compGraph").css("background-color", "rgb(255, 255, 255)");

    var socket = io.connect('http://localhost:5000');
    if ($('#actualAdvanced').is(":checked")){
        socket.emit('mode', 0);
    } else {
        socket.emit('mode', 3);
    }
  });

$('#actualAdvanced').change(function(){
  var socket = io.connect('http://localhost:5000');  
  if($(this).is(':checked') && $("#actualGraph").css(background-color) == "rgb(255, 255, 255)"){
    socket.emit('mode', 0);
  }
});

/*** Comparison Graph ***/

$( "#compGraph" ).click(
  function() {
    $( this ).css("background-color", "rgb(196, 196, 196)");
    $("#idealGraph").css("background-color", "rgb(255, 255, 255)");
    $("#actualGraph").css("background-color", "rgb(255, 255, 255)");

    var socket = io.connect('http://localhost:5000');
    if ($('#compAdvanced').is(":checked")){
        socket.emit('mode', 5);
    } else {
        socket.emit('mode', 2);
    }
  });

$('#compAdvanced').change(function(){
  var socket = io.connect('http://localhost:5000');  
  if($(this).is(':checked') && $("#compGraph").css(background-color) == "rgb(255, 255, 255)"){
    socket.emit('mode', 5);
  }
});