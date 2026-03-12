function logar(){

let usuario = document.getElementById("usuario").value
let senha = document.getElementById("senha").value

if(usuario === "admin" && senha === "1234"){

localStorage.setItem("logado","true")

window.location.href = "index.html"

}else{

alert("Usuário ou senha incorretos")

}

}