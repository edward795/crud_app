<h2>CRUD App With Google Sheets As Backend (Data + File upload)</h2>
<h3>Technologies and Tools</h3>
<li>HTML</li>
<li>CSS</li>
<li>Javascript</li>
<li>Bootstrap 5</li>
<li>jQuery</li>
<li>A little AppScript</li><br>
<p>Wow!! only this much no backend framework!  trust me and look below, All you need other than this is a google account!</p>
<h4>Visit this <a href="https://edward795.github.io/crud_app/">link</a> for Demo!</h4>
  <h3>1.Home Template</h3>
  <p float="left">
  <img src="sample images/home.png" width="450">
  <img src="sample images/dashboard.png" width="450"/>
  </p>
  <h4>Features</h4>
  <li>Dedicated dashboard for CRUD Operations</li>
  <h3>2.Create Operation</h3>
  <p float="left">
  <img src="sample images/create.png" width="400">
  <img src="sample images/create_loader.png" width="400"/>
  </p>
  <h4>Features</h4>
  <li>Responsive Bootstrap Form</li>
  <li>File uploaded to google drive in this operation</li>
  <li>Loader until operation status changes</li>
  <h3>3.Read Operation</h3>
  <p float="left">
  <img src="sample images/read.png" width="700">
  </p>
  <h4>Features</h4>
  <li>Returns Json Data</li>
  <li>Json data used to build a responsive table,with uploaded file link in google drive.</li>
  <h3>4.Update Operation</3>
  <p float="left">
  <img src="sample images/update.png" width="440">
   <img src="sample images/update_data.png" width="440">
  </p>
  <h4>Features</h4>
  <li>Uses email id to filter data in database</li>
  <li>If email id matches,it builds a form with populated values,allowing updating data.</li>
  <h3>5.Delete Operation</h3>
  <p float="left">
  <img src="sample images/delete_verification.png" width="400">
  </p>
  <h4>Features</h4>
  <li>Uses 2 Factor Verification before deleting data</li>
  <li>Sends a unique code to email id of entered user,user have to enter the same code for deletion to be a success.</li>
  <li>Ensures data protection.</li>
  <h3>6.Success Or Fail Handler</h3>
  <p float="left">
  <img src="sample images/create_success_handler.png" width="400">
  <img src="sample images/delete_error_handler.png" width="400">
  </p>
  <h4>Features</h4>
  <li>All Logical Validations in Google Sheets Backend for Security Improvement, only basic field validations in frontend!</li>
  <li>jQuery callback returns success or failure as callbacks as template for improved security</li>
  <h3>6.Backend Google Sheets Code</h3>
  <li>A combination of javascript & appscript</li>
  <li>See the <a href="code.gs">code.gs</a> file</li>
  <br>
  <h3>If you liked this repo & found it useful please give a star,it's with a lot of effort i am putting forward this.</h3>
  
  
  
  
  
  


