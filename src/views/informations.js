document.getElementById('cardA').onclick = () => {
    document.getElementById('bodyTitle').innerHTML = 'Ancelin GLORIES';
    document.getElementById('bodyContainer').style.display = "flex";
    document.getElementById('blocAncelin').style.display = "flex";
    document.getElementById('blocCorentin').style.display = "none";
    document.getElementById('blocQuentin').style.display = "none";
    scrollDown("bodyContainer");
};
document.getElementById('cardC').onclick = () => {
    document.getElementById('bodyTitle').innerHTML = 'Corentin GRANDCHAMPS';
    document.getElementById('bodyContainer').style.display = "flex";
    document.getElementById('blocAncelin').style.display = "none";
    document.getElementById('blocCorentin').style.display = "flex";
    document.getElementById('blocQuentin').style.display = "none";
    scrollDown("bodyContainer");
};
document.getElementById('cardQ').onclick = () => {
    document.getElementById('bodyTitle').innerHTML = 'Quentin CESCHIN';
    document.getElementById('bodyContainer').style.display = "flex";
    document.getElementById('blocAncelin').style.display = "none";
    document.getElementById('blocCorentin').style.display = "none";
    document.getElementById('blocQuentin').style.display = "flex";
    scrollDown("bodyContainer");
};

function scrollDown(id) {
    var objDiv = document.getElementById(id);
    window.scroll(0, document.body.scrollHeight - objDiv.scrollHeight);
}