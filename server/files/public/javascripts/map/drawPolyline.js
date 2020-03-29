// Drawline Between Users and Hideout
function drawPolyLine(map, markerP1, markerP2) {
    var now;
    var then = Date.now();
    var delta;
    var step = 0;

    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 3
    };

    var line = new google.maps.Polyline({
        path: [markerP1, markerP2],
        strokeColor: "#EE4A22",
        strokeOpacity: 1,
        strokeWeight: 2,
        geodesic: true, //set to false if you want straight line instead of arc
        map: map,
    });

    // Animate
    function draw() {

        requestAnimationFrame(draw);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            // update time            
            then = now - (delta % interval);
            // Draw
            step += 1;
            if (step > numSteps) {
                line.setPath([markerP1, markerP1]);
                step = 0;
            } else {
                var are_we_there_yet = google.maps.geometry.spherical.interpolate(markerP1, markerP2, step / numSteps);
                line.setPath([markerP1, are_we_there_yet]);
            }
        }
    }

    draw();
}