function Question() {
	this.id;
	//this.type;
	this.title;
	this.text;
	//this.ans1;
	//this.ans2;
	//this.ans3;
	//this.ans4;
	this.answer;
	this.output;

	this.print = function() {

		var div = document.getElementById("div_question");
		var s = "";

		s += "<span class='q_title'>"+this.title+"</span>";
		s += "<span class='q_text'>"+this.text+"</span>";

		//if(this.type == "A"){

			//if(this.output == 1)
				//s += "<span class='q_ans'><span><span class='q_ans1a'>1</span><span class='q_ans2a'>"+this.ans1+"</span></span></span>";
			//else
				//s += "<span class='q_ans'><span onclick='put_ans(1);'><span class='q_ans1'>1</span><span class='q_ans2'>"+this.ans1+"</span></span></span>";

			//if(this.output == 2)
				//s += "<span class='q_ans'><span><span class='q_ans1a'>2</span><span class='q_ans2a'>"+this.ans2+"</span></span></span>";
			//else
				//s += "<span class='q_ans'><span onclick='put_ans(2);'><span class='q_ans1'>2</span><span class='q_ans2'>"+this.ans2+"</span></span></span>";

			//if(this.output == 3)
				//s += "<span class='q_ans'><span><span class='q_ans1a'>3</span><span class='q_ans2a'>"+this.ans3+"</span></span></span>";
			//else
				//s += "<span class='q_ans'><span onclick='put_ans(3);'><span class='q_ans1'>3</span><span class='q_ans2'>"+this.ans3+"</span></span></span>";

			//if(this.output == 4)
				//s += "<span class='q_ans'><span><span class='q_ans1a'>4</span><span class='q_ans2a'>"+this.ans4+"</span></span></span>";
			//else
				//s += "<span class='q_ans'><span onclick='put_ans(4);'><span class='q_ans1'>4</span><span class='q_ans2'>"+this.ans4+"</span></span></span>";

		//}
		//if(this.type == "B"){
		if(!flag_goto_res) {
			if(this.output == "NULL")
				s += "<input type='text' size='10' id='input_answer'>";
			else
				s += "<input type='text' size='10' id='input_answer' value='"+this.output+"'>";

			s += "<a href='#' class='button_answer' onclick='put_ans(document.getElementById(\"input_answer\").value);'>Ответить</a>";
		}else{
			s += "Ответ: ";
			if(this.output != "NULL" && this.output != "")
				s += "<span style='color:red;text-decoration:line-through'>&nbsp;"+this.output+"&nbsp;</span> ";
			s += "<span style='color:green'>"+this.answer+"</span>";
		}
		//}

		div.innerHTML = s;
	}
}

function put_ans(num) {

	questions[nav.cur].output = num;
	nav.go_next();
}
