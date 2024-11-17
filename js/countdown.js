// PROGRAM KURSI RODA UNTUK PASIEN ANAK RSCM
function setTargetDateFromAPI() {
    fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
        .then(response => response.json())
        .then(data => {
            const serverTime = new Date(data.utc_datetime); 

            let targetDate = new Date(serverTime);
            targetDate.setDate(targetDate.getDate() + 4); 
            targetDate.setHours(23);
            targetDate.setMinutes(59);
            targetDate.setSeconds(59);

            startCountdown(targetDate);
        })
        .catch(error => {
            console.error("Error fetching server time:", error);
        });
}


function startCountdown(targetDate) {
    function updateCountdown() {
        var now = new Date();
        var distance = targetDate - now; 

        if (distance < 0) {
            document.getElementById("countdown-kursi-roda").innerHTML = "<b>Sisa Waktu</b><br>0 hari 0 jam 0 menit 0 detik";
            clearInterval(interval); 
        } else {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown-kursi-roda").innerHTML =
                "<b>Sisa Waktu</b><br>" + days + " hari " + hours + " jam " + minutes + " menit " + seconds + " detik";
        }
    }
   
    var interval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

setTargetDateFromAPI();
