// Pair Users to Hideout
function pairMarkers(map, users, business, drawLine, bounds) {
    // Set Bounds Object
    bounds.extend(business.pos);

    // Build Hideout
    let businessMarker = addHideoutMarker(map, business);

    let i = -1;
    while (++i < users.length) {

        let user = users[i];
        bounds.extend(user.pos);

        let userMarker = addUserMarker(map, user, false);

        if (drawLine) {
            // drawPolyline(map, userMarker.position, businessMarker.position);
            drawPolyLine(map, userMarker.position, businessMarker.position);
        }

    }

}