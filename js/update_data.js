document.getElementById("updateEmailError").style.display="none";
document.getElementById('loader3').style.display="none";
document.getElementById('updateName').style.display="none";
document.getElementById('updateBranch').style.display="none";
$("#loader5").hide();
$("#updateAction").hide();

//update operation

function update_value(){
    document.getElementById("update-form").style.display="none";
    document.getElementById("fetchAction").style.display="none";
    document.getElementById("updateAction").style.display="none";
    document.getElementById("resDetails").style.display="none";
    document.getElementById("loader5").style.display="block";
      
	  var name= $("#update-name").val();
    var email=$("#update-email").val();
    var branch=$("#update-branch").val();
	
	  var url = script_url+"?callback=updateResponse&name="+name+"&email="+email+"&branch="+branch+"&action=update";
  
    var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp",
	  
    });
  }

  
  function updateResponse(e) {
      //console.log(e.result);
      $("#resUpdate").html(e.result);
      document.getElementById("loader5").style.display = "none";
      document.getElementById("update-form").reset();
    }
  
  //function to fetch current values for updating

  function updateFun(){
      var email=$("#update-email").val();
      //console.log("Update value fetch");
      //console.log(email);
    
    
      if(email==""){
          document.getElementById("updateEmailError").style.display = "block";
      }else{
          document.getElementById("updateEmailError").style.display = "none";
          document.getElementById("loader3").style.display = "block";
          var url=script_url+"?callback=ctrlq&name="+name+"&email="+email+"&branch="+branch+"&action=update_content";
          //console.log(url);
          $.getJSON(url, function (json) {
          document.getElementById("update-name").value = json.name;
          document.getElementById("update-branch").value = json.branch;
          if(json.name=='' && json.branch==''){
            document.getElementById("resDetails").innerHTML=`<div class="alert alert-danger">No Such Email Id Exists!</div>`;
            $("#updateAction").hide();
          }else{
            document.getElementById("resDetails").innerHTML=`<div class="alert alert-success">Details Fetched,Edit & Click update Button!</div>`;
            document.getElementById('updateName').style.display="block";
            document.getElementById('updateBranch').style.display="block";
            $("#fetchAction").hide();
            $("#updateAction").show();
          }
         document.getElementById("loader3").style.display = "none";
         
         //$("#updateAction").show();
        });
        
        $("#updateeAction").click(function(){branch
          $("#updateAction").hide();
      });
    }
 }