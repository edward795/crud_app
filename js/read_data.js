
 document.getElementById("loader").style.display = "none";
  
  
//read operation

function read_value() {
	$("#re").css("visibility","hidden");
	document.getElementById("loader").style.display = "block";
	var url = script_url+"?action=read";
	//console.log(url);

    //call to get json values from backend
	$.getJSON(url, function (json) {
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
		$("table").addClass("table");

		var count=1;
        var header = table.createTHead();
		var row = header.insertRow(0);     
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
	
	    cell1.innerHTML = "<b>SI NO</b>"
		cell2.innerHTML = "<b>Name</b>";
		cell3.innerHTML = "<b>Email</b>";
		cell4.innerHTML = "<b>Branch</b>";
		cell5.innerHTML = "<b>Receipt</b>";
        
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < json.records.length; i++) {

            tr = table.insertRow(-1);
			    var tabCell = tr.insertCell(-1);
				tabCell.innerHTML = `${count}`;
				tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].name;
				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = json.records[i].email;
				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = json.records[i].branch;
				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = `<a href="${json.records[i].receipt}">Resume Link</a>`;
				count++;
            }
      

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
		document.getElementById("loader").style.display = "none";
		$("#re").css("visibility","visible");

	//fail	condition if database is empty
    }).fail(function() { 
		document.getElementById("nodata").style.display = "block";
		document.getElementById("loader").style.display = "none";
    });
	}
	
	

