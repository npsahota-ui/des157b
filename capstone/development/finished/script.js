(function () {
    'use strict';

    // ── AOS Init ──
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true
    });

    // ── tsParticles (starfield) ──
    tsParticles.load("tsparticles", {
        background: { color: { value: "transparent" } },
        particles: {
            number: { value: 120, density: { enable: true, area: 900 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: { enable: true, minimumValue: 0.1 } },
            size: { value: { min: 1, max: 2.5 } },
            move: {
                enable: true,
                speed: 0.3,
                direction: "none",
                random: true,
                outModes: "out"
            }
        },
        detectRetina: true
    });

    // ── Question 1 submit ──
    const input1 = document.getElementById('user-response');
    const submitBtn = document.getElementById('submit-btn');
    const firstQuestion = document.getElementById('first-question');
    const nextQuestion = document.getElementById('next-question');

    submitBtn.addEventListener('click', () => {
        if (input1.value.trim() !== '') {
            nextQuestion.classList.add('visible');
            AOS.refresh();
        }
    });

    input1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitBtn.click();
    });

    // ── Question 2 submit ──
    const input2 = document.getElementById('user-response-2');
    const submitBtn2 = document.getElementById('submit-btn-2');

    submitBtn2.addEventListener('click', () => {
        if (input2.value.trim() !== '') {
            const target = document.querySelector('.stats');
            const targetY = target.getBoundingClientRect().top + window.scrollY;
            const startY = window.scrollY;
            const distance = targetY - startY;
            const duration = 2000;
            let startTime = null;

            function easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                window.scrollTo(0, startY + distance * easeInOutQuad(progress));
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        }
    });

    input2.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitBtn2.click();
    });

    // ── People rows (small, scrolling) ──
    function buildPeopleRow(id) {
        const row = document.getElementById(id);
        let html = '';
        for (let i = 0; i < 40; i++) {
            html += `<img src="images/person.png" alt="person" style="width:100px; height:160px; object-fit:contain; flex-shrink:0;">`;
        }
        row.innerHTML = html;
    }

    buildPeopleRow('people-row');
    buildPeopleRow('people-row-2');
    buildPeopleRow('people-row-3');

    // ── People row (large, static) ──
    function buildPeopleRowClose(id) {
        const row = document.getElementById(id);
        let html = '';
        for (let i = 0; i < 6; i++) {
            html += `<img src="images/person.png" alt="person" style="width:350px; height:560px; object-fit:contain; flex-shrink:0;">`;
        }
        row.innerHTML = html;
    }

    buildPeopleRowClose('people-row-close');

    // ── Background color + particle transition ──
    const yellowSection = document.getElementById('yellow-section');

    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const particles = document.getElementById('tsparticles');
            if (entry.isIntersecting) {
                document.body.classList.add('yellow');
                if (particles) particles.style.opacity = '0';
                setTimeout(() => {
                    tsParticles.load("tsparticles", {
                        background: { color: { value: "transparent" } },
                        particles: {
                            number: { value: 18, density: { enable: true, area: 800 } },
                            color: { value: "#f0a8ce" },
                            shape: { type: "circle" },
                            opacity: { value: 0.35 },
                            size: { value: { min: 18, max: 55 } },
                            move: {
                                enable: true,
                                speed: 1.2,
                                direction: "none",
                                random: true,
                                bounce: true,
                                outModes: "bounce"
                            },
                            stroke: { width: 1.5, color: "#f0a8ce", opacity: 0.5 }
                        },
                        detectRetina: true
                    }).then(() => {
                        if (particles) particles.style.opacity = '1';
                    });
                }, 800);
            } else {
                document.body.classList.remove('yellow');
                if (particles) particles.style.opacity = '0';
                setTimeout(() => {
                    tsParticles.load("tsparticles", {
                        background: { color: { value: "transparent" } },
                        particles: {
                            number: { value: 120, density: { enable: true, area: 900 } },
                            color: { value: "#ffffff" },
                            shape: { type: "circle" },
                            opacity: { value: 0.5, random: { enable: true, minimumValue: 0.1 } },
                            size: { value: { min: 1, max: 2.5 } },
                            move: {
                                enable: true,
                                speed: 0.3,
                                direction: "none",
                                random: true,
                                outModes: "out"
                            }
                        },
                        detectRetina: true
                    }).then(() => {
                        if (particles) particles.style.opacity = '1';
                    });
                }, 800);
            }
        });
    }, { threshold: 0.1 });

    bgObserver.observe(yellowSection);

    // ── Yellow section questions ──
    function setupYellowQuestion(currentId, nextId, inputId, btnId) {
        const current = document.getElementById(currentId);
        const next = document.getElementById(nextId);
        const input = document.getElementById(inputId);
        const btn = document.getElementById(btnId);

        btn.addEventListener('click', () => {
            if (input.value.trim() !== '') {
                current.classList.add('fade-out');
                setTimeout(() => {
                    current.style.display = 'none';
                    if (next) {
                        next.style.display = 'block';
                    }
                }, 600);
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') btn.click();
        });
    }

    setupYellowQuestion('yellow-q1', 'yellow-q2', 'yellow-response-1', 'yellow-submit-1');
    setupYellowQuestion('yellow-q2', 'yellow-q3', 'yellow-response-2', 'yellow-submit-2');
    setupYellowQuestion('yellow-q3', null, 'yellow-response-3', 'yellow-submit-3');

    // ── Image modal ──
    const modalOverlay = document.getElementById('modal-overlay');
    const modalText = document.getElementById('modal-text');
    const modalClose = document.getElementById('modal-close');

    document.querySelectorAll('.img-wrap').forEach(wrap => {
        wrap.addEventListener('click', () => {
            modalText.textContent = wrap.dataset.caption;
            modalOverlay.classList.add('active');
        });
    });

    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // ── Floating photo bubbles ──
    const bubbleWraps = document.querySelectorAll('.image-grid .img-wrap');
    const grid = document.querySelector('.image-grid');

    const bubbles = Array.from(bubbleWraps).map((el) => {
        const size = el.classList.contains('wide') ? 220 : 180;
        const x = Math.random() * (grid.offsetWidth - size);
        const y = Math.random() * (grid.offsetHeight - size);
        const speedX = (Math.random() * 0.4 + 0.1) * (Math.random() < 0.5 ? 1 : -1);
        const speedY = (Math.random() * 0.4 + 0.1) * (Math.random() < 0.5 ? 1 : -1);

        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.width = size + 'px';
        el.style.height = size + 'px';

        return { el, x, y, speedX, speedY, size };
    });

    function animateBubbles() {
    const gridW = grid.offsetWidth;
    const gridH = grid.offsetHeight;

    // Wall bouncing
    bubbles.forEach(b => {
        b.x += b.speedX;
        b.y += b.speedY;

        if (b.x <= 0 || b.x + b.size >= gridW) b.speedX *= -1;
        if (b.y <= 0 || b.y + b.size >= gridH) b.speedY *= -1;

        b.x = Math.max(0, Math.min(b.x, gridW - b.size));
        b.y = Math.max(0, Math.min(b.y, gridH - b.size));
    });

    // Bubble collision detection
    for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
            const a = bubbles[i];
            const b = bubbles[j];

            const aRadius = a.size / 2;
            const bRadius = b.size / 2;

            const aCenterX = a.x + aRadius;
            const aCenterY = a.y + aRadius;
            const bCenterX = b.x + bRadius;
            const bCenterY = b.y + bRadius;

            const dx = bCenterX - aCenterX;
            const dy = bCenterY - aCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = aRadius + bRadius;

            if (distance < minDist && distance > 0) {
                // Normalize collision axis
                const nx = dx / distance;
                const ny = dy / distance;

                // Swap velocities along collision axis
                const aDot = a.speedX * nx + a.speedY * ny;
                const bDot = b.speedX * nx + b.speedY * ny;

                a.speedX += (bDot - aDot) * nx;
                a.speedY += (bDot - aDot) * ny;
                b.speedX += (aDot - bDot) * nx;
                b.speedY += (aDot - bDot) * ny;

                // Push apart so they don't stick
                const overlap = (minDist - distance) / 2;
                a.x -= overlap * nx;
                a.y -= overlap * ny;
                b.x += overlap * nx;
                b.y += overlap * ny;
            }
        }
    }

    bubbles.forEach(b => {
        b.el.style.left = b.x + 'px';
        b.el.style.top = b.y + 'px';
    });

    requestAnimationFrame(animateBubbles);
}

 animateBubbles();

    // ── Typewriter effect for header ──
    function typeWriter(element, speed = 75) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        element.style.filter = 'none';

        const caret = document.createElement('span');
        caret.textContent = '|';
        caret.style.cssText = `
            display: inline;
            color: white;
            animation: none;
            opacity: 1;
            font-family: "Libertinus Serif Display", serif;
            font-size: 0.85em;
            margin-left: 4px;
        `;
        element.appendChild(caret);

        let i = 0;
        const timer = setInterval(() => {
            element.insertBefore(document.createTextNode(text[i]), caret);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                caret.style.animation = 'caretBlink 1s step-end infinite';
            }
        }, speed);
    }

    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.style.opacity = '0';
        window.addEventListener('load', () => {
            setTimeout(() => typeWriter(headerTitle, 75), 300);
        });
    }

    // ── Fade out sections on scroll up ──
    const fadeSections = document.querySelectorAll('header, section, .yellow-questions');

    fadeSections.forEach(el => el.classList.add('section-fade'));

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const rect = entry.boundingClientRect;
            if (!entry.isIntersecting && rect.bottom < 0) {
                entry.target.classList.add('out-of-view');
            } else {
                entry.target.classList.remove('out-of-view');
            }
        });
    }, { threshold: 0 });

    fadeSections.forEach(el => fadeObserver.observe(el));

    // flame
    // ── Full width pixelated fire ──
        const fireRow = document.getElementById('fire-row');

        const pixelSize = 16; // size of each "pixel" block in actual pixels
        const cols = Math.ceil(window.innerWidth / pixelSize);
        const rows = 60; // how tall the fire is in pixel blocks

        const canvas = document.createElement('canvas');
        canvas.width = cols;
        canvas.height = rows;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = (rows * pixelSize) + 'px';
        canvas.style.display = 'block';
        fireRow.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        // Fire color palette from cool to hot
        const palette = [
            null,                // 0 = no fire
            '#1a0000',
            '#3d0000',
            '#7a0000',
            '#b01000',
            '#d14234',
            '#e05020',
            '#f07010',
            '#f2a55f',
            '#f5c88a',
            '#e8dec5',
            '#ffffff',
        ];

        // Heat grid — each cell holds a heat value 0-11
        let heat = Array.from({ length: rows }, () => new Array(cols).fill(0));

        function updateFire() {
            // Seed the bottom row with random heat
            for (let x = 0; x < cols; x++) {
                heat[0][x] = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 8 : 0;
            }

            // Propagate heat upward with cooling
            for (let y = 1; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const left  = heat[y - 1][Math.max(0, x - 1)];
                    const mid   = heat[y - 1][x];
                    const right = heat[y - 1][Math.min(cols - 1, x + 1)];
                    const avg = (left + mid + right) / 3;
                    heat[y][x] = Math.max(0, avg - Math.random() * 1.5);
                }
            }

            // Draw
            ctx.clearRect(0, 0, cols, rows);
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const val = Math.round(heat[y][x]);
                    if (val > 0 && palette[val]) {
                        ctx.fillStyle = palette[val];
                        ctx.fillRect(x, rows - 1 - y, 1, 1);
                    }
                }
            }
        }

        function fireLoop() {
            const fireFps = 5; 
            const fireInterval = 1600 / fireFps;
            let fireLastTime = 0;

            function fireLoop(timestamp) {
                if (timestamp - fireLastTime > fireInterval) {
                    fireLastTime = timestamp;
                    updateFire();
            }
            requestAnimationFrame(fireLoop);
     }

requestAnimationFrame(fireLoop);
        }

        fireLoop();

        window.addEventListener('resize', () => {
            const newCols = Math.ceil(window.innerWidth / pixelSize);
            canvas.width = newCols;
            canvas.style.width = window.innerWidth + 'px';
            heat = Array.from({ length: rows }, () => new Array(newCols).fill(0));
        });


})();