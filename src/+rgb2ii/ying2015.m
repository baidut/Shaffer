function [ ii_image ] = ying2015(image, inv)
%Implement the algorithm proposed by Zhenqiang Ying et al. in ISM2015 
%Paper:
% An Illumination-Robust Approach for Feature-Based Road Detection
%
% ii_image = rgb2ii.ying2015(image, alpha, inv)
% where
% image : color image data
% inv   : perform image inversion (a=1-a) if inv is true (default: false)

image = im2double(image);

B=image(:,:,3);
RGB_max = max(I, [],3);
ii_image = (RGB_max - B) ./ (RGB_max + eps); % S' feature

if nargin>1 && inv % default: do not inverse
	ii_image = 1-ii_image;
end