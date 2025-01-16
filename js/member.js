function goOut() {
    // Menghapus status login dari sessionStorage
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '/login-anggota.html'; // Arahkan ke halaman login setelah log out
}

// Array data login yang berisi nomor WhatsApp dan password acak
const users = [
    {
        whatsapp: '082132936477', 
        password: 'Abc123',      
        redirectUrl: 'user/ema-rosyadi.html' 
    },
    {
        whatsapp: '085870842284', 
        password: '123456',     
        redirectUrl: 'user/irma-tri-wulandari.html' 
    },
    {
        whatsapp: '0895409370307', 
        password: '123456',     
        redirectUrl: 'user/weni-nur-khasanah.html' 
    },
    {
        whatsapp: '085879379589',
        password: '123456',     
        redirectUrl: 'user/amanda-dwi-ayu-saputri.html' 
    },
    {
        whatsapp: '085180960911', 
        password: '123456',     
        redirectUrl: 'user/retno-putriningsih.html' 
    },
    {
        whatsapp: '085647577776',
        password: '123456',     
        redirectUrl: 'user/prakoso-pribadi.html' 
    },
    {
        whatsapp: '085757587421', 
        password: '123456',     
        redirectUrl: 'user/sumarni.html' 
    }
    
    // Tambahkan lebih banyak data anggota di sini jika perlu
];

// Fungsi untuk memvalidasi login
function validateLogin(event) {
    event.preventDefault(); // Mencegah form dari refresh halaman

    // Ambil nilai input dari form
    const whatsappInput = document.getElementById('parent-telepon').value;
    const passwordInput = document.getElementById('member-code').value;

    // Periksa apakah data login valid
    const user = users.find(u => u.whatsapp === whatsappInput && u.password === passwordInput);

    if (user) {
        // Simpan status login ke sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');

        // Jika login berhasil, arahkan ke halaman yang sesuai dengan anggota
        window.location.href = user.redirectUrl; // Menggunakan URL yang sudah ditentukan pada anggota
    } else {
        // Jika login gagal, beri tahu pengguna
        alert('Nomor WhatsApp atau password salah. Silakan coba lagi.');
    }
}

// Menambahkan event listener untuk tombol show/hide password
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('member-code');

togglePassword.addEventListener('click', function() {
    // Men-toggle tipe password antara 'text' dan 'password'
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    
    // Menambahkan/menghapus ikon eye-fill (open/close)
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-fill');
});

//MINTA ULANG KODE MASUK
// Menampilkan pop-up verifikasi
function showPopupResend() {
    document.getElementById("popup").style.display = "flex";
}

// Menutup pop-up
function closePopupResend() {
    document.getElementById("popup").style.display = "none";
}

// Menampilkan pop-up kode akses
function showCodeResend() {
    document.getElementById("popup-code").style.display = "flex";
}

// Menutup pop-up
function closeCodeResend() {
    document.getElementById("popup-code").style.display = "none";
}           
            

// Fungsi ini untuk mengalihkan setelah form berhasil disubmit (untuk Google Form)
function codeChangedResend() {
    window.location.href = "login-anggota.html"; // Ganti dengan halaman yang diinginkan
}

function submitForm() {
    alert('Kode masuk akan dikirimkan ke Nomor Whatsapp Anda!');
    return true; // Izinkan form untuk disubmit
}