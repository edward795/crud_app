//function to get uploaded file url 

function record_data(e,fileUrl) {
  try {
    /*var doc     = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));*/
    var doc     = SpreadsheetApp.openById("1hkB5nrtUE1HaFOXNHyajCNtNE_aGaRXfYy1ZwZ0B8I4");
    var sheet = doc.getSheets()[0];
    
    /*var sheet   = doc.getSheetByName("responses"); // select the responses sheet, MAKE SURE YOU HAVE A SHEET NAMED responses*/
    Logger.log("hello");
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    var nextRow = sheet.getLastRow()+1; // get next row
    var row     = [ new Date() ]; // first element in the row should always be a timestamp
    // loop through the header columns
    Logger.log("are we getting here row" + row);
    for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column
      
      if(headers[i].length > 0 && headers[i] == "receipt") {
        row.push(fileUrl); // add data to row
      }
      else if(headers[i].length > 0) {
        row.push(e.parameter[headers[i]]); // add data to row
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    Logger.log(row);
  }
  catch(error) {
    Logger.log(e);
  }
  finally {
    return;
  }
}


//function to upload file

function doPost(e) {
  var data = Utilities.base64Decode(e.parameters.data);
  var blob = Utilities.newBlob(data, e.parameters.mimetype, e.parameters.filename);
  var name =e.parameter.name;
  var email=e.parameter.email;
  var flag=0;
  var ss=SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1hkB5nrtUE1HaFOXNHyajCNtNE_aGaRXfYy1ZwZ0B8I4/edit#gid=0");
  var sheet = ss.getSheetByName("responses");
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
     var email_check = sheet.getRange(i, 3).getValue();
     if(email_check===email){
       flag=1;
     }
  }
  if(flag==0){
    var folders = DriveApp.getFoldersByName("WebForm Uploads");
    if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder(dropbox);
      }
    var file = folder.createFolder([name, email].join("-")).createFile(blob);
    var fileUrl=file.getUrl();
    record_data(e,fileUrl);
    var output = HtmlService.createHtmlOutput("<h2>Successful!</h2><br><a href=${fileUrl}>Click Here!</a>");
    output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return output;
    // return ContentService.createTextOutput("Done.") <--- Here, an error occurred.
  }else{

  }
}


//function which calls other functions based on url action parameter 

function doGet(e){
  
  var op = e.parameter.action;

  var ss=SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1hkB5nrtUE1HaFOXNHyajCNtNE_aGaRXfYy1ZwZ0B8I4/edit#gid=0");
  var sheet = ss.getSheetByName("responses");

  if(op=="insert")
    return insert_value(e,sheet);

  if(op=="delete")
    return delete_value(e,sheet);

  if(op=="read")
    return read_value(e,ss);
  
  if(op=="update")
    return update_value(e,sheet);
  
  if(op=="update_content"){
    return update_details(e,sheet);
  }
  if(op=="code_generate"){
    return code_generate(e,sheet);
  }
}

//function which generates unique code for 2 factor verification before delete operation

function code_generate(request,sheet){
  var email=request.parameter.email;
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
  var email_d=sheet.getRange(i, 3).getValue();
  if(email==email_d){
      const unique_num = Math.floor(Math.random() * (10000 -1000 )) + 1;
      sheet.getRange(i,11).setValue(unique_num);
      var unique=unique_num;
      var html=`<p>Your unique code to deletion of records is <b>${unique}</b> .Please enter it in the form to complete deletion of data!</p>`;
      MailApp.sendEmail({
      to: email,
      cc: '',
      subject: "Deletion confirmation code!",
      htmlBody: html
            });
  }
  }
}

//function to insert other values to sheet

function insert_value(request,sheet){
 var count=0;
  var name = request.parameter.name;
  var email=request.parameter.email;
  var branch=request.parameter.branch;
  var resume_link='';
  if(email==""){
    var result=`<div class="container">
  <div class="alert alert-danger" role="alert">
  Enter a valid email id!!
</div>
</div>`;
  }else{
  //Checking unique value of email
  var flag=1;
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
    var email1 = sheet.getRange(i, 3).getValue(); 
    if(email1==email){
      resume_link=sheet.getRange(i,5).getValue();
      count++;
      if(resume_link!=''){
        sheet.deleteRow(i);
      }
    }
    if(i==lr && resume_link==''){
      i=1;
    }
  }
    if(count>1){
      flag=0;
  var result=`<div class="container">
  <div class="alert alert-danger" role="alert">
  Email id already registered!!
</div>
</div>`;
    } }
  //add new row with recieved parameter from client
  if(flag==1){
  var d = new Date();
  var currentTime = d.toLocaleString();
  var rowData = sheet.appendRow([currentTime,name,email,branch,resume_link]);  
  var result=`<div class="container">
  <div class="alert alert-success" role="alert">
  Insertion Successful!!
</div>
</div>`;
  }
  
     result = JSON.stringify({
    "result": result
  });  
    
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);   
  }
  
  

//function uses email id to filter & return current values for updating

function update_details(request,sheet){
  var email=request.parameter.email;
  var name="";
  var branch="";
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
    var email1 = sheet.getRange(i, 3).getValue();
    if(email1==email){
       name=sheet.getRange(i, 2).getValue();
       branch=sheet.getRange(i, 4).getValue();
    }
  }
  var result={'name':name,'branch':branch,'email':email};
  
 return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);   
}
 


//function uses Email Id & unique code to filter and delete data

function delete_value(request,sheet){
  
  var output  = ContentService.createTextOutput();
  var email = request.parameter.email;
  var name = request.parameter.name;
  var code = request.parameter.code;
  var flag=0;

  if(email==""){
    flag=1;
    var result=`<div class="container">
  <div class="alert alert-danger" role="alert">
  Enter a a valid email id!!
</div>
</div>`;
  }else{
    
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
    var email_d = sheet.getRange(i, 3).getValue();
    var code_d = sheet.getRange(i, 11).getValue();
    if(email_d==email){
      flag=1;
    if(code_d==code){
      sheet.deleteRow(i);
      var foldername=[name, email].join("-");
      var folderToDelete = DriveApp.getFoldersByName(foldername).next();
     /* while (folderToDelete.getFiles().hasNext()) {
          const file = folderToDelete.getFiles().next();
          //Logger.log('Moving file to trash: ', file);
          //file.setTrashed(true);
          // Delete File
          Drive.Files.remove(file.getId());
          } */
      folderToDelete.setTrashed(true);

        var result=`<div class="container">
  <div class="alert alert-success" role="alert">
  Deletion Successful!!
</div>
</div>`;
      flag=1;
      break;
    }else{
      flag=1;
      var result=`<div class="container">
  <div class="alert alert-danger" role="alert">
  Incorrect Code!!
</div>
</div>`;
     }
   }
  }
 }
  if(flag==0)
    var result=`<div class="container">
  <div class="alert alert-danger" role="alert">
  No such email id exists!!
</div>
</div>`;
 
 result = JSON.stringify({
    "result": result
  });  
    
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);   
}


//function to read data from sheets backend

function read_value(request,ss){
  var output  = ContentService.createTextOutput(),
      data    = {};
  //Note : here sheet is sheet name , don't get confuse with other operation 
      var sheet="responses";

  data.records = readData_(ss, sheet);
  var callback = request.parameters.callback;
  
  if (callback === undefined) {
    output.setContent(JSON.stringify(data));
  } else {
    output.setContent(callback + "(" + JSON.stringify(data) + ")");
  }
  output.setMimeType(ContentService.MimeType.JAVASCRIPT);
  
  return output;
}


function readData_(ss, sheetname, properties) {

  if (typeof properties == "undefined") {
    properties = getHeaderRow_(ss, sheetname);
    properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  }
  
  var rows = getDataRows_(ss, sheetname),
      data = [];

  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],
        record  = {};

    for (var p in properties) {
      record[properties[p]] = row[p];
    }
    if(rows.length===0){
      record = {'ID':'NULL','NAME':'NULL','EMAIL':'NULL','BRANCH':'NULL'};
    }
    data.push(record);

  }
  return data;
}



function getDataRows_(ss, sheetname) {
  var sh = ss.getSheetByName(sheetname);

  return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
}


function getHeaderRow_(ss, sheetname) {
  var sh = ss.getSheetByName(sheetname);

  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];  
} 


//function to update the values upon edited values are submitted in front end

function update_value(request,sheet){

var output  = ContentService.createTextOutput();
  var email = request.parameter.email;
  var flag=0;
  var name = request.parameter.name;
  var branch=request.parameter.branch;

  if(email==""){
    flag=1;
    var result=`<div class="container">
  <div class="alert alert-danger" role="alert">
  Enter a  valid email id!!
</div>
</div>`;
  }else{
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
    var email_u = sheet.getRange(i, 3).getValue();
    var name_u = sheet.getRange(i, 2).getValue();
    var branch_u = sheet.getRange(i, 4).getValue();

    if(email_u===email){
      if(name_u!=name){
        if(branch_u=branch_u){
      sheet.getRange(i,2).setValue(name);
      sheet.getRange(i,4).setValue(branch);
      var result=`<div class="container">
  <div class="alert alert-success" role="alert">
  Data updated Successfully!!
</div>
</div>`;
      }
      }
      flag=1;
    }
    if(email_u==email && name_u==name && branch_u==branch){
      flag=1;
          var result=`<div class="container">
  <div class="alert alert-danger" role="alert">
  No Change to Update!!
</div>
</div>`;
    }
}
  }
  if(flag==0)
    var result=`<div class="container">
  <div class="alert alert-danger" role="alert">
  Email id not found in Database!!
</div>
</div>`;

  result = JSON.stringify({
    "result": result
  });  
    
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);   
  }



  
