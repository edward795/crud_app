//function to insert other form values to google sheets

function insert_value() {
    document.getElementById("loader1").style.display = "block";
	var name= $("#name").val();
	var email=$("#email").val();
	var branch=$("#branch").val();
	
	
    var url = script_url+"?callback=createResponse&name="+name+"&email="+email+"&branch="+branch+"&action=insert";
	console.log(url);
  
    var request = jQuery.ajax({
		crossDomain: true,
		url: url ,
		method: "GET",
		dataType: "jsonp",
	 
    });
}

//Response from callback

  function createResponse(e) {
	console.log(e.result);
	$("#resInsert").show();
	$("#resInsert").html(e.result);
	document.getElementById("loader1").style.display = "none";
	document.getElementById("createForm").reset();
	document.getElementById("create-button").style.display = "block";
  }
  
  