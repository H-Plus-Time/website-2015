load_challenges = function(target_year) { 
    var sheetsu = (target_year >= 2015);
	$.get(sheetsu ? "https://sheetsu.com/apis/bee3ab30" : '../static/data/challenges.json', function(data) {
        if (sheetsu && !data.success) {
            alert("Couldn't load challenges, status " + data.status);
            console.log(data);
            return false;
        }
		var template = $("div.challenge-row");
		$.each (sheetsu ? data.result : data.challenges, function(index, challenge) {
			if(challenge.year == target_year) {
				var panel = template.clone();
				var custom_row_id = "challenge-row-"+index;
				panel.attr("id", custom_row_id);

				if (challenge.winner) {
					var winner_panel = $("<span>", { class: "clearfix, challenge-winner-label",
						                             html: "<span class=\"glyphicon glyphicon-star\"></span>" + " " + challenge.winner });
	                panel.prepend(winner_panel);
				}

				panel.find("h2.name").text(challenge.name);
				panel.find("p.city span").text(challenge.city + " ("+ challenge.year + ")");

				if (challenge.organisationImg) {
					panel.find("p.city a").text(challenge.organisation);
				} else {
					panel.find("p.city a").text("Supported by Health Hack");
				}
				panel.find("p.city a").attr("href", challenge.organisationLink);
				panel.find("p.summary").text(challenge.summary);

				// details
				var custom_id = "challenge-page-container-"+index;
				panel.find("#challenge-page-container").attr("id", custom_id);

				if (challenge.organisationImg) {
                    var prefix = (challenge.organisationImg.match(/^http/) ? '' : '../static/images/');
					panel.find("div.challenge-title img.sponsor").attr("src", prefix + challenge.organisationImg);
					panel.find("div.challenge-title img.sponsor").attr("alt", challenge.organisation);
				}
				else {
					panel.find("div.challenge-title img.sponsor").attr("src", "images/healthhack-logo/HH_Logo.svg");
					panel.find("div.challenge-title img.sponsor").attr("alt", "Health-Hack");
				}

				panel.find("div.organiser-details p").text("Presented by " + challenge.presenters);
				panel.find("div.organiser-details a").text(challenge.organisation);
				panel.find("div.organiser-details a").attr("href", challenge.organisationLink);
				
			    if(challenge.description) {
                    var desc_text = "";
                    if (sheetsu) {
                        desc_text = challenge.description.replace(/\n/g, '<br/>');
                    } else {
                        $.each(challenge.description, function (index, desc_line) {
                            desc_text += desc_line + "<br><br>";
                        });
                    }
				    panel.find("div.challenge-data p.description").html(desc_text);
				}
				
				//	panel.find("div.challenge-data a.team").attr("href", challenge.teamLink);
				if (challenge.team) {
					var team_panel = $("<a>", { class: "team", html: "<b>VIEW TEAM INFORMATION</b>", "href": challenge.teamLink });
					panel.find("div.details-panel").append(team_panel);
				}

				// Add working demo button
				if (challenge.workingDemoLink) {
					var demo_panel = $("<a>", { class: "workingDemoLink", "href": challenge.workingDemoLink });
					var demo_button = $("<button>", { class: "btn-primary btn grey-btn", html: "WORKING DEMO" });
					demo_panel.append(demo_button);
					panel.find("div.challenge-links").append(demo_panel);
				}

			    if(challenge.description) {
					// show / hide details buttons
				 	var details_panel = $("<div>", {class: "detailsLink"});
				 	var show_more_button = $("<button>", {
				   		class: "btn-primary btn white-btn",
				   		id: "show-more-" + index,
				   		html: "DETAILS"
				 	});
				 	var show_less_button = $("<button>", {
				   		class: "hide btn-primary btn white-btn",
				   		id: "show-less-" + index,
				   		html: "HIDE DETAILS"
				 	});
				 	details_panel.append(show_more_button);
				 	details_panel.append(show_less_button);
				 	panel.find("div.challenge-links").append(details_panel);

				 	show_more_button.click(function () {
				   		$('#show-more-' + index).addClass("hide");
				   		$('#show-less-' + index).removeClass("hide");
				   		$('#' + custom_id).fadeIn("slow");
				 	});

				 	show_less_button.click(function () {
				   		$('#show-less-' + index).addClass("hide");
				   		$('#show-more-' + index).removeClass("hide");
				   		$('#' + custom_id).fadeOut("slow");
			 	 	});
			    }
                $("#challenge-list div.list").append(panel);
			}
		});

		$("#challenge-row-template").remove();

	}).always(function() {
	      var monkeyList = new List('challenge-list', {
	      valueNames: [ 'name', 'city', 'description', 'hightlight' ],
	      page: 7,
	      plugins: [ ListPagination({}) ]
	    });
	});
	$('.pagination-container').click(function() {
  		$(document).scrollTop(300);
	});
};