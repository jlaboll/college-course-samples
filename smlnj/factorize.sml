fun factorize 0 = [0]
|factorize 1 = [1]
|factorize x =
	   let
	   fun factor x y =
	       if
	       x = y
	       then
	       [x]
	       else
	       if
	       x mod y = 0
	       then
	       y::factor x (y+1)
	       else
	       factor x (y+1)
	       

	   in
		factor x 1
	   end;

factorize 12;
		   