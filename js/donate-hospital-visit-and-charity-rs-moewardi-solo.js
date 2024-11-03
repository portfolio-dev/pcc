
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
      nominalInput.value = formatNumber(selectedRadio.value);
      lastSelected = selectedRadio;
  }
}

// Fungsi untuk memformat angka dengan titik sebagai pemisah ribuan
function formatNumber(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

function togglePaymentMethod(paymentType) {
  // Tampilkan informasi yang sesuai dengan metode pembayaran yang dipilih
  document.getElementById('transferInfo').style.display = paymentType === 'Transfer' ? 'block' : 'none';
  document.getElementById('qrisImage').style.display = paymentType === 'QRIS' ? 'block' : 'none';
  
  // Ubah teks tombol sesuai dengan metode pembayaran
  const confirmButton = document.getElementById('confirmButton');
  if (paymentType === 'Transfer') {
      confirmButton.textContent = 'Sudah Bayar via Transfer';
  } else if (paymentType === 'QRIS') {
      confirmButton.textContent = 'Sudah Bayar via QRIS';
  }
}

function showConfirmation() {
  // Reset pesan kesalahan sebelumnya
  const errorMessageContainer = document.getElementById('errorMessages');
  errorMessageContainer.innerHTML = '';

  const donorName = document.getElementById('donation-name').value;
  const donorEmail = document.getElementById('donation-email').value;
  const donorWA = document.getElementById('donation-wa').value;
  const nominalInput = document.getElementById('customNominal').value.replace(/\./g, ''); // Menghapus titik untuk validasi

  // Validasi nominal
  if (nominalInput === '' || isNaN(nominalInput) || parseInt(nominalInput) <= 0) {
      errorMessageContainer.innerHTML += "<hr>Tentukan Nominal tidak boleh kosong atau 0!<br>";
  }

  // Validasi: cek apakah nama, email, dan nomor WhatsApp diisi
  let message = '';

  if (!donorName) message += "<hr>Nama harus diisi!<br>";
  if (!donorEmail) message += "<hr>Email harus diisi!<br>";
  if (!donorWA) message += "<hr>Nomor Whatsapp harus diisi!<br>";

  // Validasi format email
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (donorEmail && !emailPattern.test(donorEmail)) {
      message += "<hr>Penulisan email salah!<br>";
  }

  // Tampilkan alert jika ada pesan kesalahan
  if (errorMessageContainer.innerHTML || message) {
      errorMessageContainer.innerHTML += message;
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
  document.getElementById('donationAmountDisplay').innerText = formatNumber(fields.donationAmount); // Format angka sebelum ditampilkan
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

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('customNominal').addEventListener('input', function(e) {
      // Ambil nilai dari input, hapus karakter non-digit
      const rawValue = e.target.value.replace(/\D/g, ''); // Hapus karakter non-digit
      // Format nilai menjadi format dengan titik
      e.target.value = formatNumber(rawValue);
  });
});

// Fungsi untuk memformat angka dengan titik sebagai pemisah ribuan
function formatNumber(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function submitConfirmation() {
  // Reset pesan kesalahan sebelumnya
  const errorMessageContainer = document.getElementById('errorMessages');
  errorMessageContainer.innerHTML = '';

  const donorName = document.getElementById('donation-name').value;
  const donorEmail = document.getElementById('donation-email').value;
  const donorWA = document.getElementById('donation-wa').value;

  // Ambil nilai nominal dan hapus titik sebelum pengiriman
  const nominalInput = document.getElementById('customNominal').value.replace(/\./g, '') || lastSelected?.value || '0';

  // Validasi nominal
  if (nominalInput === '0' || nominalInput.trim() === '') {
      errorMessageContainer.innerHTML += "Tentukan Nominal tidak boleh 0 atau kosong!<br>";
  }

  // Mendapatkan metode pembayaran yang dipilih
  const paymentMethod = document.querySelector('input[name="DonationPayment"]:checked').value;

  // Menangkap jenis donasi
  const donationType = document.querySelector('input[name="DonationFrequency"]:checked').value;

  // URL Google Form
  const googleFormURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe3cZAkPOF7xsjECb4KlkScB5T8Ol9O2uui-6c2vlc-hupj-A/formResponse';

  // Parameter untuk dikirim
  const params = new URLSearchParams();
  params.append('entry.791086601', donorName); // ID entry untuk nama
  params.append('entry.476728515', donorEmail); // ID entry untuk email
  params.append('entry.960053065', donorWA); // ID entry untuk WA
  params.append('entry.544155490', nominalInput); // ID entry untuk nominal (tanpa titik)
  params.append('entry.263432093', paymentMethod); // ID entry untuk metode pembayaran
  params.append('entry.1864038115', donationType); // ID entry untuk jenis donasi

  // Mengirim data menggunakan fetch
  fetch(googleFormURL, {
      method: 'POST',
      body: params,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  });

  setTimeout(() => {
      window.location.href = 'donate-upload.html'; // Arahkan ke index.html setelah beberapa detik
  }, 500); // Waktu tunggu dalam milidetik (misalnya, 1000 = 1 detik)

  return true; // Izinkan pengiriman form
}

function upload() {
  document.getElementById('loading').style.display = 'inline-block'; // Tampilkan gambar loading
  // Simulasikan proses unggah
  setTimeout(() => {
      document.getElementById('loading').style.display = 'none'; // Sembunyikan gambar loading setelah 2 detik
      alert('Terjadi kesalahan saat mengunggah file! Anda akan dialihkan ke halaman GoogleForms untuk mengunggah Bukti Transfer Anda. Mohon maaf atas ketidaknyamanan ini & terima kasih.'); // Ganti ini dengan logika unggah Anda
  }, 2000);

  setTimeout(() => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSdyxLaJ9MUj3tRiBGPDcS5hR7ldlmXPC-Bnt7TEnTfTsHZD_Q/viewform'; // Arahkan ke index.html setelah beberapa detik
  }, 10000);
  
}