function login(event) {

    event.preventDefault();

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;


    if (
        username === "sunyy" &&
        password === "111555"
    ) {

        alert("✅ Login berhasil!");

        window.location.href = "home1.html";

    } else {

        alert("❌ ada yang salah lol!! pikun kah?");

    }

}


function togglePassword() {

    let password =
        document.getElementById("password");

    let eyeButton =
        document.getElementById("eyeButton");


    if (password.type === "password") {

        password.type = "text";

        eyeButton.textContent = "🙈";

    } else {

        password.type = "password";

        eyeButton.textContent = "👁️";

    }

}