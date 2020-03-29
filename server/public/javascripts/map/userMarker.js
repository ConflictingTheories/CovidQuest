const defaultUserImgs = [
    '/images/avatar1.png.jpeg',
    '/images/avatar2.png.jpeg',
    '/images/avatar3.png.jpeg',
    '/images/avatar4.png.jpeg',
    '/images/avatar5.png.jpeg',
    '/images/avatar6.png.jpeg',
    '/images/avatar7.png.jpeg',
    '/images/avatar8.png.jpeg',
    '/images/avatar9.png.jpeg'
];

// Add User Markers
function addUserMarker(map, details, pulse) {
    // Select Image
    var rd = details.options ? Math.round((Math.random() * (details.options.length - 1)) % (details.options.length - 1)) : Math.round((Math.random() * (defaultUserImgs.length - 1)) % (defaultUserImgs.length - 1));
    var image = details.img ? details.img : details.options ? defaultUserImgs[details.options[rd] - 1] : defaultUserImgs[rd];

    // Make Marker
    var marker = new UserMarker({
        position: details.pos,
        map: map,
        zIndex: 1000,
    }, image, pulse);

    // Default Animation
    google.maps.event.addListener(marker, 'click', function(e) {
        showSpyModal(details, image);
    });

    return marker;
};


UserMarker.prototype = new google.maps.OverlayView();

function UserMarker(opts, img, pulse) {
    this.imgUrl = img;
    this.pulse = pulse;
    this.setValues(opts);
}

UserMarker.prototype.draw = function() {
    var self = this;
    var div = this.div;
    var hasPulse = '';
    if (this.pulse) {
        hasPulse = '<div class="pulse"></div>'
    }
    if (!div) {
        div = this.div = $('' +
            '<div>' +
            '<div class="shadow"></div>' + hasPulse +
            '<div class="pin-wrap">' +
            '<div style="background-image:url(' + this.imgUrl + ')" class="pin"></div>' +
            '</div>' +
            '</div>' +
            '')[0];
        this.pinWrap = this.div.getElementsByClassName('pin-wrap');
        this.pin = this.div.getElementsByClassName('pin');
        this.pinShadow = this.div.getElementsByClassName('shadow');
        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
        google.maps.event.addDomListener(div, "click", function(event) {
            google.maps.event.trigger(self, "click", event);
        });
    }
    var point = this.getProjection().fromLatLngToDivPixel(this.position);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};

UserMarker.prototype.animateDrop = function() {
    dynamics.stop(this.pinWrap);
    dynamics.css(this.pinWrap, {
        'transform': 'scaleY(2) translateY(-' + $('#map').outerHeight() + 'px)',
        'opacity': '1',
    });
    dynamics.animate(this.pinWrap, {
        translateY: 0,
        scaleY: 1.0,
    }, {
        type: dynamics.gravity,
        duration: 1800,
    });

    dynamics.stop(this.pin);
    dynamics.css(this.pin, {
        'transform': 'none',
    });
    dynamics.animate(this.pin, {
        scaleY: 0.8
    }, {
        type: dynamics.bounce,
        duration: 1800,
        bounciness: 600,
    })

    dynamics.stop(this.pinShadow);
    dynamics.css(this.pinShadow, {
        'transform': 'scale(0,0)',
    });
    dynamics.animate(this.pinShadow, {
        scale: 1,
    }, {
        type: dynamics.gravity,
        duration: 1800,
    });
}

UserMarker.prototype.animateBounce = function() {
    dynamics.stop(this.pinWrap);
    dynamics.css(this.pinWrap, {
        'transform': 'none',
    });
    dynamics.animate(this.pinWrap, {
        translateY: -30
    }, {
        type: dynamics.forceWithGravity,
        bounciness: 0,
        duration: 500,
        delay: 150,
    });

    dynamics.stop(this.pin);
    dynamics.css(this.pin, {
        'transform': 'none',
    });
    dynamics.animate(this.pin, {
        scaleY: 0.8
    }, {
        type: dynamics.bounce,
        duration: 800,
        bounciness: 0,
    });
    dynamics.animate(this.pin, {
        scaleY: 0.8
    }, {
        type: dynamics.bounce,
        duration: 800,
        bounciness: 600,
        delay: 650,
    });

    dynamics.stop(this.pinShadow);
    dynamics.css(this.pinShadow, {
        'transform': 'none',
    });
    dynamics.animate(this.pinShadow, {
        scale: 0.6,
    }, {
        type: dynamics.forceWithGravity,
        bounciness: 0,
        duration: 500,
        delay: 150,
    });
}

UserMarker.prototype.animateWobble = function() {
    dynamics.stop(this.pinWrap);
    dynamics.css(this.pinWrap, {
        'transform': 'none',
    });
    dynamics.animate(this.pinWrap, {
        rotateZ: -45,
    }, {
        type: dynamics.bounce,
        duration: 1800,
    });

    dynamics.stop(this.pin);
    dynamics.css(this.pin, {
        'transform': 'none',
    });
    dynamics.animate(this.pin, {
        scaleX: 0.8
    }, {
        type: dynamics.bounce,
        duration: 800,
        bounciness: 1800,
    });
}