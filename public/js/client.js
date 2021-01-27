
// for menu bar expand 

document.getElementById('sid').addEventListener("click", function () {
    if (document.getElementById('bo').classList[1] == "sidebar-collapse") {
        document.getElementById('bo').classList.remove('sidebar-collapse')
    } else {
        document.getElementById('bo').classList.add('sidebar-collapse')
    }
});

const url = window.location.href.split('/')[4];


