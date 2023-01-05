fun product (nil,nil) = 0
|product (x::xs, nil) = x + product (xs,nil)
|product (nil, y::ys) = y + product (nil, ys)
|product (x::xs, y::ys) = x*y + product(xs,ys);

product([1,2,3],[4,5,6]);