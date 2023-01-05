fun cut _ [] = []
|cut x (y::ys) =
     if y < x
     then
     	cut x ys
	else
		y::(cut x ys);
cut 2 [1, 2, 3, 4, 5];