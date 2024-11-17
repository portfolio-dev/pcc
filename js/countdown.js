// Fungsi untuk mengatur dan memulai countdown berdasarkan target waktu yang diinginkan
function setTargetDateFromAPI(targetId, daysToAdd) {
    fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
        .then(response => response.json())
        .then(data => {
            const serverTime = new Date(data.utc_datetime);

            let targetDate = new Date(serverTime);
            targetDate.setDate(targetDate.getDate() + daysToAdd);
            targetDate.setHours(0);
            targetDate.setMinutes(0);
            targetDate.setSeconds(0);

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
            document.getElementById(targetId).innerHTML = "<b>Sisa Waktu</b><br>0 hari 0 jam 0 menit 0 detik";
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
        { id: "countdown-kursi-roda", daysToAdd: 5 },
        { id: "countdown-langkah-kebaikan", daysToAdd: 356 },
        { id: "countdown-operasional-hoh", daysToAdd: 100 }
    ];

    countdownElements.forEach(function(element) {
        var targetDate = localStorage.getItem(element.id);

        if (!targetDate) {
            setTargetDateFromAPI(element.id, element.daysToAdd);
        } else {
            targetDate = new Date(parseInt(targetDate));
            startCountdown(element.id, targetDate);
        }
    });
}

// Panggil fungsi untuk memulai countdown untuk semua elemen
initializeCountdowns();
