
// for menu bar expand 

document.getElementById('sid').addEventListener("click", function () {
    if (document.getElementById('bo').classList[1] == "sidebar-collapse") {
        document.getElementById('bo').classList.remove('sidebar-collapse')
    } else {
        document.getElementById('bo').classList.add('sidebar-collapse')
    }
});

// const url = window.location.href.split('/')[4];

function filterTowns() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }









  
