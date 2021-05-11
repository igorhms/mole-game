const $levels = { "easy": 3, "medium": 5, "hard": 7 }
const $imgWidth = 100; // Largura da toupeira
const $imgHeight = 80; // Altura da toupeira
const $imgsTheme = { "default": "buraco.gif", "active": "toupeira.gif", "dead": "morreu.gif" };
const $initialTime = "10";
var $timeGame = $initialTime; // Tempo de jogabilidade independente da fase
var $idChronoGame; // Irá controlar o setInterval do cronômetro
var $idChronoStartGame; // Irá controlar o setInterval do jogo (starGame)
var $activeUserId = localStorage.getItem("index");

$(document).ready(function () {
    fillBoard();
    $("#chrono").text($initialTime);
    $("#btnPlay").click(function () {
        btnControl();
        $idChronoStartGame = setInterval(startGame, 1180);
        $idChronoGame = setInterval(startChronoGame, 1000);
    })
    $("#btnPause").click(function () {
        clearTimeout($idChronoGame);
        clearTimeout($idChronoStartGame);
        $("#btnPlay").prop("disabled", false);
    });
    $("#btnStop").click(function () {
        clearInterval($idChronoGame);
        clearInterval($idChronoStartGame);
        endGame();
    });
    $("#btnExit").click(function () {
        if (confirm("Deseja mesmo sair? "))
            window.open("login.html", "_self")
    });

    $("#btnPlacar").click(function () {
        window.open("ranking.html", "_self");
    });

});

function startChronoGame() {
    let $secondsFormat = (--$timeGame).toLocaleString("pt-br", { minimumIntegerDigits: 2 });
    ($timeGame >= 0) ? $("#chrono").text($secondsFormat) : endGame();
    //($timeGame > 0)?$("#chrono").text(--$timeGame):clearInterval($idChronoGame); Solução Simples
}

function endGame() { 
    clearInterval($idChronoGame);
    clearInterval($idChronoStartGame);
    //alert(`Fim de jogo! Sua pontuação foi ${($("#score").text())}`);
    alertWifi(`Fim de jogo! Sua pontuação foi ${($("#score").text())}.`, false, 0, `img/${$imgsTheme.default}`, "50");
    fillBoard();  
    $timeGame = $initialTime;
    $("#chrono").text($initialTime);
    $("#btnPause").prop("disabled", true);
    $("#btnStop").prop("disabled", true);
    $("#btnPlay").prop("disabled", false);
    recScore();
    $("#score").text("0");
}

function recScore(){
    let $data = { "level": getLevel(), "score": parseInt($("#score").text()), "user": {"id":$activeUserId}};
    let $urlCadastro = "http://localhost:8080/rank";
    axios.post($urlCadastro, $data);
}

function btnControl() {
    $("#btnPause").prop("disabled", false);
    $("#btnStop").prop("disabled", false);
    $("#btnPlay").prop("disabled", true);
}

// Cria o tabuleiro do jogo conforme o nível de dificuldade
function fillBoard() {
    $level = $levels[$("#level").val()];
    $boardWidth = $imgWidth * $level;
    $boardHeight = $imgHeight * $level;
    $("#board").css({ "width": $boardWidth, "height": $boardHeight });
    placeHolesBoard($level);
}

// Insere os buracos das toupeiras no tabuleiro
function placeHolesBoard($level) {
    $("#board").empty();
    // cria uma div com uma imagem dentro do #board
    for ($i = 0; $i < Math.pow($level, 2); $i++) {
        $div = $("<div></div>");
        $img = $("<img>").attr({ "src": `img/${$imgsTheme.default}`, "id": `mole_${$i + 1}` });
        $($img).click(function () { updateScore(this) });
        $($div).append($img);
        $("#board").append($div);
    }
}

function updateScore($img) {
    if ($($img).attr("src").search($imgsTheme.active) != -1) {
        /* $pontuacao = $("#score").html();
        $pontuacao++;
        $("#score").html($pontuacao); */
        $("#score").text(parseInt($("#score").text()) + 1);
        $($img).attr("src", `img/${$imgsTheme.dead}`)
    }
}

// função de iniciar o jogo
function startGame() {
    fillBoard(); // melhorar: trocar apenas a toupeira do tabuleiro pelo buraco ao invés de limpar todo o tabuleiro
    $level = getLevel();
    $randNumber = getRandNumber(1, Math.pow($level, 2));
    // pega uma imagem no com id gerado aleatoriamente e substitui pela toupeira
    $(`#mole_${$randNumber}`).attr("src", `img/${$imgsTheme.active}`);
}

// Gera um numero aleatorio entre "min" e "max"
function getRandNumber(min, max) {
    return Math.round((Math.random() * Math.abs(max - min)) + min);
}

// Retorna o número correspondente ao nível de dificuldade selecionado pelo usuário
function getLevel() {
    return $level = $levels[$("#level").val()];
}

