function Navigate() {

	this.count;
	this.cur;
	this.time;
	this.timer_id;

	this.init = function() {

		this.count = questions.length;
		this.cur = 0;
		this.time = 0;
		if(!flag_goto_res)
			this.timer_id = setInterval(function(){ nav.time++;nav.print(); }, 1000);
	}

	this.print = function() {

		var l = this.cur - 5;
		if(l < 0) l = 0;
		var r = l + 9;
		if(r > this.count) r = this.count;

		var s = "";
		for(var i=l; i<r; ++i){

			if(i == this.cur)
				s += "<a href='#' class='buttonnav' style='background: #dcdcdc linear-gradient(#fff, #dcdcdc);'>"+questions[i].title+"</a>";
			else
				s += "<a href='#' class='buttonnav' onclick='nav.go_to("+i+")'>"+questions[i].title+"</a>";
		}
		s += "<a href='#' class='buttonnav' style='float:right;width:7em' onclick='pressboard_to_end()'>Завершить</a>";
		if(!flag_goto_res) {
			s += "<span style='float:right;margin-right:8px;margin-top:3px;'>";
			var hours = this.time/3600|0;
			var mins = (this.time/60|0)%60;
			var secs = this.time%60;
			s += ""+hours+":";
			if(mins<10) s += "0";
			s += ""+mins+":";
			if(secs<10) s += "0";
			s += ""+secs;
			s += "</span>";
		}

		document.getElementById("div_nav").innerHTML = s;
	}

	this.go_to = function(num) {

		this.cur = num;
		this.print();
		questions[num].print();
	}

	this.go_next = function() {

		if(this.cur + 1 < this.count) this.cur++;
		questions[this.cur].print();
		this.print();
	}
}
