fun powerset [] = [[]]
|powerset xs =
	  let
		fun f 0 _ = [[]]
		|f _ nil = nil
		|f x (y::ys) =
		   f (x-1) (ys@[y]) @ map (fn z=> y::z) (f (x-1) ys)

	 in
		f (length xs) xs
	end;
powerset [1,2,3];