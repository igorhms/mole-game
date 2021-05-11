// ----------------------------------------------------------------------------------------
// Biblioteca: jAlertWifi.js
// Criado por Wilton de Paula Filho
// Data: 04/22/2021
// Dependencias: jQuery library, jPanelWifi.css
// Objetivo: Apresentar um alert() personalizado, a partir de um painel utilizando jQuery
// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------
// Abre uma painel fullscreen para exibir mensagens de alerta para o usuário
// Parâmetros:
// - $txt: mensagem a ser exibida no painel ("": exibe $countTimer ou "txt da mensagem")
// - $hasTimer: 
//   * true (apresenta um contador regressivo no painel ao inves da combinação "mensagem + btn")
//   * false (não apresenta um contador, mas sim um $txt + btn)
// - $countTimer: valor inicial do contador regressivo, caso $hasTimer for true
// - $srcImg: caminho + nome da imagem a ser exibida no painel de informações
// - $fontSize: tamanho da fonte do texto
// Exemplos:
//  showPanelInfo("",true,3,"","100"): exibe o painel de informacoes com o texto inicialmente em 3 até chegar 0 e depois o painel desaparece
//  showPanelInfo("Fim de jogo",false,0,"img/imagem.gif","200"): exibe o painel com a msg "Fim de jogo" com um btn para fechar a janela

function alertWifi($txt, $hasTimer, $countTimer, $srcImg, $fontSize) {
    let $panelInfo = $(`<div></div>`).addClass("panelInfo");
    let $contentPanel = $(`<div></div>`).addClass("contentPanel");
    $($panelInfo).append($contentPanel);

    // Adiciona uma imagem ao painel de informações
    if ($srcImg != "") {
        $imgPanelInfo = $("<img>").attr("src",$srcImg);
        $($contentPanel).append($imgPanelInfo);
    }
    // Adiciona o texto ao painel de informações ou o contador
    $txtPanelInfo = ($hasTimer)?$("<p></p>").html($countTimer):$("<p></p>").html($txt);
    $($txtPanelInfo).css("font-size",`${$fontSize}px`);
    $($contentPanel).append($txtPanelInfo);
    
    // Se não houver timer exibe um texto fixo ao inves de um cronometro regressivo
    if (!$hasTimer) {
        $btnPanelInfo = $("<button></button>").text("Fechar").addClass("button");
        $($contentPanel).append($btnPanelInfo);
        $($btnPanelInfo).click(function(){closeAlertWifi($panelInfo)});
    }

    // Adiciona o painel de informações ao body
    $("body").append($panelInfo);
    $($panelInfo).hide(0);
    $($panelInfo).slideDown(500);
    
    // Eh um cronometro regressivo?
    if ($hasTimer) showChronoAlertWifi($panelInfo, $countTimer);
}

// ----------------------------------------------------------------------------------------
// Fecha o painel de informacoes
// Parâmetros:
//  - $id: id do painel de informações
function closeAlertWifi($id) {
    $($id).slideUp(300, function() {$($id).remove()});
}

// ----------------------------------------------------------------------------------------
// Fecha o painel de informacoes
// Parâmetros:
//  - $id: id do painel de informações
function showChronoAlertWifi($panelInfo, $countTimer) {
    $($panelInfo).children("div").children("p").text($countTimer);
    if ($countTimer > 0) setTimeout(showChronoAlertWifi, 1000, $panelInfo, --$countTimer);
    else closeAlertWifi($panelInfo);
}
