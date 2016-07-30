function ii_image = maddern2014(image, alpha, inv)
%Implement the algorithm proposed by Will Maddern et al. in ICRA2014 
%Paper:
% Illumination Invariant Imaging: Applications in Robust Vision-based
% Localisation, Mapping and Classification for Autonomous Vehicles
%
% ii_image = rgb2ii.maddern2014(image, alpha, inv)
% where
% image : color image data
% alpha : a camera-dependent parameter ranged in 0-1
% inv   : perform image inversion (a=1-a) if inv is true (default: false)

image = im2double(image);

ii_image = 0.5 + log(image(:,:,2)) - ...
    alpha*log(image(:,:,3)) - (1-alpha)*log(image(:,:,1));

if nargin>2 && inv % default: do not inverse
	ii_image = 1-ii_image;
end

end