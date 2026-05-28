(function () {
    'use strict';

    // ── AOS Init ──
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true
    });

    // ── Question 1 submit ──
    const input1 = document.getElementById('user-response');
    const submitBtn = document.getElementById('submit-btn');
    const firstQuestion = document.getElementById('first-question');
    const nextQuestion = document.getElementById('next-question');

    submitBtn.addEventListener('click', () => {
        if (input1.value.trim() !== '') {
            firstQuestion.classList.add('fade-out');
            setTimeout(() => {
                firstQuestion.style.display = 'none';
                nextQuestion.classList.add('visible');
                AOS.refresh();
            }, 600);
        }
    });

    input1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitBtn.click();
    });

    // ── People rows (small, scrolling) ──
    function buildPeopleRow(id) {
        const row = document.getElementById(id);
        let html = '';
        for (let i = 0; i < 80; i++) {
            html += `
            <svg width="100" height="160" viewBox="0 0 50 90" xmlns="http://www.w3.org/2000/svg" fill="white">
                <circle cx="25" cy="10" r="8"/>
                <rect x="17" y="22" width="16" height="24" rx="4"/>
                <rect x="-2" y="24" width="21" height="5" rx="2.5" transform="rotate(-35, 17, 26)"/>
                <rect x="31" y="24" width="21" height="5" rx="2.5" transform="rotate(35, 33, 26)"/>
                <rect x="17" y="46" width="7" height="22" rx="3"/>
                <rect x="26" y="46" width="7" height="22" rx="3"/>
            </svg>`;
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
        for (let i = 0; i < 7; i++) {
            html += `
            <svg width="350" height="560" viewBox="0 0 50 90" xmlns="http://www.w3.org/2000/svg" fill="white">
                <circle cx="25" cy="10" r="8"/>
                <rect x="17" y="22" width="16" height="24" rx="4"/>
                <rect x="-2" y="24" width="21" height="5" rx="2.5" transform="rotate(-35, 17, 26)"/>
                <rect x="31" y="24" width="21" height="5" rx="2.5" transform="rotate(35, 33, 26)"/>
                <rect x="17" y="46" width="7" height="22" rx="3"/>
                <rect x="26" y="46" width="7" height="22" rx="3"/>
            </svg>`;
        }
        row.innerHTML = html;
    }

    buildPeopleRowClose('people-row-close');

    // ── Background color transition ──
    const yellowSection = document.getElementById('yellow-section');

    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.classList.add('yellow');
            } else {
                document.body.classList.remove('yellow');
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

    // ── Page load overlay ──
    const pageOverlay = document.getElementById('page-overlay');
    const pageOverlayBtn = document.getElementById('page-overlay-btn');

    pageOverlayBtn.addEventListener('click', () => {
        pageOverlay.classList.add('hidden');
});

})();