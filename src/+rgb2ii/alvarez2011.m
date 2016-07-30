function ii_image = alvarez2011(image, alpha, inv)
%Implement the algorithm proposed by Alvarez and Lopez in TITS2011
%Paper:
%  Road detection based on illuminant invariance.
%
% ii_image = rgb2ii.alvarez2011(image, alpha, inv)
% where
% image : color image data
% alpha : a camera-dependent parameter ranged in 0-1
% inv   : perform image inversion (a=1-a) if inv is true (default: false)

	ii_image = GetInvariantImage(image, alpha*360, 0, 1); 
	% please add *GetInvariant* folder to your path to access the function 
	% *GetInvariantImage*
	
	if nargin>2 && inv
		ii_image = 1- ii_image;
	end
end