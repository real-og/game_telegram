function startGame() {
    // Выполняем AJAX-запрос к серверу Python
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/start_game", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById("gameResult").innerHTML = response.message;
        }
    };
    xhr.send();
}