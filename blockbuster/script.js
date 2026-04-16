'use strict';

var i1 = 0;
var txt1 = 'The caterpillar is a prisoner to the streets that conceived it. Its only job is to eat or consume everything around it, in order to protect itself from this mad city. While consuming its environment the caterpillar begins to notice ways to survive. One thing it noticed is how much the world shuns him, but praises the butterfly. The butterfly represents the talent, the thoughtfulness and the beauty within the caterpillar. But having a harsh outlook on life, the caterpillar sees the butterfly as weak, and figures out a way to pimp it to his own benefits.';

var i2 = 0;
var txt2 = "No more hiding. I wanna feel sun on my skin, even if it burns or blinds me, I wanna be purified within. No more hiding, I wanna be in love for real though. Don't care what it costs me, I'll trade anything to feel now. Crashing for real, trying for real, earning for real, hurting for real, passion for real, risky for real, anything real. Don't gotta say it cause I already know...eveyrthing I love I gotta let go. Gotta break it if you want it to grow. Had to build everything twice over, don't tell me cause I know...let go...";

var speed = 50;

function typeWriter() {
    document.getElementById("typing").innerHTML = ''; 
    i1 = 0; 
    function type() {
        if (i1 < txt1.length) {
            document.getElementById("typing").innerHTML += txt1.charAt(i1);
            i1++;
            setTimeout(type, speed);
        }
    }
    type();
}

function typeWriter2() {
    document.getElementById("typing2").innerHTML = ''; 
    i2 = 0; 
    function type() {
        if (i2 < txt2.length) {
            document.getElementById("typing2").innerHTML += txt2.charAt(i2);
            i2++;
            setTimeout(type, speed);
        }
    }
    type();
}