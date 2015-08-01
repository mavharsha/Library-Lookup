function validate()
{
  // var book = document.forms["myForm"]["ISBN"].value;
	console.log($('#ISBN').val());
	var book = $('#ISBN').val();
	
		if(isNaN(book))
		{ 
		console.log("Not a number");
		alert("Entered ISBN is not a number.");
		}else{
		
			if (book.length == 10 || book.length == 13 ) {
				  loadData();
				}
				else{
				var jsitem = $('#items');
				jsitem.text("");
					alert("Enter the correct ISBN"); 
			   }
		   }
  return false;
}


function loadData() {
	  var $jsitem = $('#items');
	  var $book=$('#ISBN').val();
	  $jsitem.text("");
	  
	$.ajax({
	  url: "http://xisbn.worldcat.org/webservices/xid/isbn/"+$book+"?method=getMetadata&format=json&fl=*",
	  type: 'POST',
	  dataType: 'jsonp',
	  xhrFields: { withCredentials: false },
	  accept: 'application/json'
	}).done(function(data) {
		var status = data.stat;
		var articles = data.list;

		if(status === "ok")
		{		
		$("#secondframe").css("visibility", "visible");
		$jsitem.append('<H5><i>The details of the book searched</H5>');

		$.each(articles, function( key, val ) {
	
					$jsitem.append('Title Of The Book: <i><b> '+val.title+ 
									'</b></i> <li>Written '+val.author+'</li><li> Edition: <i>'+val.ed+
									'</i></li> <li> Year of Publication: <i> '+val.year+
									'<i> </li> <li> <a href="'+val.url+'" target="_blank">Click here to open the related Worldcat page</a></li>');
				  });

		}
		else{
		
		alert("Bad ISBN, please try another one."); 
		
		}

	   

	}).fail( function( xmlHttpRequest, statusText, errorThrown ) {
	  alert(
		"Your form submission failed.\n\n"
		  + "XML Http Request: " + JSON.stringify( xmlHttpRequest )
		  + ",\nStatus Text: " + statusText
		  + ",\nError Thrown: " + errorThrown );
	});


  return false;
};

$('#myForm').submit(validate);  

