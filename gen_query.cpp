#include <iostream>
#include <fstream>
#include <sstream>
#include <cstdio>
#include <cstring>
#include <memory.h>
#include <cmath>
#include <iomanip>
#include <pthread.h>
#include <semaphore.h>

#include <vector>
#include <queue>
#include <deque>
#include <stack>
#include <set>
#include <map>
#include <unordered_set>
#include <unordered_map>
#include <list>
#include <bitset>
#include <algorithm>
#include <functional>

#define ABS(a) ((a)<0?(-(a)):(a))
#define SIGN(a) (((a)>0)-((a)<0))
#define SQR(a) ((a)*(a))
#define MAX(a,b) ((a)>(b)?(a):(b))
#define MIN(a,b) ((a)<(b)?(a):(b))

#define PI (3.1415926535897932384626433832795)
#define INF (2147483647)
#define LLINF (9223372036854775807LL)
#define INF2 (1073741823)
#define EPS (0.00000001)

#define MOD (1000000007)

#define y1 stupid_cmath
#define y0 stupid_cmath_too

using namespace std;

typedef long long LL;
template<typename T1,typename T2> ostream& operator<<(ostream &O,pair<T1,T2> &t) {return O<<"("<<t.first<<","<<t.second<<")";}
template<typename T> ostream& operator<<(ostream &O,vector<T> &t){for(int _=0;_<(int)t.size();++_)O<<t[_]<<" ";return O; }
void dout(){cout<<endl;} template<typename Head, typename... Tail> void dout(Head H, Tail... T){cout<<H<<" "; dout(T...);}

string logic_algebra(string);
string read_program(ifstream &in);

int main()
{
	//ios_base::sync_with_stdio(0);

	//freopen("input.txt", "r", stdin);
	//freopen("output.txt", "w", stdout);

	string file_name;
	cout << "Enter input file name: ";
	cin >> file_name;
	if(file_name == "") file_name = "input.txt";
	ifstream in(file_name);

	cout << "Enter output file name: ";
	cin >> file_name;
	if(file_name == "") file_name = "output.txt";
	ofstream out(file_name);

	string str;
	int cnt = 0;
	while(in >> str){
		if(str == "end") break;
		if(str != "new"){
			cout << "Error!";
			break;
		}
		int th, ticket;
		string ans;
		in >> th >> ticket >> ans;
		cnt++;
		cout << "Read question " << cnt << " for " << th << " theme.\n";

		char s[100501];
		in.getline(s, 100500);
		string qs = "";
		bool flag_list = false;
		do{
			in.getline(s, 100500);
			//cout << "===" << s << "===\n";
			if(!strcmp(s, "program")){
				qs += read_program(in);
				continue ;
			}
			if(!strcmp(s, "end")){

				if(flag_list) qs += "</ol>";

				stringstream ss;
				ss << "INSERT INTO `ege_new` (`Num`, `Question`, `Answer`, `Ticket`) VALUES (";
				ss << "\"" << th << "\", ";
				ss << "\"" << qs << "\", ";
				ss << "\"" << ans << "\", ";
				ss << ticket << ");\n";

				ss.getline(s, 100500);
				out << s << endl;

				break;
			}

			string q1(s);
			q1 = logic_algebra(q1);
			if(q1[0] == '-'){
				if(!flag_list) qs += "<ol style='margin-left:40px'>", flag_list = true;
				qs += "<li>" + q1.substr(1) + "</li>";
			}else{
				if(flag_list) qs += "</ol>", flag_list = false;
				qs += "<p>" + q1 + "</p>";
			}

		}while(true);
	}

	return 0;
}

string logic_algebra(string str){

	stringstream ss(str);
	string res = "";
	while(ss >> str){
		if(str == "and") str = "&and; "; else
		if(str ==  "or") str =  "&or; "; else
		if(str == "not") str =  "&not;"; else
		str = str + " ";

		res += str;
	}
	return res;
}

string read_program(ifstream &in){

	string res = "";
	res += "<table class='q_table'><tr><th>Паскаль</th></tr><tr><td class='q_code'>";
	char s[100501];
	while(true){
		in.getline(s, 100500);
		if(!strcmp(s, "===")) break;

		for(int i=0; s[i]; ++i){
			if(s[i] == ' ') res += "&nbsp;"; else
			if(s[i] == '<') res += "&lt;"; else
			if(s[i] == '>') res += "&gt;"; else
			res += s[i];
		}
		res += "<br>";
	}
	res += "</td></tr><tr><th>Си</th></tr><tr><td class='q_code'>";
	while(true){
		in.getline(s, 100500);
		if(!strcmp(s, "===")) break;

		for(int i=0; s[i]; ++i){
			if(s[i] == ' ') res += "&nbsp;"; else
			if(s[i] == '<') res += "&lt;"; else
			if(s[i] == '>') res += "&gt;"; else
			res += s[i];
		}
		res += "<br>";
	}
	res += "</td></tr></table>";

	return res;
}
