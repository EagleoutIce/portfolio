latexmk -pdf
magick -density 300 favicon.pdf -quality 90 favicon.png
# update in public/favicon.ico and logo192.png as well as logo512.png
cp favicon.png ../public/favicon.ico
magick -density 300 favicon.pdf -resize 192x192 -quality 90 ../public/logo192.png
magick -density 300 favicon.pdf -resize 512x512 -quality 90 ../public/logo512.png