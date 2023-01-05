
fun choose 0 _ = [nil]
|choose _ nil = nil
|choose x (y::ys) = choose x ys @ map (fn z=>y::z)(choose (x-1) ys);
	



choose 2 [1,2,3];
	