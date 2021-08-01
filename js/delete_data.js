 
 document.getElementById("loader7").style.display = "none";
 document.getElementById("deleteEmailError").style.display = "none";
  
  //Delete Operation
 
  function delete_value(){
      document.getElementById("loader7").style.display = "block";
      document.getElementById("delete-form").style.display = "none";
      document.getElementById("code-action").style.display = "none";
      document.getElementById("delete-action").style.display = "none";
      var name= $("#delete-name").val();
      var email=$("#delete-email").val();
      var code=$("#unique_code").val();
      //console.log(email);
      var branch=$("#branch").val();
    
    
      var url = script_url+"?callback=ctrlq&name="+name+"&email="+email+"&branch="+branch+"&code="+code+"&action=delete";
      //console.log(url);
  
      var request = jQuery.ajax({
          crossDomain: true,
          url: url ,
          method: "GET",
          dataType: "jsonp"
      });
  }
  
  
    
    //Response from Callback

    function ctrlq(e) {
      $("#code_validate").hide();
      //console.log(e.result);
      $("#resDelete").html(e.result);
      document.getElementById("loader7").style.display = "none";
      document.getElementById("delete-form").reset();
    }
  
    