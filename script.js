// Kunci scroll saat halaman pertama kali diload
document.body.classList.add('locked');

// 1. Tangkap Elemen
const openBtn = document.getElementById('open-btn');
const cover = document.getElementById('cover');
const weddingSong = document.getElementById('wedding-song');
const guestNameElement = document.getElementById('guest-name');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

// 2. Fitur Nama Tamu dari URL (?to=Nama+Tamu)
const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get('to');

if (namaTamu) {
    guestNameElement.innerText = namaTamu.replace(/\+/g, ' ');
}

// 3. Buka Undangan & Putar Lagu
openBtn.addEventListener('click', () => {
    document.body.classList.remove('locked');
    cover.style.transform = 'translateY(-100%)';
    weddingSong.play().catch(err => console.log("Autoplay dicegah browser"));
    musicControl.classList.remove('hide');
});

// 4. Fitur Tombol Musik (Play/Pause)
musicControl.addEventListener('click', () => {
    if (weddingSong.paused) {
        weddingSong.play();
        musicControl.classList.remove('paused');
    } else {
        weddingSong.pause();
        musicControl.classList.add('paused');
    }
});

/* ==========================================
   5. PENGATURAN TANGGAL COUNTDOWN (UBAH DI SINI)
   PENTING: Bulan di JavaScript dimulai dari angka 0!
   Januari = 0, Februari = 1, Maret = 2, ..., Desember = 11.
   
   Format: new Date(Tahun, Bulan, Tanggal, Jam, Menit, Detik)
   Contoh di bawah: 19 Oktober 2031 Jam 08:00
   ========================================== */
const targetDate = new Date(2031, 9, 19, 8, 0, 0).getTime(); 

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('hari').innerText = days < 10 ? '0' + days : days;
    document.getElementById('jam').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('menit').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('detik').innerText = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "<h3>Acara Sedang Berlangsung!</h3>";
    }
}, 1000);