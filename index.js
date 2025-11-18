//--Page to navigate when clicked menue item
// page: from HTML CLICK  Example page:/01/demos/index.html
function loadPage(page) {

    //--Get Refrence for the HTML element by its id
    //--contentFrame is iframe element type
    let iframeElement = document.getElementById("contentFrame");

    //--give the iframe the HTML adress
    iframeElement.src = page;

    // Close sidebar on mobile
    document.getElementById("sidebar").classList.remove("show");
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
}