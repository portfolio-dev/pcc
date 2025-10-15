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

// HASIL UANG ATAU PRODUK
document.querySelectorAll('.donation-result-radio').forEach(function(radio) {
  radio.addEventListener('change', function() {
      // Pastikan hanya satu yang terpilih
      if (this.checked) {
          document.querySelectorAll('.donation-result-radio').forEach(function(otherRadio) {
              if (otherRadio !== radio) {
                  otherRadio.checked = false;
              }
          });

          // Cek apakah radio button Produk yang dipilih
          if (this.value === 'Hasil Produk') {
              // Jika Produk dipilih, sembunyikan elemen-elemen yang terkait dengan Uang
              document.getElementById('donatur-uang').style.display = 'none';
              document.getElementById('donatur-produk').style.display = 'block';

          } else if (this.value === 'Hasil Uang') {
              // Jika Uang dipilih, tampilkan kembali elemen-elemen tersebut
              document.getElementById('donatur-uang').style.display = 'block';
              document.getElementById('donatur-produk').style.display = 'none';
              
          }
      }
  });
});

function showResults() {
  // Mengubah elemen dengan ID 'hasil-donasi' menjadi block
  document.getElementById('hasil-donasi').style.display = 'block';

  // Mengubah elemen dengan ID 'deskripsi-donasi' menjadi none
  document.getElementById('deskripsi-donasi').style.display = 'none';
}

function showBeforeResults() {
  // Mengubah elemen dengan ID 'deskripsi-donasi' menjadi none
  document.getElementById('deskripsi-donasi').style.display = 'block';

  // Mengubah elemen dengan ID 'hasil-donasi' menjadi block
  document.getElementById('hasil-donasi').style.display = 'none';  
}


// PILIH UANG ATAU PRODUK
document.querySelectorAll('.donation-radio').forEach(function(radio) {
  radio.addEventListener('change', function() {
      // Pastikan hanya satu yang terpilih
      if (this.checked) {
          document.querySelectorAll('.donation-radio').forEach(function(otherRadio) {
              if (otherRadio !== radio) {
                  otherRadio.checked = false;
              }
          });

          // Cek apakah radio button Produk yang dipilih
          if (this.value === 'Produk') {
              // Jika Produk dipilih, sembunyikan elemen-elemen yang terkait dengan Uang
              document.getElementById('amount-pilihan').style.display = 'none';
              document.getElementById('amount1').style.display = 'none';
              document.getElementById('amount2').style.display = 'none';
              document.getElementById('amount3').style.display = 'none';
              document.getElementById('amount4').style.display = 'none';
              document.getElementById('amount5').style.display = 'none';
              document.getElementById('amount6').style.display = 'none';
              document.getElementById('nominal-uang').style.display = 'none';
              document.getElementById('produk-donasi').style.display = 'block';
              document.getElementById('uang-transfer-qris').style.display = 'none';
              document.getElementById('tampil-nominal').style.display = 'none';
              document.getElementById('produk-kirim').style.display = 'block';

              document.getElementById('keterangan-produk').style.display = 'block';

          } else if (this.value === 'Uang') {
              // Jika Uang dipilih, tampilkan kembali elemen-elemen tersebut
              document.getElementById('amount-pilihan').style.display = 'block';
              document.getElementById('amount1').style.display = 'block';
              document.getElementById('amount2').style.display = 'block';
              document.getElementById('amount3').style.display = 'block';
              document.getElementById('amount4').style.display = 'block';
              document.getElementById('amount5').style.display = 'block';
              document.getElementById('amount6').style.display = 'block';
              document.getElementById('nominal-uang').style.display = 'block';
              document.getElementById('produk-donasi').style.display = 'none';
              document.getElementById('uang-transfer-qris').style.display = 'block';
              document.getElementById('tampil-nominal').style.display = 'block';
              document.getElementById('produk-kirim').style.display = 'none';

              document.getElementById('keterangan-produk').style.display = 'none';

          }
      }
  });
});


// NO COPPY OR DOWNLOAD
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});


// DONATION PAGE
let lastSelected = null;

function updateNominal(selectedRadio) {
  const nominalInput = document.getElementById('custom-nominal');

  if (lastSelected === selectedRadio) {
      selectedRadio.checked = false;
      nominalInput.value = '0';
      lastSelected = null;
  } else {
      if (lastSelected) {
          lastSelected.checked = false;
      }
      nominalInput.value = formatNumber(selectedRadio.value);
      lastSelected = selectedRadio;
  }
}

// TENTUKAN NOMINAL
function formatNumber(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// PAYMENT METHOD
document.querySelectorAll('.payment-radio').forEach(function(radio) {
  radio.addEventListener('change', function() {
      // Pastikan hanya satu yang terpilih
      if (this.checked) {
          document.querySelectorAll('.payment-radio').forEach(function(otherRadio) {
              if (otherRadio !== radio) {
                  otherRadio.checked = false;
              }
          });         
      }
  });
});

// TEXTAREA PRODUK
function tambahItem() {
  // Ambil nilai produk, jumlah, dan satuan dari inputan
  var produk = document.getElementById("produk1").value;
  var jumlah = document.getElementById("jumlah1").value;
  var satuan = document.getElementById("satuan1").value;

  // Periksa apakah produk, jumlah, dan satuan diisi
  if (produk && jumlah && satuan) {
      // Ambil textarea
      var textarea = document.getElementById("donation-detail");

      // Format data yang ingin ditambahkan ke textarea
      var newEntry = jumlah + " " + satuan + " : " + produk +  ", \n";
      
      // Tambahkan data ke dalam textarea
      textarea.value += newEntry;

      // Kosongkan inputan produk, jumlah, dan satuan setelah menambah
      document.getElementById("produk1").value = '';
      document.getElementById("jumlah1").value = '';
      document.getElementById("satuan1").value = 'pcs'; // Reset dropdown ke default

      // Set fokus kembali ke input produk
      document.getElementById("produk1").focus();
  } else {
      alert("Silakan isi nama produk, jumlah, dan pilih satuan.");
  }
}

// Fungsi untuk mereset form
function resetForm() {
  // Reset inputan produk, jumlah, satuan, dan textarea
  document.getElementById("produk1").value = '';
  document.getElementById("jumlah1").value = '';
  document.getElementById("satuan1").value = 'pcs'; // Reset dropdown ke default
  document.getElementById("donation-detail").value = ''; // Kosongkan textarea

  alert("Produk Donasi berhasil dihapus!.");
}

// Agar textarea bisa menyesuaikan ukurannya sesuai input
var textarea = document.getElementById("donation-detail");
textarea.addEventListener("input", function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

// CONFIRMATION
function showConfirmation() {
  const errorMessageContainer = document.getElementById('error-messages');
  errorMessageContainer.innerHTML = '';

  const donorName = document.getElementById('donation-name').value;
  // const donorEmail = document.getElementById('donation-email').value;
  const donorTlp = document.getElementById('donation-tlp').value;
  const nominalInput = document.getElementById('custom-nominal').value.replace(/\./g, ''); 
  const donorDetail = document.getElementById('donation-detail').value;
  const donorType = document.querySelector('input.donation-radio:checked')?.value;

  // VALUE VALIDATION
  if (donorType === 'Produk' && donorDetail === '') {
    errorMessageContainer.innerHTML += "<hr>Produk Donasi harus diisi !<br>";
  } else {
    errorMessageContainer.innerHTML += "";
  }

  if (donorType === 'Produk' && (nominalInput === '' || nominalInput === '0')) {
    errorMessageContainer.innerHTML += "";
  } else {
    if (nominalInput === '') {
      errorMessageContainer.innerHTML += "<hr>Nominal harus diisi !<br>";
    } else if (isNaN(nominalInput) || parseInt(nominalInput) <= 0) {
        errorMessageContainer.innerHTML += "<hr>Nominal tidak boleh bernilai 0 !<br>";
    } 
  }

  // DONATION FORM VALIDATION
  let message = '';

  if (!donorName) message += "<hr>Nama harus diisi !<br>";
  // if (!donorEmail) message += "<hr>Email harus diisi!<br>";
  if (!donorTlp) message += "<hr>Telepon harus diisi !<br>";

  // EMAIL VALIDATION
  // const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  // if (donorEmail && !emailPattern.test(donorEmail)) {
  //     message += "<hr>Penulisan email salah!<br>";
  // }

  if (errorMessageContainer.innerHTML || message) {
      errorMessageContainer.innerHTML += message;
      return; 
  }

  const donationSection = document.getElementById('donation-section');
  const confirmationSection = document.getElementById('confirmation-section');
  const donationTitle = document.getElementById('donation-title');

  donationSection.style.display = 'none';
  confirmationSection.style.display = 'block';
  donationTitle.style.display = 'none';

const fields = {
    donationTipe : document.querySelector('input.donation-radio:checked')?.value,
    donationAmount: nominalInput,
    donorDetail: donorDetail,
    donorName: donorName,
    // donorEmail: donorEmail,
};

  document.getElementById('donation-tipe').innerText = fields.donationTipe;
  document.getElementById('donation-amount-display').innerText = formatNumber(fields.donationAmount);
  document.getElementById('donation-detail-display').innerText = fields.donorDetail;
  document.getElementById('donor-name').innerText = fields.donorName;
  // document.getElementById('donor-email').innerText = fields.donorEmail;
  document.getElementById('donor-tlp').innerText = donorTlp;

  togglePaymentMethod(document.querySelector('input[name="DonationPayment"]:checked').value);
}

function goBack() {
    window.location.href = 'solo-charity-trip-2025.html';
}

  //COPY REKENING
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error("Gagal menyalin: ", err);
    });
    alert("Nomor rekening sudah disalin.");
  }

   //COPY ALAMAT
   function copyToClipboard2(text) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error("Gagal menyalin: ", err);
    });
    alert("Alamat sudah disalin.");
  }

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('custom-nominal').addEventListener('input', function(e) {
      const rawValue = e.target.value.replace(/\D/g, ''); 
      e.target.value = formatNumber(rawValue);
  });
});

// FORMAT NUMBER
function formatNumber(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function submitConfirmation() {
    
  const donationType = document.querySelector('input.donation-radio:checked')?.value;
  const nominalInput = document.getElementById('custom-nominal').value.replace(/\./g, '') || lastSelected?.value || '0';
  const donorDetail = document.getElementById('donation-detail').value;
  const donorName = document.getElementById('donation-name').value;
  // const donorEmail = document.getElementById('donation-email').value;
  const donorTlp = document.getElementById('donation-tlp').value;
  const paymentMethod = document.querySelector('input.payment-radio:checked')?.value;
  const donorNote = document.getElementById('donation-note').value;

  if (nominalInput.value === '') {
    nominalInput.value = '0';
  }

  // URL GOOGLE FORM
  const googleFormURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSetZq-Q-6W6oAn4yGgYios1RpLhKoigYtV7_Jbv7Zz-tUXijw/formResponse';

  // PARAMETER
  const params = new URLSearchParams();
  params.append('entry.1274723429', donorName); // ID ENTRY FOR NAME
  // params.append('entry.1711964533', donorEmail); // ID ENTRI FOR EMAIL
  params.append('entry.1479109352', donorTlp); // ID ENTRY FOR NUMBER OR WHATSAPP
  params.append('entry.433284780', nominalInput); // ID ENTRY FOR VALUE
  params.append('entry.1526120968', donorDetail); // ID ENTRY FOR PRODUK
  params.append('entry.1082800990', paymentMethod); // ID ENTRY FOR PAYMENT
  params.append('entry.573797881', donationType); // ID ENTRY FOR KIND OF DONATION
  params.append('entry.1469710524', donorNote); // ID ENTRY FOR NOTE
 
  // FETCH SEND
  fetch(googleFormURL, {
      method: 'POST',
      body: params,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  });

  setTimeout(() => {
      window.location.href = '/donate-upload.html';
  }, 500); 
  return true; 
}

function upload() {
  document.getElementById('loading').style.display = 'inline-block'; 
  setTimeout(() => {
      document.getElementById('loading').style.display = 'none'; 
      alert('Terjadi kesalahan saat mengunggah file! Anda akan dialihkan ke halaman GoogleForms untuk mengunggah Bukti Transfer Anda. Mohon maaf atas ketidaknyamanan ini & terima kasih.'); 
  }, 2000);

  setTimeout(() => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSdyxLaJ9MUj3tRiBGPDcS5hR7ldlmXPC-Bnt7TEnTfTsHZD_Q/viewform'; 
  }, 5000);  
}




