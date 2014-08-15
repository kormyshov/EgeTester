function press_to_2014() {
	document.getElementById("div_first_step").style.display = "none";
	document.getElementById("div_menu2014").style.display = "block";
}

function press2014_to_main() {
	document.getElementById("div_menu2014").style.display = "none";
	document.getElementById("div_first_step").style.display = "block";
}

function press_to_theme() {
	document.getElementById("div_first_step").style.display = "none";
	document.getElementById("div_menutheme").style.display = "block";
}

function presstheme_to_main() {
	document.getElementById("div_menutheme").style.display = "none";
	document.getElementById("div_first_step").style.display = "block";
}

function press_to_ticket(theme) {

	var N = 15;
	var s = "";

	for(var i=0; i<N; ++i){
		s += "<a href='#' class='buttonticket'>Билет "+(i+1)+"</a>\n";
		if(i % 3 == 2) s += "<br>";
	}
	if(N % 3) s += "<br>";

	s += "<a href='#' class='button_first' id='button_to_main' style='margin-left:55px;' onclick='pressticket_to_theme()'>Назад к выбору темы</a>";

	var div_ticket = document.getElementById("div_ticket");
	div_ticket.innerHTML = s;
	if(N < 22) div_ticket.style.paddingTop = "1px";
	if(N < 19) div_ticket.style.paddingTop = "25px";
	if(N < 16) div_ticket.style.paddingTop = "50px";
	if(N < 13) div_ticket.style.paddingTop = "80px";
	if(N < 10) div_ticket.style.paddingTop = "105px";
	if(N < 7)  div_ticket.style.paddingTop = "130px";
	if(N < 4)  div_ticket.style.paddingTop = "150px";

	document.getElementById("span_theme").innerHTML = "" + theme;
	document.getElementById("div_menutheme").style.display = "none";
	document.getElementById("div_menuticket").style.display = "block";
}

function pressticket_to_theme() {
	document.getElementById("div_menuticket").style.display = "none";
	document.getElementById("div_menutheme").style.display = "block";
}
