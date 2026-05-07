(function() {
    'use strict';

    var granimInstance = new Granim({
        element: '#canvas-basic',
        direction: 'left-right',
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#edd1e4', '#cee9c6'],
                    ['#c0f0d3', '#bfd0e2'],
                    ['#d4b5e8', '#bee6dc']
                ]
            }
        }
    });

    AOS.init({
        easing: 'ease-out-back',
        duration: 1000,
        offset: 50
    });
})()