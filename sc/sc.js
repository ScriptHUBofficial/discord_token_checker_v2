async function SubmitToken() {

    const alerter = document.getElementById("alert-doe");
    const list = document.getElementsByClassName("list-group")[0];
    const id = document.getElementById("id");
    const tag = document.getElementById("tag");
    const tel = document.getElementById("phone");
    const loc = document.getElementById("locale");
    const email = document.getElementById("email");
    const ver = document.getElementById("verified");
    const profile = document.querySelector("#profile");
    const info = document.querySelector(".info")
    const token = document.getElementsByClassName("label")[0].value;

    alerter.style.display = "none";
    list.style.display = "none";
    profile.style.display = "none";
    info.style.display = "block";

    let response;
    try {
        response = await fetch("https://discordapp.com/api/v8/users/@me", {
            method: "GET",
            headers: {
                Authorization: token
            },
        });
        response = await response.json();
    } catch (e) {
        return alert(`Request failed: ${e}`);
    }

    if (!response.username) {
        return (alerter.style.display = "block");
    }

    if (response.avatar) {
        profile.src = "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png?size=128";
    } else {
        profile.src = "https://cdn.discordapp.com/embed/avatars/" + (response.discriminator % 5) + ".png?size=128";
    }

    tag.textContent = response.username + "#" + response.discriminator;
    email.textContent = response.email ? response.email : "no email";
    ver.textContent = response.verified ? "verified" : "not verified";
    tel.textContent = response.phone ? response.phone : "no phone";
    id.textContent = response.id;
    loc.textContent = response.locale;

    profile.style.display = "flex";
    list.style.display = "block";
    info.style.display = "none";
}