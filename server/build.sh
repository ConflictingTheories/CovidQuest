#!/bin/bash

cd public

uglifyjs javascripts/map/*.js > covid-pack.min.js
# uglifyjs javascripts/libs/*.js > covid-libs.min.js
uglifyjs javascripts/*.js > covid-min.min.js

# Move Data
# sudo cp -R ./data /srv/http/data

# # Move to Server Directory
# sudo cp -R ./cron /srv/http
# sudo cp -R ./images /srv/http
# sudo cp -R ./javascripts /srv/http
# sudo cp -R ./stylesheets /srv/http

# sudo cp ./* /srv/http
