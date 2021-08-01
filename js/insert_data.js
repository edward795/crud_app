
var test=0;
$("#resInsert").hide();
document.getElementById('display').style.display = "none";
document.getElementById('email-error').style.display = "none";
document.getElementById('loader1').style.display = "none";
 
//function for uploading file to google drive 

    $('#uploadfile').on("change", function() {
        var file = this.files[0];
        var fr = new FileReader();
        fr.fileName = file.name;
        fr.onload = function(e) {
            e.target.result
            html = '<input type="hidden" name="data" value="' + e.target.result.replace(/^.*,/, '') + '" >';
            html += '<input type="hidden" name="mimetype" value="' + e.target.result.match(/^.*(?=;)/)[0] + '" >';
            html += '<input type="hidden" name="filename" value="' + e.target.fileName + '" >';
            $("#data").empty().append(html);
        }
        fr.readAsDataURL(file);
    });
             
//function to validate form inputs
    
function spinner_start(){
    var name=document.getElementById('name').value;
	var email=document.getElementById('email').value;
	//console.log(name);
	var emailregex=/^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	var nameRegex=/^[a-zA-Z ]+$/;
	var flag=0;
	if(!nameRegex.test(name)){
		flag=1;
		//console.log("name error");
	}
	else if(!emailregex.test(email)){
		flag=1;
	}
	else if(name.length>10){
		flag=1;
	}
	else if(email.length>40){
		flag=1;
	}
	if( document.getElementById("uploadfile").files.length == 0 ){
		//console.log("no files selected");
		flag=1;
	}


	if(flag==1){
		document.getElementById('email-error').style.display='block';
		document.getElementById("createForm").reset();
		document.getElementById('uploadfile').value= null;
	}
	else{
		document.getElementById('email-error').style.display = "none";
		document.getElementById('loader1').style.display = "block";
		document.getElementById('create-button').style.display = "none";
        document.getElementById("createForm").style.display="none";
		setTimeout(insert_value,5000);
	}
}


