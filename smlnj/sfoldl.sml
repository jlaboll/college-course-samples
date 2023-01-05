fun sfoldl f a [] = a
|sfoldl f a (x::xs) = sfoldl f (f x a) xs;

