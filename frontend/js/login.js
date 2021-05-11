$(document).ready(function () {
    $("#btnLogin").click(function () {
        let $user = $("#userLogin").val();
        let $pwd = $("#pwdLogin").val();
        if ($user && $pwd) {
            $.getJSON("http://localhost:8080/usuarios", function ($registros) {
                if ($registros.filter($usuario => $usuario.user == $user && $usuario.pwd == $pwd).length > 0) {
                    localStorage.clear();
                    localStorage.setItem("index", JSON.stringify($registros.findIndex($usuario => $usuario.user == $user) + 1));
                    window.open("game.html", '_self')
                } else alert("Usuario inválido");
            });
        }
        else alert("Erro: favor informar o usuário e senha.")
    });

    $(document).ready(function () {
        $("#btnCadastro2").click(function () {
            let $user = $("#userCad").val();
            let $pwd = $("#pwdCad").val();
            let data = { "user": $user, "pwd": $pwd };
            let url = "http://localhost:8080/";
            if ($user && $pwd)
                $.getJSON("http://localhost:8080/usuarios", function ($registros) {
                    if ($registros.filter($usuario => $usuario.user == $user).length > 0)
                        alert("Usuário já cadastrado.")
                    else if ($("#cPwd").val() != $pwd)
                        alert("As senhas devem ser iguais. Tente novamente.")
                    else {
                        axios.post(url, data);
                        alert("Usuário cadastrado com sucesso!");
                    }
                });
            else
                alert("Por favor, preencha os campos para se cadastrar!")
        });
    });
});
