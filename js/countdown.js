// Fungsi untuk mengatur dan memulai countdown berdasarkan target tanggal yang diinginkan
function setTargetDateFromAPI(targetId, targetDateString) {
    fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta')
        .then(response => response.json())
        .then(data => {
            const serverTime = new Date(data.datetime);

            // Mengatur target tanggal sesuai dengan yang diinginkan, misalnya 22 November 2024
            const targetDate = new Date(targetDateString);

            localStorage.setItem(targetId, targetDate.getTime());
            startCountdown(targetId, targetDate);
        })
        .catch(error => {
            console.error("Error fetching server time:", error);
        });
}

// Fungsi untuk memulai countdown dan memperbarui elemen HTML
function startCountdown(targetId, targetDate) {
    function updateCountdown() {
        var now = new Date();
        var distance = targetDate - now;

        if (distance < 0) {
            document.getElementById(targetId).innerHTML = "<b>Kampaye Ini Sudah Berakhir</b><br>0 hari 0 jam 0 menit 0 detik";
            clearInterval(interval);
        } else {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById(targetId).innerHTML =
                "<b>Sisa Waktu</b><br>" + days + " hari " + hours + " jam " + minutes + " menit " + seconds + " detik";
        }
    }

    var interval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Fungsi untuk memulai countdown untuk masing-masing target
function initializeCountdowns() {
    var countdownElements = [
        { id: "countdown-ancol-charity-trip-2024", targetDate: "2024-12-10T00:00:00Z" },
        { id: "countdown-solo-charity-trip-2025", targetDate: "2025-02-06T00:00:00Z" },
        { id: "countdown-operasional-hoh", targetDate: "2024-12-30T00:00:00Z" }
    ];

    countdownElements.forEach(function(element) {
        var targetDate = localStorage.getItem(element.id);

        if (!targetDate) {
            setTargetDateFromAPI(element.id, element.targetDate);
        } else {
            targetDate = new Date(parseInt(targetDate));
            startCountdown(element.id, targetDate);
        }
    });
}

// Panggil fungsi untuk memulai countdown untuk semua elemen
initializeCountdowns();
