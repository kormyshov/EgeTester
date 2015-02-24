<?php

	include("dblogin.php");

	$type = htmlspecialchars($_REQUEST['type']);
	$theme = htmlspecialchars($_REQUEST['theme']);
	$ticket = htmlspecialchars($_REQUEST['ticket']);

	//$type = "exam";
	//$theme = "A1";
	//$ticket = "1";

	$i = 0;

	function print_result($r) {

		global $type, $theme, $ticket, $i;

		while($row = mysql_fetch_assoc($r))
		{

			echo "questions[".$i."] = new Question();\n";
			//echo "questions[".$i."].type = \"".$row['Num'][0]."\";\n";
			echo "questions[".$i."].id = \"".$row['id']."\";\n";
			if($type == "theme")
				echo "questions[".$i."].title = \"".($i+1)."\";\n";
			else
				echo "questions[".$i."].title = \"".$row['Num']."\";\n";
			echo "questions[".$i."].text = \"".iconv('Windows-1251', 'UTF-8', $row['Question'])."\";\n";
			//if($row['Num'][0] == 'A'){
				//$cur = 1;
				//for($j = 0; $j < 10; $j++){
					//$a = mt_rand(1, 4);
					//$b = mt_rand(1, 4);
					//$tmp = $row["Ans".$a];
					//$row["Ans".$a] = $row["Ans".$b];
					//$row["Ans".$b] = $tmp;
					//if($cur == $a) $cur = $b;
					//else if($cur == $b) $cur = $a;
				//}
				//echo "questions[".$i."].ans1 = \"".iconv('Windows-1251', 'UTF-8', $row['Ans1'])."\";\n";
				//echo "questions[".$i."].ans2 = \"".iconv('Windows-1251', 'UTF-8', $row['Ans2'])."\";\n";
				//echo "questions[".$i."].ans3 = \"".iconv('Windows-1251', 'UTF-8', $row['Ans3'])."\";\n";
				//echo "questions[".$i."].ans4 = \"".iconv('Windows-1251', 'UTF-8', $row['Ans4'])."\";\n";
				//echo "questions[".$i."].answer = \"".$cur."\";\n";
			//}else{
				//echo "questions[".$i."].ans1 = \"\";\n";
				//echo "questions[".$i."].ans2 = \"\";\n";
				//echo "questions[".$i."].ans3 = \"\";\n";
				//echo "questions[".$i."].ans4 = \"\";\n";
				echo "questions[".$i."].answer = \"".iconv('Windows-1251', 'UTF-8', $row['Answer'])."\";\n";
			//}
			echo "questions[".$i."].output = \"NULL\";\n";

			$i++;
		}

	}

	echo "questions = new Array();\n";

	if($type == "theme"){
		$t = "ege_new";
		//if($theme[0] == 'B') $t = "ege_B";

		$r = mysql_query("select * from ".$t." where Num='".$theme."' and Ticket=".$ticket);

		print_result($r);
	}
	if($type == "2014"){
		$r = mysql_query("select * from ege_A where Ticket=".$ticket." group by Num order by lpad(Num, 3, '0')");
		print_result($r);
		$r = mysql_query("select * from ege_B where Ticket=".$ticket." group by Num order by lpad(Num, 3, '0')");
		print_result($r);
	}
	if($type == "exam"){
		$query = array();
		$r = mysql_query("SELECT Num, count(id) as 'count' FROM ege_new group by Num order by lpad(Num, 3, '0')");
		while($row = mysql_fetch_assoc($r))
		{
			$query[] = "(select * from ege_new where Num='".$row['Num']."' limit ".mt_rand(0, $row['count']-1).", 1)";
		}
		$query = implode(" UNION ", $query);
		$r = mysql_query($query);
		print_result($r);

		//$query = array();
		//$r = mysql_query("SELECT Num, count(id) as count FROM ege_B group by Num order by lpad(Num, 3, '0')");
		//while($row = mysql_fetch_assoc($r))
		//{
			//$query[] = "(select * from ege_B where Num='".$row['Num']."' limit ".mt_rand(0, $row['count']-1).", 1)";
		//}
		//$query = implode(" UNION ", $query);
		//$r = mysql_query($query);
		//print_result($r);
	}

?>
