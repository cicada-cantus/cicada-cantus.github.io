// ========================
// STARFIELD (Hero)
// ========================
const heroStars = document.getElementById('hero-stars');
for (let i = 0; i < 120; i++) {
    const d = document.createElement('div');
    d.className = 'dot';
    d.style.left = Math.random() * 100 + '%';
    d.style.top = Math.random() * 100 + '%';
    d.style.opacity = (Math.random() * 0.4 + 0.1).toString();
    d.style.width = d.style.height = (Math.random() * 2 + 1) + 'px';
    heroStars.appendChild(d);
}

// ========================
// SMOOTH SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href'))
            ?.scrollIntoView({ behavior: 'smooth' });
    })
);

// Newsletter
document.getElementById('nl-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Merci ! Vous serez informé dès que le launcher sera disponible.');
});

// ========================
// LOCATION DATA
// ========================
const LOCATIONS = {
    earth: {
        name: "La Terre",
        type: "Planète d'origine — Zone interdite",
        desc: "La Terre, berceau de l'humanité, est devenue inhabitable il y a 400 ans. Ses surfaces sont recouvertes de pollution et de ruines. Pourtant, des rumeurs persistent sur d'étranges activités dans certaines zones abandonnées.",
        stats: { "Population": "Abandonnée", "Statut": "Zone interdite", "Niveau": "40 – 50", "Missions": "7 quêtes" },
        features: ["Zones industrielles en ruine", "Laboratoires secrets enfouis", "Systèmes de défense auto.", "Archives pré-migration"]
    },
    moon: {
        name: "La Lune",
        type: "Hub principal — Point de départ",
        desc: "Principal hub de l'humanité spatiale avec plus de 2 millions d'habitants. C'est ici qu'Octave commence son aventure, travaillant pour l'agence avant de partir sur les traces de son père.",
        stats: { "Population": "2,4 millions", "Statut": "Hub principal", "Niveau": "1 – 15", "Missions": "25+ quêtes" },
        features: ["Quartier résidentiel d'Octave", "Agence de voyage — QG", "Marché de programmes", "Base de lancement", "Archives lunaires"]
    },
    kepler: {
        name: "Station Kepler",
        type: "Colonie scientifique — Accès restreint",
        desc: "Station de recherche spécialisée en systèmes informatiques. C'est ici que le père d'Octave travaillait avant sa disparition. De nombreux secrets sont cachés dans ses laboratoires.",
        stats: { "Population": "150 000", "Statut": "Accès restreint", "Niveau": "15 – 25", "Missions": "12 quêtes" },
        features: ["Laboratoires de recherche IA", "Données cryptées", "Sécurité complexe", "Bureau du père d'Octave"]
    },
    nexus: {
        name: "Nexus Commercial",
        type: "Station de commerce — Zone franche",
        desc: "Plus grand centre de transit de l'orbite. Contrebandiers, marchands et hackers y font affaire. Un lieu idéal pour trouver des programmes rares et des informations sensibles.",
        stats: { "Population": "500 000", "Statut": "Zone franche", "Niveau": "10 – 20", "Missions": "18 quêtes" },
        features: ["Marché noir de programmes", "Guilde des hackers", "Arènes de combat virtuel", "Réseaux clandestins"]
    },
    haven: {
        name: "Haven Drift",
        type: "Colonie abandonnée — Zone dangereuse",
        desc: "Ancienne colonie minière abandonnée suite à un incident mystérieux. Ses systèmes sont encore actifs mais corrompus. Les rumeurs parlent de programmes devenus sentients.",
        stats: { "Population": "Abandonnée", "Statut": "Zone dangereuse", "Niveau": "30 – 40", "Missions": "8 quêtes" },
        features: ["Systèmes corrompus autonomes", "IA renégates", "Équipement rare abandonné", "Indices sur la disparition"]
    }
};

// ========================
// THREE.JS SCENE
// ========================
const canvas = document.getElementById('threejs-canvas');
const wrap = canvas.parentElement;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 1000);
camera.position.set(0, 6, 18);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(wrap.clientWidth, wrap.clientHeight);
renderer.setClearColor(0x000000, 0);

// Lights
scene.add(new THREE.AmbientLight(0xfff8e8, 0.6));
const sun = new THREE.PointLight(0xffe0a0, 2, 200);
scene.add(sun);

// Background stars
const starGeo = new THREE.BufferGeometry();
const starPos = [];
for (let i = 0; i < 800; i++) {
    starPos.push((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200);
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xf0e8d0, size: 0.25, transparent: true, opacity: 0.6 })));

// Orbit ring helper
function addOrbit(r, color = 0x7aab97, y = 0) {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 });
    scene.add(new THREE.Line(g, m));
}

// Earth (blue-green sphere)
const earthMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0x2e6b8a, emissive: 0x112233, shininess: 20 })
);
earthMesh.position.set(-6, 0, 0);
earthMesh.userData = { id: 'earth' };
scene.add(earthMesh);
addOrbit(6, 0x5a8a78);

// Moon (cream sphere)
const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0xd9cdb0, emissive: 0x222211, shininess: 5 })
);
moonMesh.position.set(8, 0, 0);
moonMesh.userData = { id: 'moon' };
scene.add(moonMesh);
addOrbit(8, 0xd4a843);

// Colony maker — station shape
function makeColony(color, id) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.55, 8),
        new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.25 })
    ));
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.045, 8, 24),
        new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.2 })
    );
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
    g.userData = { id };
    return g;
}

// Kepler — purple, inner orbit
const kepler = makeColony(0x8a6db5, 'kepler');
kepler.position.set(4, 1.5, 2);
kepler.userData.orbitR = 4.7; kepler.userData.orbitY = 1.5; kepler.userData.orbitSpeed = 0.0007;
scene.add(kepler); addOrbit(4.7, 0x8a6db5, 1.5);

// Nexus — gold, mid orbit
const nexus = makeColony(0xc0392b, 'nexus');
nexus.position.set(6.5, -1, -3);
nexus.userData.orbitR = 6.5; nexus.userData.orbitY = -1; nexus.userData.orbitSpeed = 0.0005;
scene.add(nexus); addOrbit(6.5, 0xc0392b, -1);

// Haven — rust, outer orbit
const haven = makeColony(0xd4a843, 'haven');
haven.position.set(10, 0.5, 4);
haven.userData.orbitR = 10; haven.userData.orbitY = 0.5; haven.userData.orbitSpeed = 0.0003;
scene.add(haven); addOrbit(10, 0xd4a843, 0.5);

const clickable = [earthMesh, moonMesh, kepler, nexus, haven];

// Mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObj = null;
let autoRot = true;

canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
});

canvas.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(clickable, true);
    if (!hits.length) return;
    let obj = hits[0].object;
    while (obj.parent && !obj.userData.id) obj = obj.parent;
    if (obj.userData.id) pickLocation(obj);
});

function pickLocation(obj) {
    selectedObj = obj;
    const data = LOCATIONS[obj.userData.id];
    if (!data) return;

    let statsHTML = Object.entries(data.stats).map(([k, v]) => `
            <div class="panel-stat">
                <div class="panel-stat-label">${k}</div>
                <div class="panel-stat-value">${v}</div>
            </div>`).join('');

    let featuresHTML = data.features.map(f => `<li>${f}</li>`).join('');

    document.getElementById('map-panel').innerHTML = `
            <div class="panel-location-name">${data.name}</div>
            <div class="panel-location-type">${data.type}</div>
            <div class="panel-divider"></div>
            <p class="panel-desc">${data.desc}</p>
            <div class="panel-stats">${statsHTML}</div>
            <div class="panel-divider"></div>
            <div class="panel-features-title">Lieux d'intérêt</div>
            <ul class="panel-features">${featuresHTML}</ul>
        `;
}

// Controls
document.getElementById('reset-cam').addEventListener('click', () => {
    autoRot = true;
    document.getElementById('toggle-rot').textContent = '⏸ Pause';
});
document.getElementById('toggle-rot').addEventListener('click', function () {
    autoRot = !autoRot;
    this.textContent = autoRot ? '⏸ Pause' : '▶ Lecture';
});

window.addEventListener('resize', () => {
    camera.aspect = wrap.clientWidth / wrap.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
});

// Animate
let t = 0;
(function animate() {
    requestAnimationFrame(animate);
    t += 0.001;

    if (autoRot) {
        camera.position.x = Math.sin(t * 0.15) * 18;
        camera.position.z = Math.cos(t * 0.15) * 18;
        camera.lookAt(0, 0, 0);
    }

    earthMesh.rotation.y += 0.003;
    moonMesh.rotation.y += 0.004;

    [kepler, nexus, haven].forEach(obj => {
        if (!obj.userData.orbitR) return;
        const a = t * (obj.userData.orbitSpeed / 0.001);
        obj.position.x = Math.cos(a) * obj.userData.orbitR;
        obj.position.z = Math.sin(a) * obj.userData.orbitR;
        obj.rotation.y += 0.008;
    });

    // Hover highlight
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(clickable, true);
    canvas.style.cursor = hits.length ? 'pointer' : (autoRot ? 'default' : 'grab');

    renderer.render(scene, camera);
})();

// ========================
// PARALLAX DECORATIONS
// ========================

// Add decorative rockets in various sections
const sections = ['story-section', 'features-section', 'media-section', 'requirements-section'];
sections.forEach((sectionClass, idx) => {
    const section = document.querySelector('.' + sectionClass);
    if (!section) return;

    // Add floating rocket
    const rocket = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    rocket.setAttribute('viewBox', '0 0 100 150');
    rocket.setAttribute('width', '120');
    rocket.setAttribute('height', '180');
    rocket.classList.add('parallax-rocket');
    rocket.style.position = 'absolute';
    rocket.style.top = (20 + idx * 15) + '%';
    rocket.style[idx % 2 ? 'left' : 'right'] = '-60px';
    rocket.style.transform = idx % 2 ? 'rotate(15deg)' : 'rotate(-15deg)';

    rocket.innerHTML = `
            <ellipse cx="50" cy="60" rx="15" ry="40" fill="${idx % 2 ? '#c0392b' : '#d4a843'}"/>
            <ellipse cx="50" cy="20" rx="8" ry="15" fill="${idx % 2 ? '#1e2d40' : '#c0392b'}"/>
            <rect x="35" y="85" width="6" height="20" rx="2" fill="${idx % 2 ? '#c0392b' : '#d4a843'}"/>
            <rect x="59" y="85" width="6" height="20" rx="2" fill="${idx % 2 ? '#c0392b' : '#d4a843'}"/>
            <ellipse cx="50" cy="60" rx="9" ry="9" fill="#f0e8d0" opacity="0.7"/>
            <rect x="47" y="100" width="6" height="40" rx="3" fill="rgba(240,232,208,0.6)"/>
        `;
    section.style.position = 'relative';
    section.style.overflow = 'hidden';
    section.appendChild(rocket);

    // Add decorative stars
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.classList.add('parallax-star');
        star.style.top = (Math.random() * 80 + 10) + '%';
        star.style[idx % 2 ? 'right' : 'left'] = (Math.random() * 200 + 100) + 'px';
        section.appendChild(star);
    }

    // Add orbit circles to some sections
    if (idx === 1 || idx === 3) {
        const orbit = document.createElement('div');
        orbit.classList.add('parallax-orbit');
        const size = 400 + idx * 150;
        orbit.style.width = size + 'px';
        orbit.style.height = size + 'px';
        orbit.style.top = '50%';
        orbit.style[idx % 2 ? 'left' : 'right'] = '-' + (size / 2) + 'px';
        orbit.style.transform = 'translateY(-50%)';
        section.appendChild(orbit);
    }
});

// ========================
// SCROLL REVEAL ANIMATIONS
// ========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Keep observing for re-entry on scroll up
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
    revealObserver.observe(el);
});

// ========================
// PARALLAX SCROLL EFFECT
// ========================
let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = lastScrollY;

            // Parallax rockets - STRONG effect
            document.querySelectorAll('.parallax-rocket').forEach((el, i) => {
                const speed = 0.3 + (i * 0.08);
                const direction = i % 2 ? 1 : -1;
                const rotation = (i % 2 ? 15 : -15) + (scrolled * 0.02 * direction);
                el.style.transform = `translateY(${scrolled * speed * direction}px) rotate(${rotation}deg)`;
            });

            // Parallax stars - MEDIUM effect
            document.querySelectorAll('.parallax-star').forEach((el, i) => {
                const speed = 0.2 + (i * 0.05);
                const wobble = Math.sin(scrolled * 0.01 + i) * 10;
                el.style.transform = `translateY(${scrolled * speed}px) translateX(${wobble}px)`;
            });

            // Parallax orbits - SLOW rotation
            document.querySelectorAll('.parallax-orbit').forEach((el, i) => {
                const speed = 0.08 + (i * 0.03);
                const rotation = scrolled * 0.03;
                el.style.transform = `translateY(-50%) translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
            });

            // Hero circles - SCALE effect
            const heroCircles = document.querySelectorAll('.hero-circle');
            heroCircles.forEach((circle, i) => {
                const speed = 0.08 + (i * 0.04);
                const scale = 1 + (scrolled * 0.0002 * (i + 1));
                circle.style.transform = `translate(-50%, -50%) translateY(${-scrolled * speed}px) scale(${scale})`;
                circle.style.opacity = Math.max(0.1, 1 - (scrolled * 0.001));
            });

            // Hero rockets - DRIFT effect
            const heroRocket = document.querySelector('.hero-rockets');
            if (heroRocket) {
                heroRocket.style.transform = `rotate(-5deg) translateY(${scrolled * 0.3}px) translateX(${scrolled * 0.1}px)`;
                heroRocket.style.opacity = Math.max(0, 0.18 - (scrolled * 0.0003));
            }

            // Floating dots in hero
            const heroDots = document.querySelectorAll('.hero-stars .dot');
            heroDots.forEach((dot, i) => {
                const speed = 0.05 + (i % 10) * 0.01;
                dot.style.transform = `translateY(${scrolled * speed}px)`;
                dot.style.opacity = Math.max(0.1, 0.5 - (scrolled * 0.0005));
            });

            // Navigation background on scroll
            const nav = document.querySelector('nav');
            if (scrolled > 100) {
                nav.style.background = 'rgba(30, 45, 64, 0.98)';
                nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            } else {
                nav.style.background = 'var(--navy)';
                nav.style.boxShadow = 'none';
            }

            ticking = false;
        });
        ticking = true;
    }
});

// ========================
// FEATURE CARDS HOVER ANIMATION
// ========================
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transition = 'all 0.2s ease';
    });
});

// ========================
// BUTTON RIPPLE EFFECT
// ========================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        ripple.style.left = e.clientX - this.getBoundingClientRect().left + 'px';
        ripple.style.top = e.clientY - this.getBoundingClientRect().top + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframe
const style = document.createElement('style');
style.textContent = `
        @keyframes ripple {
            from {
                opacity: 1;
                transform: scale(0);
            }
            to {
                opacity: 0;
                transform: scale(4);
            }
        }
    `;
document.head.appendChild(style);

// ========================
// SMOOTH COUNTER ANIMATION FOR STATS
// ========================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            const badge = entry.target.querySelector('.story-badge span:first-child');
            if (badge) {
                let count = 0;
                const target = 400;
                const duration = 2000;
                const increment = target / (duration / 16);

                const counter = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        badge.textContent = target;
                        clearInterval(counter);
                    } else {
                        badge.textContent = Math.floor(count);
                    }
                }, 16);
            }
        }
    });
}, { threshold: 0.5 });

const storyBadge = document.querySelector('.story-badge');
if (storyBadge) statsObserver.observe(storyBadge.parentElement);