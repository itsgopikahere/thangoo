// Wishes in 20 languages
const wishes = [
    { lang: 'English', text: 'Happy Birthday!' },
    { lang: 'Tamil', text: 'பிறந்தநாள் வாழ்த்துக்கள்!' },
    { lang: 'Hindi', text: 'जन्मदिन की शुभकामनाएँ!' },
    { lang: 'Spanish', text: '¡Feliz cumpleaños!' },
    { lang: 'French', text: 'Joyeux anniversaire !' },
    { lang: 'German', text: 'Alles Gute zum Geburtstag!' },
    { lang: 'Italian', text: 'Buon compleanno!' },
    { lang: 'Portuguese', text: 'Feliz aniversário!' },
    { lang: 'Japanese', text: 'お誕生日おめでとう！' },
    { lang: 'Korean', text: '생일 축하해요!' },
    { lang: 'Chinese', text: '生日快乐' },
    { lang: 'Arabic', text: 'عيد ميلاد سعيد!' },
    { lang: 'Russian', text: 'С днём рождения!' },
    { lang: 'Dutch', text: 'Gefeliciteerd!' },
    { lang: 'Turkish', text: 'Doğum günün kutlu olsun!' },
    { lang: 'Swedish', text: 'Grattis på födelsedagen!' },
    { lang: 'Greek', text: 'Χρόνια πολλά!' },
    { lang: 'Thai', text: 'สุขสันต์วันเกิด' },
    { lang: 'Vietnamese', text: 'Chúc mừng sinh nhật!' },
    { lang: 'Malayalam', text: 'ജന്മദിനാശംസകൾ!' }
];

// Personal Message
const personalMessage = `Wishing many more happy returns of the day, thangamey maaa thango! 💖\n\nSuccessfully completed the teenage years with lots of achievements... I am so proud of the man you are becoming. 🌟\n\nWishing all your dreams come true, praying you grow more and more. You are already a proud son to your parents and to me also. In the future, you have even higher peaks to achieve, and we all are eagerly waiting for your achievements!\n\nWhatever happens, I will always be with you, thangamey. You want to grow more! Everything happens for a reason. Happy 20, my soul man! ✨`;

// Password Logic
function checkPassword() {
    const input = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('error-msg');
    
    if (input.toLowerCase() === 'thangamey') {
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        initMain();
    } else {
        errorMsg.innerText = "Incorrect secret word. Try again!";
    }
}

function initMain() {
    // Start Music
    const music = document.getElementById('bg-music');
    music.play().catch(e => console.log("Autoplay blocked, user interaction required"));

    // Populate Wishes
    const wishesContainer = document.getElementById('wishes-container');
    wishes.forEach(wish => {
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.innerHTML = `<span class="wish-lang">${wish.lang}</span><span class="wish-text">${wish.text}</span>`;
        wishesContainer.appendChild(card);
    });

    // Start Typewriter
    typeWriter();

    // Start Countdown
    startCountdown();

    // Init 3D Scene
    initThree();

    // Init Slideshow
    startSlideshow();
}

// Typewriter Effect
let i = 0;
function typeWriter() {
    if (i < personalMessage.length) {
        document.getElementById("typewriter-text").innerHTML += personalMessage.charAt(i);
        i++;
        setTimeout(typeWriter, 40);
    }
}

// Countdown Logic
function startCountdown() {
    const birthday = new Date(); // Replace with actual date if known, or just target 20th year transition
    birthday.setFullYear(2026, 3, 21); // Set to tomorrow or current date for demo
    birthday.setHours(0, 0, 0, 0);

    function update() {
        const now = new Date().getTime();
        const diff = birthday - now;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d < 0 ? '00' : d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 0 ? '00' : h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 0 ? '00' : m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 0 ? '00' : s < 10 ? '0' + s : s;
    }
    
    update();
    setInterval(update, 1000);
}

// 3D Igloo Scene (Simplified Three.js)
function initThree() {
    const container = document.getElementById('three-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Light
    const light = new THREE.PointLight(0xF4C2C2, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Simple Igloo (Sphere with cut bottom)
    const geometry = new THREE.SphereGeometry(3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, shininess: 100 });
    const igloo = new THREE.Mesh(geometry, material);
    scene.add(igloo);

    // Ground
    const groundGeo = new THREE.CircleGeometry(5, 32);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0xC0C0C0 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    camera.position.z = 8;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);
        igloo.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Slideshow Logic
let slideIndex = 0;
function startSlideshow() {
    const slides = document.getElementsByClassName("slide");
    for (let j = 0; j < slides.length; j++) {
        slides[j].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(startSlideshow, 5000); // Change image every 5 seconds
}
