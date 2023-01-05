datatype 'a tree = Empty| Node of 'a tree * 'a * 'a tree;
	fun makeBST [] f = Empty
	|makeBST xs f =
		 let
			
			fun add Empty y = (Node(Empty, y, Empty))
			|add (Node(left, x, right)) y=
			if
			f(x,y)
			then
			add left y
			else
			add right y
			
			
			
			
			fun build nil = Empty
			|build (x::xs) =
			if
			null xs
			then
			add Empty x
			else
			add (build xs) x
		in
			build xs
		end;
fun searchBST Empty f y = false
|searchBST (Node(left,x,right)) f y =
	   if
	   x=y
	   then
	   true
	   else if
	   	f(x,y)
		then
		searchBST left f y
	   	else
		searchBST right f y;

fun g (x, y) = x>y;
searchBST (makeBST [1,2,3] g) g 2;