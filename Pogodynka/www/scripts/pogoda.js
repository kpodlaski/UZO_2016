var OWAppKey = "64c7b98c91f425ed4bd193334c0bd9d6";


function pogodaKodPocztowy() {
    var kodPocztowy = $('#kodPocztowy-input').val();
    $('#pobierz-pogode-btn').click(pogodaKodPocztowy);
    var adres =
      'http://api.openweathermap.org/data/2.5/weather?zip='
      + kodPocztowy + ',pl&appid=' + OWAppKey + '&units=metric';
    console.log('adres ' + adres);
    $.getJSON(adres, function (results) {

        pokazPogode(results);

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Problem przy pobieraniu danych :( " + jqXHR.statusText);
    });

    return false;
}

function pokazPogode(results) {
    var iconURL = 'http://openweathermap.org/img/w/';
    if (results.weather.length) {

        $('#error-msg').hide();
        $('#pogoda-data').show();

        $('#nazwa').text(results.name);
        $('#temperatura').text(results.main.temp);
        $('#cisnienie').text(results.main.pressure);
        $('#wiatr').text(results.wind.speed);
        $('#wilgotnosc').text(results.main.humidity);
        $("#pogoda-icon").attr("src", iconURL + results.weather[0].icon + '.png');
        console.log(iconURL + results.weather[0].icon + '.png');
        //$('#pogoda-icon').src = iconURL + results.weather[0].icon + '.png';
        var sunriseDate = new Date(results.sys.sunrise * 1000);
        $('#wschod').text(sunriseDate.toLocaleTimeString());

        var sunsetDate = new Date(results.sys.sunset * 1000);
        $('#zachod').text(sunsetDate.toLocaleTimeString());

    } else {
        $('#pogoda-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Błąd w pozyskiwanu danych. ");
    }
}