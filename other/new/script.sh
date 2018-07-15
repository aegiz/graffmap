#############
### SETUP ###
#############

# - Install exiftool https://www.sno.phy.queensu.ca/~phil/exiftool/install.html#OSX
# - Install: $ npm install gm -g
# - Install: $ npm install uuid -g
# - Install: $ npm install sort-json -g 
# - Install: $ npm install jpeg-autorotate -g
# - Install: $ npm install sharp -g
# Finally, follow the instruction in the file generateKeywords to install Google cloud API

# - append in the /input/img folder the images you want to treat

############
### CODE ###
############

# Go trough all the images and extract GPS coordinates in a files called temp.json
exiftool -filename -gpslatitude -gpslongitude -datetimeoriginal -n -T -j -Orientation -n ./input/img > ./output/out.json

if [ -s ./output/out.json ] 
then
	
	# Clean exif data
	jpeg-autorotate ./input/img/*.jpg
	jpeg-autorotate ./input/img/*.png
	exiftool -all= ./input/img

	# Clean output folder
	rm -fr ./output/original
	rm -fr ./output/thumbnail
	rm -fr ./output/mini
	rm -fr ./output/pin
	mkdir ./output/original
	mkdir ./output/thumbnail
	mkdir ./output/mini
	mkdir ./output/pin

	# Generate original images (and patch out.jon with the right uuid name)
	node ./processImages/generateOriginals.js

	# Generate thumbnail images
	node ./processImages/generateThumbnails.js

	# Generate mini images
	node ./processImages/generateMinis.js

	# Generate pins images
	node ./processImages/generatePins.js

	# Resize pins images
	node ./processImages/resizePins.js

	# Generate keywords (from API vision)
	# node ./keywords/generateKeywords.js	

	# Update and clean the out.json file
	node ./clean/cleanJson.js
	sort-json ./output/out.json

	echo "DONE! don't forget to fillout GPS coordinates for the photos which don't have any + complete the image2 image3!"

else
     echo "Error file: output.json is empty. Are they images in the input?"
fi

