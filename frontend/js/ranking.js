const $levels = { "easy": 3, "medium": 5, "hard": 7 }

$(document).ready(function () {
    $("#btnShow").click(function () {
        $dificultade = getLevel();
        loadTable($dificultade);
    });

    $("#btnBack").click(function () {
        if (confirm("Deseja voltar para a tela do jogo?"))
            window.open("game.html", "_self")
    });
})

function getLevel() {
    return $level = $levels[$("#level").val()];
}

function loadTable($lvl) {
    $rank = $.getJSON("http://localhost:8080/rank", function ($value) {
        $data = $value.filter(value => value.level == getLevel());
        if (getLevel() == 3)
            $textLevel = "Fácil"
        else if (getLevel() == 5)
            $textLevel = "Médio"
        else $textLevel = "Difícil"
        $("#tabela").html("");
        for (var i = 0; i < $data.length; i++) {
            $("#tabela").append(`
            <tr>
                <td>${i + 1}</td>
                <td>${$data[i].user.user}</td>
                <td>${$textLevel}</td>
                <td>${$data[i].score}</td>
            </tr>`)
        }
    });

}