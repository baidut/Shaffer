function [ ii_image ] = ying2016(image, bias, inv)
%Implement the algorithm proposed by Zhenqiang Ying et al. in MM2016 
%Paper:
% A Novel Shadow-Free Feature Extractor for Real-Time Road Detection
%
% ii_image = rgb2ii.ying2016(image, alpha, inv)
% where
% image : color image data
% bias : a camera-dependent parameter
% inv   : perform image inversion (a=1-a) if inv is true (default: false)

image = im2double(image);

G = im2double(rgb(:,:,2));
B = im2double(rgb(:,:,3));
ii_image =  2 - (G+bias)./(B+eps);

% matlab will do following when doing *imshow*
ii_image(ii_image<0) = 0;
ii_image(ii_image>1) = 1;

if nargin>2 && inv % default: do not inverse
	ii_image = 1-ii_image;
end