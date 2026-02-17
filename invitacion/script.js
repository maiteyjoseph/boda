window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // 1. Handle Guest Name
    let name = urlParams.get('invitado');
    const nameElement = document.getElementById('guest-name');
    
    if (name && nameElement) {
        // First, replace underscores with spaces
        let cleanName = name.replace(/_/g, ' '); 
        
        // Safety: If "y" is stuck between names (e.g. "LeinesyOlga"), 
        // this adds a space before and after the "y"
        cleanName = cleanName.replace(/(\S)y(\S)/g, '$1 y $2');
        
        nameElement.innerText = cleanName; 
    }

    // 2. Handle Pases
    let pases = urlParams.get('pases');
    const countElement = document.getElementById('guest-count');
    if (pases && countElement) {
        countElement.innerText = pases;
    }
}

// 1. Envelope Opening Logic
function openEnvelope() {
    // Trigger the sparkle effect
    createSparkles();
    
    // Smoothly fade out the white loading screen
    const wrapper = document.getElementById('envelope-wrapper');
    wrapper.style.opacity = '0';
    
    setTimeout(() => {
        wrapper.style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
        // Trigger initial scroll reveal check
        revealSections();
    }, 1000);
}

// Sparkle Effect Logic
const canvas = document.getElementById('sparkleCanvas');
const ctx = canvas.getContext('2d');

function createSparkles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];
    
    // Using the copper color from your wax seal
    for(let i=0; i<60; i++) {
        particles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            size: Math.random() * 4 + 1,
            color: '#BB7E5E', 
            alpha: 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.01;
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            if(p.alpha <= 0) particles.splice(i, 1);
        });
        if(particles.length > 0) requestAnimationFrame(animate);
    }
    animate();
}
// 3. Scroll Reveal & Disappear Logic
function revealSections() {
    const sections = document.querySelectorAll('.reveal-section');
    const triggerBottom = window.innerHeight * 0.8;
    const triggerTop = window.innerHeight * 0.2;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        // Appear when scrolling down, Disappear when scrolling back up
        if(sectionTop < triggerBottom && sectionTop > -triggerTop) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', revealSections);

const track = document.querySelector('.carousel-container');

function autoScroll() {
    if (track.scrollLeft >= (track.scrollWidth - track.offsetWidth)) {
        track.scrollLeft = 0;
    } else {
        track.scrollLeft += 1;
    }
}

let scrollInterval = setInterval(autoScroll, 30);

// Stop auto-scroll when user touches it
track.addEventListener('touchstart', () => clearInterval(scrollInterval));
track.addEventListener('mousedown', () => clearInterval(scrollInterval));


