// Simulasi Loading Screen
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('halaman1').classList.add('active');
        }, 1000);
    }, 3000); // Tampil selama 3 detik
};

const teksUcapan = "Selamat ulang tahun, sayangku... ❤️ Terima kasih sudah bertahan sampai sejauh ini, terima kasih sudah menjadi orang yang paling sabar menghadapi aku. Aku sayang banget sama kamu. Semoga di umur yang baru ini, segala doa baikmu dikabulkan semesta. I love you!";

function mulai() {
    document.getElementById('musikUltah').play();
    nextHalaman(2);
    hujanLove();
}

function nextHalaman(n) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById('halaman' + n).classList.add('active');
    if(n === 2) startTypewriter();
}

function startTypewriter() {
    let i = 0;
    let speed = 60;
    const el = document.getElementById("typewriter");
    function type() {
        if (i < teksUcapan.length) {
            el.innerHTML += teksUcapan.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            document.getElementById('btnLanjut').style.display = 'inline-block';
        }
    }
    type();
}

function tiupLilin() {
    document.getElementById('api').style.display = 'none';
    document.getElementById('asap').style.display = 'block';
    document.getElementById('petunjuk').style.display = 'none';
    
    setTimeout(() => {
        document.getElementById('asap').style.opacity = '0';
        document.getElementById('wish-box').style.display = 'block';
    }, 1000);
}

function kirimWA() {
    const harapan = document.getElementById('harapanUser').value;
    const nomorWA = "6283844641151";
    if (harapan.trim() === "") {
        alert("Tulis harapannya dulu ya sayang..");
        return;
    }
    const pesan = encodeURIComponent("Hai Sayang! Ini harapanku di hari ulang tahunku: \n\n" + harapan);
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
}

function hujanLove() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.className = "heart";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
        document.getElementById("love-container").appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 400);
}