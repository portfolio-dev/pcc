
(function ($) {
  
  "use strict";

    // COUNTER NUMBERS
    jQuery('.counter-thumb').appear(function() {
      jQuery('.counter-number').countTo();
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
    }
});
    
  })(window.jQuery);


// NO COPPY OR DOWNLOAD
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// FORM 
function redirectToSuccessPage() {
  window.location.href = 'sent.html';
}

// DONATION PAGE
let lastSelected = null;

function updateNominal(selectedRadio) {
    const nominalInput = document.getElementById('customNominal');

    if (lastSelected === selectedRadio) {
        selectedRadio.checked = false;
        nominalInput.value = '';
        lastSelected = null;
    } else {
        if (lastSelected) {
            lastSelected.checked = false;
        }
        nominalInput.value = selectedRadio.value;
        lastSelected = selectedRadio;
    }
}

function togglePaymentMethod(method) {
    const transferInfo = document.getElementById('transferInfo');
    const qrisImage = document.getElementById('qrisImage');

    if (method === 'QRIS') {
        transferInfo.style.display = 'none';
        qrisImage.style.display = 'block';
    } else {
        transferInfo.style.display = 'block';
        qrisImage.style.display = 'none';
    }
}

function showConfirmation() {
  const donorName = document.getElementById('donation-name').value;
  const donorEmail = document.getElementById('donation-email').value;
  const donorWA = document.getElementById('donation-wa').value;
  const nominalInput = document.getElementById('customNominal').value || lastSelected?.value || '0';

  // Validasi nominal
  if (nominalInput === '0' || nominalInput.trim() === '') {
    alert("Tentukan Nominal tidak boleh 0 atau kosong!");
    return; // Hentikan eksekusi jika nominal 0
  }

  // Validasi: cek apakah nama, email, dan nomor WhatsApp diisi
  let message = '';

  if (!donorName) message += "Nama harus diisi!\n";
  if (!donorEmail) message += "Email harus diisi!\n";
  if (!donorWA) message += "No. Whatsapp harus diisi!\n";

  // Validasi format email
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (donorEmail && !emailPattern.test(donorEmail)) {
      message += "Format email tidak valid!\n";
  }

  // Tampilkan alert jika ada pesan kesalahan
  if (message) {
      alert(message);
      return; // Hentikan eksekusi jika ada yang kosong atau tidak valid
  }

  const donationSection = document.getElementById('donationSection');
  const confirmationSection = document.getElementById('confirmationSection');
  const donationTitle = document.getElementById('donationTitle');
  
  donationSection.style.display = 'none';
  confirmationSection.style.display = 'block';
  donationTitle.style.display = 'none';

  const fields = {
      donationType: document.querySelector('input[name="DonationFrequency"]:checked').value,
      donationAmount: nominalInput,
      donorName: donorName,
      donorEmail: donorEmail,
  };

  document.getElementById('donationType').innerText = fields.donationType;
  document.getElementById('donationAmountDisplay').innerText = fields.donationAmount;
  document.getElementById('donorName').innerText = fields.donorName;
  document.getElementById('donorEmail').innerText = fields.donorEmail;
  document.getElementById('donorWA').innerText = donorWA;

  togglePaymentMethod(document.querySelector('input[name="DonationPayment"]:checked').value);
}

function goBack() {
    window.location.href = 'donate.html';
}

//COPY REKENING
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(err => {
      console.error("Gagal menyalin: ", err);
  });
}

function submitConfirmation() {
  const donorName = document.getElementById('donation-name').value;
  const donorEmail = document.getElementById('donation-email').value;
  const donorWA = document.getElementById('donation-wa').value;
  const nominalInput = document.getElementById('customNominal').value || lastSelected?.value || '0';

  // Validasi yang sama seperti sebelumnya
  if (nominalInput === '0' || nominalInput.trim() === '') {
      alert("Tentukan Nominal tidak boleh 0 atau kosong!");
      return;
  }

  // Mendapatkan metode pembayaran yang dipilih
  const paymentMethod = document.querySelector('input[name="DonationPayment"]:checked').value;

  // Ganti dengan URL Google Form Anda
  const googleFormURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdWgAvNnLUIMKSvoK1L735tYoulkOaQwyTU8zKkRtTYIEafNA/formResponse';

  // Parameter untuk dikirim
  const params = new URLSearchParams();
  params.append('entry.791086601', donorName); // ID entry untuk nama
  params.append('entry.476728515', donorEmail); // ID entry untuk email
  params.append('entry.960053065', donorWA); // ID entry untuk WA
  params.append('entry.544155490', nominalInput); // ID entry untuk nominal
  params.append('entry.263432093', paymentMethod); // ID entry untuk metode pembayaran

  // Mengirim data menggunakan fetch
  fetch(googleFormURL, {
      method: 'POST',
      body: params,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  })

  setTimeout(() => {
      window.location.href = 'index.html'; // Arahkan ke index.html setelah beberapa detik
  }, 1000); // Waktu tunggu dalam milidetik (misalnya, 2000 = 2 detik)

  return true; // Izinkan pengiriman form
}