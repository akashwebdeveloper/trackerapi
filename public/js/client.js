
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


// ------ CHALLENGE FORM START--------
// For Show input field only if a specific option is selected
function yesnoCheck(that, userLength) {
  var joinFee = parseInt(document.getElementById("fee").value);
  var size = document.getElementById("size").value;

  if (that.value == "limited") {
    document.getElementById("ifYes").style.display = "block";
    document.getElementById("reward").value = "";
    
    if (size && parseInt(size) > 0 && joinFee && parseInt(joinFee) > 0) {
      document.getElementById("reward").value = parseInt(joinFee) + ((size - 1) * joinFee) - (((size - 1) * joinFee) * 5 / 100)
    }else{
      document.getElementById("reward").value = '';
    }
  } else {
    if (joinFee) {
      document.getElementById("reward").value = joinFee + ((userLength - 1) * joinFee) - (((userLength - 1) * joinFee) * 5 / 100)
    }
    document.getElementById("ifYes").style.display = "none";
  }
}


function rewardCal(joinFee, userLength) {
  var limit = document.getElementById("limit").value;
  if (limit === "unlimited") {
    if (joinFee && parseInt(joinFee) > 0) {
      document.getElementById("reward").value = parseInt(joinFee) + ((userLength - 1) * joinFee) - (((userLength - 1) * joinFee) * 5 / 100)
    }else{
      document.getElementById("reward").value = '';
    }
  }

  if (limit === "limited") {
    var size = document.getElementById("size").value;
    if (size && parseInt(size) > 0 && joinFee && parseInt(joinFee) > 0) {
      document.getElementById("reward").value = parseInt(joinFee) + ((size - 1) * joinFee) - (((size - 1) * joinFee) * 5 / 100)
    }else{
      document.getElementById("reward").value = '';
    }
  }
}


function rewardLimitCal(userLength) {
  var joinFee = parseInt(document.getElementById("fee").value);
    if (parseInt(userLength) > 0 && joinFee) {
      document.getElementById("reward").value = joinFee + ((userLength - 1) * joinFee) - (((userLength - 1) * joinFee) * 5 / 100)
    }else {
      document.getElementById("reward").value = '';
    }
}

// ------ CHALLENGE FORM END--------








