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

    // ── Shared smooth scroll helper ──
    function smoothScrollTo(targetEl, duration = 2000, offset = 0) {
        const targetY = targetEl.getBoundingClientRect().top + window.scrollY + offset;
        const startY = window.scrollY;
        const distance = targetY - startY;
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

    // ── Question 1 submit ──
    const input1 = document.getElementById('user-response');
    const submitBtn = document.getElementById('submit-btn');
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

    // ── Question 2 submit — smooth scroll to stats ──
    const input2 = document.getElementById('user-response-2');
    const submitBtn2 = document.getElementById('submit-btn-2');

    submitBtn2.addEventListener('click', () => {
        if (input2.value.trim() !== '') {
            smoothScrollTo(document.querySelector('.stats'), 2000);
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
    const yInput1 = document.getElementById('yellow-response-1');
    const yInput2 = document.getElementById('yellow-response-2');
    const yInput3 = document.getElementById('yellow-response-3');

    const yBtn1 = document.getElementById('yellow-submit-1');
    const yBtn2 = document.getElementById('yellow-submit-2');
    const yBtn3 = document.getElementById('yellow-submit-3');

    const yellowQ2 = document.getElementById('yellow-q2');
    const yellowQ3 = document.getElementById('yellow-q3');

    yBtn1.addEventListener('click', () => {
        if (yInput1.value.trim() !== '') {
            yellowQ2.classList.add('visible');
            AOS.refresh();
        }
    });

    yInput1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') yBtn1.click();
    });

    yBtn2.addEventListener('click', () => {
        if (yInput2.value.trim() !== '') {
            yellowQ3.classList.add('visible');
            AOS.refresh();
        }
    });

    yInput2.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') yBtn2.click();
    });

    yBtn3.addEventListener('click', () => {
        if (yInput3.value.trim() !== '') {
            const burnLead = document.querySelector('.burn-lead');
            const offset = -(window.innerHeight / 2) + 450;
            smoothScrollTo(burnLead, 2000, offset);
        }
    });

    yInput3.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') yBtn3.click();
    });


    // ── Image modal ──
    const modalOverlay = document.getElementById('modal-overlay');
    const modalText = document.getElementById('modal-text');
    const modalClose = document.getElementById('modal-close');

    document.querySelectorAll('.img-wrap').forEach(wrap => {
        wrap.addEventListener('click', () => {
            const name = wrap.dataset.name || '';
            modalText.innerHTML = `<span class="modal-name">${name}</span>${wrap.dataset.caption}`;
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
        const size = el.classList.contains('wide') ? 400 : 350;
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

        bubbles.forEach(b => {
            b.x += b.speedX;
            b.y += b.speedY;

            if (b.x <= 0 || b.x + b.size >= gridW) b.speedX *= -1;
            if (b.y <= 0 || b.y + b.size >= gridH) b.speedY *= -1;

            b.x = Math.max(0, Math.min(b.x, gridW - b.size));
            b.y = Math.max(0, Math.min(b.y, gridH - b.size));
        });

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
                    const nx = dx / distance;
                    const ny = dy / distance;

                    const aDot = a.speedX * nx + a.speedY * ny;
                    const bDot = b.speedX * nx + b.speedY * ny;

                    a.speedX += (bDot - aDot) * nx;
                    a.speedY += (bDot - aDot) * ny;
                    b.speedX += (aDot - bDot) * nx;
                    b.speedY += (aDot - bDot) * ny;

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

    // ── Full width pixelated fire ──
    const fireRow = document.getElementById('fire-row');

    const pixelSize = 16;
    let fireCols = Math.ceil(window.innerWidth / pixelSize);
    const rows = 60;

    const canvas = document.createElement('canvas');
    canvas.width = fireCols;
    canvas.height = rows;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = (rows * pixelSize) + 'px';
    canvas.style.display = 'block';
    fireRow.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    const palette = [
        null,
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

    let heat = Array.from({ length: rows }, () => new Array(fireCols).fill(0));
    let isSurging = false;

    function updateFire() {
        for (let x = 0; x < fireCols; x++) {
            if (isSurging) {
                heat[0][x] = Math.floor(Math.random() * 2) + 10;
            } else {
                heat[0][x] = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 8 : 0;
            }
        }

        for (let y = 1; y < rows; y++) {
            for (let x = 0; x < fireCols; x++) {
                const left  = heat[y - 1][Math.max(0, x - 1)];
                const mid   = heat[y - 1][x];
                const right = heat[y - 1][Math.min(fireCols - 1, x + 1)];
                const avg = (left + mid + right) / 3;
                heat[y][x] = Math.max(0, avg - Math.random() * 1.5);
            }
        }

        ctx.clearRect(0, 0, fireCols, rows);
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < fireCols; x++) {
                const val = Math.round(heat[y][x]);
                if (val > 0 && palette[val]) {
                    ctx.fillStyle = palette[val];
                    ctx.fillRect(x, rows - 1 - y, 1, 1);
                }
            }
        }
    }

    const fireFps = 5;
    const fireInterval = 1000 / fireFps;
    let fireLastTime = 0;

    function fireLoop(timestamp) {
        if (timestamp - fireLastTime > fireInterval) {
            fireLastTime = timestamp;
            updateFire();
        }
        requestAnimationFrame(fireLoop);
    }

    requestAnimationFrame(fireLoop);

    window.addEventListener('resize', () => {
        fireCols = Math.ceil(window.innerWidth / pixelSize);
        canvas.width = fireCols;
        canvas.style.width = window.innerWidth + 'px';
        heat = Array.from({ length: rows }, () => new Array(fireCols).fill(0));
    });

    // ── Burn text interaction ──
    const burnInput = document.getElementById('burn-input');
    const burnSubmit = document.getElementById('burn-submit');
    const fireSectionEl = document.querySelector('.fire-section');

    function dropAndBurn(text) {
    const el = document.createElement('div');
    el.classList.add('falling-word');
    el.textContent = text;

    const duration = 2.5 + Math.random();
    el.style.setProperty('--fall-duration', duration + 's');
    fireSectionEl.appendChild(el);

    const startScrollY = window.scrollY;
    const endScrollY = document.documentElement.scrollHeight - window.innerHeight;
    const startTime = performance.now();

    function followWord(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / (duration * 400), 1);

        function easeInQuad(t) {
            return t * t;
        }

        const newScrollY = startScrollY + (endScrollY - startScrollY) * easeInQuad(progress);
        window.scrollTo(0, newScrollY);

        if (progress < 1) requestAnimationFrame(followWord);
    }

    requestAnimationFrame(followWord);

    // ── Disintegrate + smoke on impact ──
    setTimeout(() => {
        isSurging = true;

        // get word position for particles
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // shatter the letters
        const letters = text.split('');
        letters.forEach((char, i) => {
            if (char === ' ') return;
            const piece = document.createElement('div');
            piece.textContent = char;
            piece.style.cssText = `
                position: fixed;
                left: ${centerX + (i - letters.length / 2) * 20}px;
                top: ${centerY}px;
                font-family: "Libertinus Serif Display", serif;
                font-size: 30px;
                color: white;
                pointer-events: none;
                z-index: 20;
                transition: none;
            `;
            document.body.appendChild(piece);

            const angle = (Math.random() * 360) * (Math.PI / 180);
            const speed = Math.random() * 80 + 30;
            const vx = Math.cos(angle) * speed;
            const vy = -(Math.random() * 60 + 20);
            let opacity = 1;
            let x = parseFloat(piece.style.left);
            let y = parseFloat(piece.style.top);
            let vy2 = vy;
            const gravity = 2;

            function animatePiece() {
                x += vx * 0.05;
                vy2 += gravity * 0.05;
                y += vy2 * 0.05;
                opacity -= 0.018;
                piece.style.left = x + 'px';
                piece.style.top = y + 'px';
                piece.style.opacity = opacity;
                piece.style.transform = `rotate(${x * 2}deg)`;
                if (opacity > 0) {
                    requestAnimationFrame(animatePiece);
                } else {
                    piece.remove();
                }
            }

            requestAnimationFrame(animatePiece);
        });

        // smoke particles
        for (let s = 0; s < 18; s++) {
            const smoke = document.createElement('div');
            const size = Math.random() * 30 + 15;
            smoke.style.cssText = `
                position: fixed;
                left: ${centerX + (Math.random() - 0.5) * 80}px;
                top: ${centerY}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(180, 180, 180, ${Math.random() * 0.3 + 0.1});
                pointer-events: none;
                z-index: 15;
                filter: blur(${Math.random() * 6 + 3}px);
            `;
            document.body.appendChild(smoke);

            let sx = centerX + (Math.random() - 0.5) * 80;
            let sy = centerY;
            const svx = (Math.random() - 0.5) * 1.5;
            const svy = -(Math.random() * 2 + 0.5);
            let sopacity = Math.random() * 0.4 + 0.2;
            let ssize = size;

            function animateSmoke() {
                sx += svx;
                sy += svy;
                sopacity -= 0.006;
                ssize += 0.4;
                smoke.style.left = sx + 'px';
                smoke.style.top = sy + 'px';
                smoke.style.opacity = sopacity;
                smoke.style.width = ssize + 'px';
                smoke.style.height = ssize + 'px';
                if (sopacity > 0) {
                    requestAnimationFrame(animateSmoke);
                } else {
                    smoke.remove();
                }
            }

            requestAnimationFrame(animateSmoke);
        }

        setTimeout(() => { isSurging = false; }, 1500);
        el.remove();

    }, duration * 1000 * 0.85);

    setTimeout(() => {
        if (el.parentNode) el.remove();
    }, duration * 1000 + 200);
}

    burnSubmit.addEventListener('click', () => {
        const text = burnInput.value.trim();
        if (text !== '') {
            dropAndBurn(text);
            burnInput.value = '';
        }
    });

    burnInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') burnSubmit.click();
    });

})();