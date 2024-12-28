function goOut() {
    // Menghapus status login dari sessionStorage
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '/login-anggota.html'; // Arahkan ke halaman login setelah log out
}

// Array data login yang berisi nomor WhatsApp dan password acak
const users = [
    {
        whatsapp: '082132936477', // Nomor WhatsApp anggota 1
        password: 'aBcd12',      // Password acak 8 digit untuk anggota 1
        redirectUrl: 'user/ema-rosyadi.html' // URL halaman setelah login untuk anggota 1
    },
    {
        whatsapp: '082132936433', // Nomor WhatsApp anggota 2
        password: 'Abc123',     // Password acak 8 digit untuk anggota 2
        redirectUrl: 'user/eldi.html' // URL halaman setelah login untuk anggota 2
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

//tombol navigasi member
document.addEventListener('DOMContentLoaded', function () {
    // Menangani klik pada link Beranda
    document.querySelector('a[href="javascript:void(0)"][onclick="window.location.href=\'\';"]').addEventListener('click', function () {
        toggleView('beranda-member');
    });

    // Menangani klik pada link Profil
    document.querySelector('a[href="javascript:void(0)"][onclick=""]').addEventListener('click', function () {
        toggleView('profil-member');
    });

    // Fungsi untuk menampilkan dan menyembunyikan tampilan
    function toggleView(viewId) {
        // Menyembunyikan semua div dengan ID tertentu
        const allViews = ['beranda-member', 'profil-member'];
        allViews.forEach(function (view) {
            const viewElement = document.getElementById(view);
            if (view === viewId) {
                viewElement.style.display = 'block'; // Menampilkan tampilan yang dipilih
            } else {
                viewElement.style.display = 'none'; // Menyembunyikan tampilan lainnya
            }
        });
    }
});