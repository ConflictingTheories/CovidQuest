var fps = 60;
var interval = 1000 / fps;
var numSteps = 100; //Change this to set animation resolution

// For Obscuring Details
Number.prototype.round = function(p) {
    p = p || 10;
    return parseFloat(this.toFixed(p));
};

// Run on Start
$(function() {
    var checked = $(".cbox");

    checked.click(function() {
        if (checked.prop("checked")) {
            $(".add").text("Hit Enter to Submit");
        }

        if (!checked.prop("checked")) {
            $(".message").val("");
            $(".add").text("Enter Code");
        }
    });

    initMap().then(([map, bounds]) => {

        function zoomCalgary() {
            let calgaryPosition = new google.maps.LatLng(51.043048, -114.061094);
            fps = 60;
            interval = 1000 / fps;
            numSteps = 400; //Change this to set animation resolution

            map.setZoom(16);
            map.panTo(calgaryPosition);
        }

        function zoomToronto() {
            let calgaryPosition = new google.maps.LatLng(44.1, -79);
            fps = 60;
            interval = 1000 / fps;
            numSteps = 1000; //Change this to set animation resolution

            map.setZoom(9);
            map.panTo(calgaryPosition);
        }

        function zoomVancouver() {
            let calgaryPosition = new google.maps.LatLng(49.2, -123);
            fps = 60;
            interval = 1000 / fps;
            numSteps = 1000; //Change this to set animation resolution

            map.setZoom(9);
            map.panTo(calgaryPosition);
        }

        function zoomCanada() {
            fps = 60;
            interval = 1000 / fps;
            numSteps = 100; //Change this to set animation resolution
            map.fitBounds(bounds);
        }

        function enterCode() {
            showCodeModal({}, "");
        }

        function showDecoder() {
            showDecodeModal({}, "");
        }

        $('.zoomCalgary').on('click', zoomCalgary);
        $('.zoomCanada').on('click', zoomCanada);
        $('.zoomVancouver').on('click', zoomVancouver);
        $('.zoomToronto').on('click', zoomToronto);
        $('.showDecoder').on('click', showDecoder);
        $('.enterCode').on('click', enterCode);
    });

});

// Initialize Map
function initMap() {
    return new Promise((resolve, reject) => {
        let pos = new google.maps.LatLng(51, -114);
        var map = null;
        let promiseList = [fetchHideouts(), fetchSpies(), fetchNews()];
        Promise.all(promiseList)
            .then((data) => {
                // Data Sets
                var news = data[2];
                var spies = data[1];
                var hideouts = data[0];

                // Update Online Counts
                $('#hideoutCnt').html(hideouts.length);
                $('#spyCnt').html(spies.length);
                $('#newsCnt').html(news.length);

                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 6,
                    center: pos,
                    disableDefaultUI: true,
                    styles: [{
                        "stylers": [{
                            "hue": "#00eeff"
                        }, {
                            "invert_lightness": true
                        }]
                    }, {
                        "featureType": "road",
                        "stylers": [{
                            "hue": "#ff6e00"
                        }, {
                            "lightness": -11
                        }, {
                            "gamma": 2
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "labels",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "road.local",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "water",
                        "stylers": [{
                            "hue": "#0099ff"
                        }, {
                            "saturation": 100
                        }, {
                            "lightness": -83
                        }, {
                            "gamma": 1.96
                        }]
                    }]
                });
                var bounds = new google.maps.LatLngBounds();

                let k = -1;
                let nw = news.length
                while (++k < nw) {

                    // news
                    let singleNews = news[k];
                    let users = [];
                    let newLat = parseFloat(singleNews.latLng.split(',')[0]);
                    let newLng = parseFloat(singleNews.latLng.split(',')[1]);
                    let newPost = singleNews.postal_code;

                    let newsPos = new google.maps.LatLng(newLat, newLng);
                    var news_ = {
                        pos: newsPos,
                        name: singleNews.name,
                        type: singleNews.type
                    };
                    bounds.extend(newsPos);
                    addNewsMarker(map, news_);
                }


                // Add hideouts to Map + Spys
                let j = -1;
                let bus = hideouts.length
                while (++j < bus) {

                    // hideouts
                    let singleHideout = hideouts[j];
                    let users = [];
                    let busLat = parseFloat(singleHideout.latLng.split(',')[0]);
                    let busLng = parseFloat(singleHideout.latLng.split(',')[1]);
                    let busPost = singleHideout.postal_code;

                    let busPos = new google.maps.LatLng(busLat, busLng);
                    var hideout = {
                        pos: busPos,
                        name: singleHideout.name,
                        type: singleHideout.type
                    };


                    let l = -1;
                    let ll = spies.length
                    while (++l < ll) {

                        let spy = spies[l];
                        let userLat = parseFloat(spy.latLng.split(',')[0]);
                        let userLng = parseFloat(spy.latLng.split(',')[1]);
                        let userPos = new google.maps.LatLng(userLat, userLng);
                        var user = {
                            pos: userPos,
                            lat: userLat,
                            lng: userLng,
                            name: spy.name,
                            options: spy.options,
                            skills: spy.skills,
                        };
                        users.push(user);
                    }
                    pairMarkers(map, users, hideout, true, bounds)
                }
                // Redraw Map to Fit
                map.fitBounds(bounds);
                resolve([map, bounds]);
            });
    });
}
// Fetch hideouts
function fetchNews() {
    return new Promise((resolve, reject) => {
        // Load hideouts
        $.ajax({
            url: '/news.json',
            method: 'GET',
            success: function(data) {
                if (typeof data === "string") {
                    resolve(JSON.parse(data))
                } else {
                    resolve(data);
                }
            }
        });
    });
}

// Fetch hideouts
function fetchHideouts() {
    return new Promise((resolve, reject) => {
        // Load hideouts
        $.ajax({
            url: '/hideouts.json',
            method: 'GET',
            success: function(data) {
                if (typeof data === "string") {
                    resolve(JSON.parse(data))
                } else {
                    resolve(data);
                }
            }
        });
    });
}

// Fetch Spies
function fetchSpies() {
    return new Promise((resolve, reject) => {
        // Load Users
        $.ajax({
            url: '/spies.json',
            method: 'GET',
            success: function(data) {
                if (typeof data === "string") {
                    resolve(JSON.parse(data))
                } else {
                    resolve(data);
                }
            }
        });
    });
}