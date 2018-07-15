# SETTING UP

# - Install exiftool https://www.sno.phy.queensu.ca/~phil/exiftool/install.html#OSX
# - append in the /input/img folder the images you want to treat

# CODE

# Go trough all the images and extract GPS coordinates in a files called temp.json
exiftool -filename -gpslatitude -gpslongitude -n -T -j ./input/img > ./temp.json

# rename all the images with GPS names
node ./rename/rename.js
