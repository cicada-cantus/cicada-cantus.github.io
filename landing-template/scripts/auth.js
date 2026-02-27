// Generate background stars
const bgStars = document.getElementById('bg-stars');
for (let i = 0; i < 80; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';
    dot.style.animationDelay = Math.random() * 3 + 's';
    bgStars.appendChild(dot);
}

// Tab switching
const tabs = document.querySelectorAll('.auth-tab');
const forms = document.querySelectorAll('.auth-form');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active form
        forms.forEach(form => {
            form.classList.remove('active');
            if (form.id === targetTab + '-form') {
                form.classList.add('active');
            }
        });
    });
});

// Password strength indicator
const signupPassword = document.getElementById('signup-password');
const passwordStrength = document.getElementById('password-strength');
const strengthBar = passwordStrength.querySelector('.password-strength-bar');

signupPassword.addEventListener('input', (e) => {
    const password = e.target.value;

    if (password.length === 0) {
        passwordStrength.classList.remove('show');
        return;
    }

    passwordStrength.classList.add('show');

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    strengthBar.className = 'password-strength-bar';
    if (strength <= 1) {
        strengthBar.classList.add('weak');
    } else if (strength <= 3) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
});

// Form submissions
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    btn.textContent = 'Connexion...';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success
    const email = document.getElementById('login-email').value;
    alert(`Connexion réussie pour ${email}!\n\n(Demo - Intégrez votre backend ici)`);

    btn.classList.remove('loading');
    btn.textContent = 'Consulter la mission →';
});

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-password-confirm').value;

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas !');
        return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('loading');
    btn.textContent = 'Inscription...';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success
    const username = document.getElementById('signup-username').value;
    alert(`Bienvenue ${username}!\n\nVotre compte a été créé avec succès.\n\n(Demo - Intégrez votre backend ici)`);

    btn.classList.remove('loading');
    btn.textContent = 'Rejoindre la mission →';
});

// Social logins (placeholders)
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', () => {
        const provider = btn.textContent.trim();
        alert(`Connexion via ${provider}\n\n(Demo - Intégrez OAuth ici)`);
    });
});

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    document.querySelectorAll('.bg-circle').forEach((circle, i) => {
        const speed = 1 + (i * 0.5);
        circle.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });

    document.querySelectorAll('.bg-rocket').forEach((rocket, i) => {
        const speed = 1.5 + (i * 0.3);
        rocket.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});