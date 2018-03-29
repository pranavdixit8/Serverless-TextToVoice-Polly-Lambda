var API_ENDPOINT = "https://ip0zffe7w3.execute-api.us-west-2.amazonaws.com/dev"

document.getElementById("sayButton").onclick = function(){

	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
		"text" : $('#postText').val()
	};

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
	      	
					document.getElementById("postIDreturned").textContent=response;
	      },
	      error: function () {
	          alert("error");
	      }
	  });


	// adding lag to give polly to process that, can have much better solution here

	 setTimeout(function () {
	       var postId = document.getElementById("postIDreturned").textContent;
	       document.getElementById("test").textContent="Post ID: " + postId;

			$.ajax({
							url: API_ENDPOINT + '?postId='+postId,
							type: 'GET',
							success: function (response) {

								$('#posts tr').slice(1).remove();

				        jQuery.each(response, function(i,data) {

									var player = "<audio controls autoplay><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

									if (typeof data['url'] === "undefined") {
				    				var player = ""
									}	

									$("#posts").append("<tr> \
											<td>" + data['id'] + "</td> \
											<td>" + data['voice'] + "</td> \
											<td>" + data['text'] + "</td> \
											<td>" + data['status'] + "</td> \
											<td>" + player + "</td> \
											</tr>");
				        });
							},
							error: function () {
									alert("error");
							}
					});
	    }, 2500);


}

document.getElementById("searchButton").onclick = function(){

	var postId = $('#postId').val();


	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
								<td>" + data['id'] + "</td> \
								<td>" + data['voice'] + "</td> \
								<td>" + data['text'] + "</td> \
								<td>" + data['status'] + "</td> \
								<td>" + player + "</td> \
								</tr>");
	        });
				},
				error: function () {
						alert("error");
				}
		});
}

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}
