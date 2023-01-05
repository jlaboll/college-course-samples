fun union (nil,nil) = nil
|union (nil,ys) = ys
|union (xs, nil) = xs
|union (x::xs,y::ys) =
       	if
		x <> y
	then
		x::union(xs,y::ys)
	else
		y::union(xs,ys);
		

union([1,2,3],[3,4,5,6]);
	