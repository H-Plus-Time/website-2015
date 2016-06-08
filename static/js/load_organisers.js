$( document ).ready(function() {
	$.get("data/organisers.json", function(data) {
		var template = $("#organiserList div.organiser");
		$.each (data.organisers, function(index, organiser) {
			var panel = template.clone();
			panel.find("div.organiser-image").css("background-image", "url('" + organiser.photo + "')");
			panel.find("div.organiser-details h3").text(organiser.name);
			panel.find("div.organiser-details p").text(organiser.role + " | " + organiser.city);
			panel.find("div.organiser-details a").attr("href", "mailto:" + organiser.email);
			panel.find("div.organiser-details a").text(organiser.email);
			panel.find("div.organiser-bio p").html(organiser.bio);
			panel.appendTo("#organiserList");
		});

		$("#organiserList div.organiser")[0].remove();
	});


});
