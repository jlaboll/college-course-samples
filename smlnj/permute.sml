
fun permute nil = [[]]
|permute (x::xs) =
	 let
	 fun turn i [] = [[i]]
    |turn i (h::tail) = (i::h::tail)::(List.map (fn z=> h::z) (turn i tail))
	 in
		List.concat (List.map (fn z=> turn x z) (permute xs))
		end;

permute [1,2,3];
		