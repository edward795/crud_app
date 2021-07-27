var script_url = "https://script.google.com/macros/s/AKfycbzqqo75KZvW-aCXsd7gIWmZTOyAUnWf8XoC8-ZIyzMr7J5NF4bsf-mg3wHVI6iU-L4YHw/exec";
document.getElementById("deleteCode").style.display = "none";
$("#code_validate").hide();
var count=0;
$("#delete-action").hide();

//Unique code sending function call

function codeGenerate(){
	document.getElementById("deleteCode").style.display = "block";
	$("#code_validate").show();
	count+=1;
	//console.log(count);
	var email=$("#delete-email").val();
	//console.log("delete code generete");
	//console.log(email);

//check if the email is valid and create a callback to send a unique code for data deletion

if(email==""){
	$("#deleteEmailError").show();
}else{
	$("#delete-action").show();

	var url=script_url+"?callback=ctrlq&email="+email+"&action=code_generate";

	var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
	  });
    
	//allow resend code upto 3 times then exhaust the tries

	if(count>=1){
	   document.getElementById("code-action").innerHTML="Resend Code";
	}
	if(count>=3){
	   document.getElementById("code-action").disabled = true;
    }
	$("#enterid").show();
  }      
}       
