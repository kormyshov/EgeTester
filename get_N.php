<?php

	include("dblogin.php");

	$q = htmlspecialchars($_REQUEST['question']);
	$t = "ege_new";
	//if($q[0] == 'B') $t = "ege_B";

	$r = mysql_query("select max(Ticket) as Ticket from ".$t." where Num='".$q."'");

	while($row = mysql_fetch_assoc($r))
	{
		echo $row['Ticket'];
	}

?>
