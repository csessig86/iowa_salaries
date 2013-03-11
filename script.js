// DataTables currency
// Use to sort the table via currency
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"currency-pre": function ( a ) {
		a = (a==="-") ? 0 : a.replace( /[^\d\-\.]/g, "" );
		return parseFloat( a );
	},
	
	"currency-asc": function ( a, b ) {
		return a - b;
	},
	
	"currency-desc": function ( a, b ) {
		return b - a;
	}
});

// Where we'll put the data
var newDataSet = [];

// Our column headers
// Change these to fit your table
var tableColumnSet =   [
	{ "sTitle": "Employee" },
	{ "sTitle": "Department" },
	{ "sTitle": "Total FY12 Salary", "sType": "currency" },
	{ "sTitle": "Gender", "sClass": "center" },
	{ "sTitle": "County", "sClass": "center" },
	{ "sTitle": "Position", "sClass": "center" }
];

// Our DataTable information
// Don't need to change anything here
// Unless you want to customize the table format
function showInfo() {
	$('#table_div').html( '<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="table"></table>' );

	// Push the data to the table
	$('#table').dataTable( {
		"bProcessing":true,
		"sPaginationType": "bootstrap",
		"iDisplayLength": 100,
		"aaData": newDataSet,
		"aoColumns": tableColumnSet,
		// Pick which column we will sort by default
		// For this table, we'll sort ascending by Total FY12 Salary
		"aaSorting": [[ 2, "desc" ]],
		"oLanguage": {
			"sLengthMenu": "_MENU_ records per page"
		}
	});
}

// Load up the CSV using Miso.Dataset
$(document).ready( function() {
	// Change URL to the right path for your CSV
	var ds = new Miso.Dataset({
  		url : 'csvs/salary_book_clean.csv',
  		delimiter : ','
  	});

	// Run this after we load our CSV
	ds.fetch({ success : function() {
    	this.each(function(row, rowIndex) {
    		// Change these variables to match your column names
    		var employeeData = row.Employee;
    		var departmentData = row.Department;
    		var salaryData = row.TotalFY12Salary;
    		var genderData = row.Gender;
    		var countyData = row.County;
    		var positionData = row.Position;
    		// Put information in an array and push it to our table
    		// Change these variables to match variables above
    		var myArray = [employeeData, departmentData, salaryData, genderData, countyData, positionData];
			newDataSet.push(myArray);
  		});
    	// Call DataTable function showInfo
		showInfo();
	}});
});