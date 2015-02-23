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

function pressend_to_main() {
	document.getElementById("div_menuend").style.display = "none";
	document.getElementById("div_first_step").style.display = "block";
}

var flag_goto_res = false;
function pressend_to_res() {
	document.getElementById("div_menuend").style.display = "none";

	flag_goto_res = true;
	var mt = questions, j=0;
	questions = new Array();
	for(var i=0; i<mt.length; ++i)
		if(mt[i].answer != mt[i].output)
			questions[j++] = mt[i];
	
	document.getElementById("div_board").style.display = "block";

	nav.init();
	nav.print();
	questions[0].print();
}

function press_to_ticket(theme) {

	document.getElementById("div_menutheme").style.display = "none";
	document.getElementById("div_loadwin").style.display = "block";
	$.ajax({
		type: "get",
		url: "get_N.php",
		data: "question="+theme,
		success: function( data ) {
			var N = parseInt(data);

			var s = "";

			for(var i=0; i<N; ++i){
				s += "<a href='#' class='buttonticket' onclick='press_to_board(\"theme\", \""+theme+"\", "+(i+1)+")'>Билет "+(i+1)+"</a>\n";
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

			document.getElementById("div_loadwin").style.display = "none";
			document.getElementById("span_theme").innerHTML = "" + theme;
			document.getElementById("div_menuticket").style.display = "block";
		},
		error: function(a, b, c) {alert("Error "+b);}
	});

}

function pressticket_to_theme() {
	document.getElementById("div_menuticket").style.display = "none";
	document.getElementById("div_menutheme").style.display = "block";
}

function pressboard_to_end() {

	if(flag_goto_res) {
		document.getElementById("div_board").style.display = "none";
		document.getElementById("div_first_step").style.display = "block";
		return ;
	}

	var s = "";
	var ok = 0, fail = 0;
	for(var i = 0; i < questions.length; ++i)
		if(questions[i].answer == questions[i].output) ok++;
		else fail++;

	s += "<div style='padding-left:59px;padding-top:30px'>";
	s += "<span style='color:green'>Правильных ответов: "+ok+"</span><br>";
	s += "<span style='color:red'>Неправильных ответов: "+fail+"</span><br>";
	s += "<span>Всего вопросов: "+questions.length+"</span><br>";
	s += "<span>Затраченное время: ";
	var hours = nav.time/3600|0;
	var mins = (nav.time/60|0)%60;
	var secs = nav.time%60;
	s += ""+hours+":";
	if(mins<10) s += "0";
	s += ""+mins+":";
	if(secs<10) s += "0";
	s += ""+secs;
	s += "</span><br><br>";
	s += "</div>";
	document.getElementById("span_res").innerHTML = s;

	if(fail>0) document.getElementById("button_to_res").style.display = "block";
	else document.getElementById("button_to_res").style.display = "none";

	document.getElementById("div_board").style.display = "none";
	document.getElementById("div_menuend").style.display = "block";

	clearInterval(nav.timer_id);
}

var nav = new Navigate();
var questions;

//function alertObj(obj) { 
	//var str = ""; 
	//for(k in obj) { 
		//str += k+": "+ obj[k]+"\r\n"; 
	//} 
	//alert(str); 
//} 

function press_to_board(type, theme, ticket) {
	document.getElementById("div_menuticket").style.display = "none";
	document.getElementById("div_menu2014").style.display = "none";
	document.getElementById("div_first_step").style.display = "none";

	document.getElementById("div_loadwin").style.display = "block";

	//sample_test();
	$.ajax({
		type: "get",
		url: "get_Q.php",
		data: "type="+type+"&theme="+theme+"&ticket="+ticket,
		success: function( data ) {

			eval(data);
			flag_goto_res = false;
			document.getElementById("div_loadwin").style.display = "none";
			document.getElementById("div_board").style.display = "block";

			nav.init();
			nav.print();
			questions[0].print();

		},
		error: function(a, b, c) {alert("Error "+b);}
	});

}

function sample_test() {

	questions = new Array();

	questions[0] = new Question();
	questions[0].type = "A";
	questions[0].title = "1";
	questions[0].text = "<table class='q_table'><tr><th>&nbsp;</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr><th>A</th><td class='grey'>&nbsp;</td><td>&nbsp;</td><td>3</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><tr></tr><tr><th>B</th><td>&nbsp;</td><td class='grey'>&nbsp;</td><td>9</td><td>&nbsp;</td><td>4</td><td>&nbsp;</td></tr><tr><th>C</th><td>3</td><td>9</td><td class='grey'>&nbsp;</td><td>3</td><td>8</td><td>&nbsp;</td></tr><tr><th>D</th><td>&nbsp;</td><td>&nbsp;</td><td>3</td><td class='grey'>&nbsp;</td><td>2</td><td>&nbsp;</td></tr><tr><th>E</th><td>&nbsp;</td><td>4</td><td>8</td><td>2</td><td class='grey'>&nbsp;</td><td>7</td></tr><tr><th>F</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>7</td><td class='grey'>&nbsp;</td></tr></table><p>Между населёнными пунктами A, B, C, D, E, F построены дороги, протяжённость которых приведена в таблице. (Отсутствие числа в таблице означает, что прямой дороги между пунктами нет.)</p><p>Определите длину кратчайшего пути между пунктами A и F (при условии, что передвигаться можно только по построенным дорогам).</p>";
	questions[0].ans1 = "11";
	questions[0].ans2 = "13";
	questions[0].ans3 = "15";
	questions[0].ans4 = "17";
	questions[0].answer = "2";
	questions[0].output = "NULL";

	questions[1] = new Question();
	questions[1].type = "A";
	questions[1].title = "A1";
	questions[1].text = "<p>Сколько единиц в двоичной записи десятичного числа 514?</p><br><br>";
	questions[1].ans1 = "2";
	questions[1].ans2 = "3";
	questions[1].ans3 = "4";
	questions[1].ans4 = "5";
	questions[1].answer = "1";
	questions[1].output = "NULL";
	
	questions[2] = new Question();
	questions[2].type = "B";
	questions[2].title = "B15";
	questions[2].text = "<p>Сколько существует различных наборов значений логических переменных x1, x2, x3, x4, x5, y1, y2, y3, y4, y5, которые удовлетворяют всем перечисленным ниже условиям?</p>(x1&rarr;x2)&and;(x2&rarr;x3)&and;(x3&rarr;x4)&and;(x4&rarr;x5)=1<br>(y1&rarr;y2)&and;(y2&rarr;y3)&and;(y3&rarr;y4)&and;(y4&rarr;y5)=1<br>x1&or;y1=1<p>В ответе <b>не нужно</b> перечислять все различные наборы значений переменных x1, x2, x3, x4, x5, y1, y2, y3, y4, y5, при которых выполнена данная система равенств. В качестве ответа Вам нужно указать количество таких наборов.</p>";
	questions[2].ans1 = "";
	questions[2].ans2 = "";
	questions[2].ans3 = "";
	questions[2].ans4 = "";
	questions[2].answer = "4021";
	questions[2].output = "NULL";
}
