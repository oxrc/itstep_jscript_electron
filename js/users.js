/*
let $ = require('jquery');
function search_user() {
	var nick = $("#nick").val();
	var phone = $("#phone").val();
	var age = $("#age").val();
	var interests = get_all_selected_items("interes_list");
	
	window.history.replaceState('', '', updateURLParameter(window.location.href, "nick", nick));
	window.history.replaceState('', '', updateURLParameter(window.location.href, "phone", phone));
	window.history.replaceState('', '', updateURLParameter(window.location.href, "age", age));
	window.history.replaceState('', '', deleteURLParameter(window.location.href, "interests[]"));
	for (key in interests)
		window.history.replaceState('', '', (location.origin + location.pathname + location.search + (location.search=='' ? '?' : '') + "&interests[]="+interests[key]));
	
	updateUsers(page);
	/*
	console.log(
		"nick:" + nick + "\n" +
		"phone:" + phone + "\n" +
		"age:" + age + "\n" +
		"interests:" + interests + "\n"
	  );
		* /
}
function updateURLParameter(url, param, paramVal){
	var newAdditionalURL = "";
	var tempArray = url.split("?");
	var baseURL = tempArray[0];
	var additionalURL = tempArray[1];
	var temp = "";
	if (additionalURL) {
		tempArray = additionalURL.split("&");
		for (var i=0; i<tempArray.length; i++){
			if(tempArray[i].split('=')[0] != param){
				newAdditionalURL += temp + tempArray[i];
				temp = "&";
			}
		}
	}

	var rows_txt = temp + "" + param + "=" + paramVal;
	return baseURL + "?" + newAdditionalURL + rows_txt;
}
function deleteURLParameter(url, param){
	var newAdditionalURL = "";
	var tempArray = url.split("?");
	var baseURL = tempArray[0];
	var additionalURL = tempArray[1];
	var temp = "";
	if (additionalURL) {
		tempArray = additionalURL.split("&");
		for (var i=0; i<tempArray.length; i++){
			if(tempArray[i].split('=')[0] != param){
				newAdditionalURL += temp + tempArray[i];
				temp = "&";
			}
		}
	}
	
	return (baseURL + "?" + newAdditionalURL.replace(/(?=(&))\1{2,}/g, '&')).replace('?&', '?') + temp;
}

function get_all_selected_items(list) {
	var select1 = document.getElementById(list);
	var selected1 = [];
	for (var i = 0; i < select1.length; i++) {
		if (select1.options[i].selected) selected1.push(select1.options[i].value);
	}
	return selected1;
}
function get_getQuery() {
	return_str = '';
	if (location.search != "")
	{
		var x = location.search.substr(1).split(";")
		for (var i=0; i<x.length; i++)
		{
			 var y = x[i].split("=");
			 return_str += y[0]+ "=" + y[1]+"&";
		}
	}
	return return_str.substring(0, return_str.length - 1);;
}
function dropUser(id) {
	var link = "/api/drop_user/" + id;
	$.ajax({
			  type: "GET",
			  url: link,
			  success: function (msg) {
				if (msg['error'] != null) {
					$(".alert").text(msg['error']);
				}
				else {
					$("#user_ul_"+id).remove();
					updateUsers(page)
					updatePager();
				}
				
			  }
			});
}
function reset_input() { //plain JS
	var multiselect = document.getElementById('interes_list');
	for (i=0;i<multiselect.options.length;i++){
		multiselect.options[i].selected=false;
	} 
	document.getElementById("age").value = '';
	document.getElementById("phone").value = '';
	document.getElementById("nick").value = '';
}
var notFoundStr = "Просим прощения, но никого не найденно!";
var rows_count = 4;
var next_available = true;
function setPageAndUpdateUsers(p) {
	page = p;
	if (page >= 0) {
		next_available = true;
	}
	if(pages <= page + 1)
		next_available = false;
	updateUsers(page);
}
function updateUsers(page) {
//		console.log (final_url);
	$.ajax({
		type: "GET",
		url: final_url,
		success: function (msg) {
			$("#users").empty();
			//userOptions = "<table><tr><th>Id:</th><th>Nick:</th><th>Age:</th><th>Phone:</th><th>Interests:</th><th>Actions:</th></tr>"
			userOptions = "<table><tr><th>Id:</th><th>Nick:</th><th>Age:</th><th>Phone:</th><th>Actions:</th></tr>"
			if (msg.users.length < rows_count)
				next_available = false;
			if (msg.users.length == 0) {
				next_available = false;
				/*page = --page;
				updateUsers(page);*/
				return;
				//userOptions = notFoundStr;
			}
			for (key in msg.users) {
				userOptions += "<br><tr class=\"five_cells\" id=\"user_ul_" + msg.users[key]['id'] + "\"><td>" + msg.users[key]['id'] + 
								"</td><td>" + msg.users[key]['nick'] + 
								"</td><td>" + msg.users[key]['age'] + 
								"</td><td>" + msg.users[key]['phone'] +
								/*
								"</td><td>"; //style=\"float: left; text-align: left;\"
				for (key1 in msg.users[key]['interests'])
					userOptions += "<br>&nbsp;&nbsp;&nbsp;&nbsp;*)"+ msg.users[key]['interests'][key1];
				userOptions +=
								"<br></td>" +
								* /
								"</td><td><a onclick=\"dropUser(" + msg.users[key]['id'] + ");\" href=\"#\">delete</a>&nbsp;" +
								"<a rel=\"nofollow noopener noreferer\" target=\"_blank\" href=\"/user/update/" + msg.users[key]['id'] + "\">update</a>" +
								"</tr>";
				
			}
			$("#users").append(userOptions);				
			updatePager();
		}
	});
}
function back_page() {
	page--;
	if (page >= 0) {
		next_available = true;
		updateUsers(page);
	}
	else
		page++;
}
function next_page() {
	if (next_available) {
		page++;
		updateUsers(page)
	}
}
pages = 0;
function updatePager() {
	next_page_exist = true;
	current_page = 0;
	while(next_page_exist == true) {
		request = "/api/get_user/" + rows_count + "/" + current_page + "/" + location.search;
//			console.log(request);
		
		$.ajax({
			type: "GET",
			url: request,
			success: function (msg) {
				if(msg.users.length == 0) {
					document.getElementById("listing_self").innerHTML = '';
					next_page_exist = false;
				} else {
					current_page++;
				}
			},
			error: function() {
				next_page_exist = false;
			},
			async: false
		});
		
//			console.log('end'+current_page);
	}
	$("#listing_self").empty();
	for(var i = 0; i < current_page; i++)
		if(i == page)
			$("#listing_self").append('<button style="background-color: #f44336;" disabled="disabled">'+i+'</button>&nbsp;');
		else
			$("#listing_self").append('<button style="background-color: #008CBA;" href="#" onclick="setPageAndUpdateUsers('+i+')">'+i+'</button>&nbsp;');
		if (page >= 0) 
			next_available = true;
		if (page >= current_page-1)
			next_available = false;
}
$(function () {
	page = 0;
});
*/