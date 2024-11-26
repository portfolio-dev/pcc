function toggleDonationType() {
  const isProduk = document.getElementById('donation-produk').checked; 
  const productInput = document.getElementById('product-input'); 
  const amountElements = [
      document.getElementById('amount-section'),  
      document.getElementById('amount1'),    
      document.getElementById('amount2'),    
      document.getElementById('amount3'),   
      document.getElementById('amount4'),   
      document.getElementById('amount5'), 
      document.getElementById('amount6'),  
  ]; 

  if (isProduk) {
      // Jika Produk dipilih, sembunyikan input nominal uang
      productInput.style.display = 'block';
      amountElements.forEach(function(el) {
        el.style.display = 'none';  // Sembunyikan input nominal
      });
  } else {
      // Jika Uang dipilih, tampilkan input nominal uang
      productInput.style.display = 'none';
      amountElements.forEach(function(el) {
        el.style.display = 'block';  // Tampilkan input nominal
      });
  }
}

// Memastikan toggleDonationType dijalankan setelah DOM dimuat
document.addEventListener("DOMContentLoaded", function() {
  toggleDonationType(); 
});

// Event listener untuk mendeteksi perubahan pilihan antara "Uang" atau "Produk"
document.getElementById('donation-uang').addEventListener('change', toggleDonationType);
document.getElementById('donation-produk').addEventListener('change', toggleDonationType);


//
function togglePaymentMethod(paymentType) {
  const transferInfo = document.getElementById('transfer-info');
  const qrisImage = document.getElementById('qris-image');
  const kirimProduk = document.getElementById('kirim-produk');
  const confirmButton = document.getElementById('confirm-button');
  const produkDetailsConfirm = document.getElementById('produk-details-confirm');  

  produkDetailsConfirm.style.display = 'none';  
  
  // Ambil nilai dari tipe donasi yang dipilih
  const donationType = document.querySelector('input[name="DonationType"]:checked').value;

  // Cek jika tipe donasi Produk yang dipilih
  if (donationType === 'Produk') { 
      // Jika Produk dipilih, hanya tampilkan kirimProduk
      transferInfo.style.display = 'none';
      qrisImage.style.display = 'none';
      produkDetailsConfirm.style.display = 'block';
      kirimProduk.style.display = 'block';  // Menampilkan Kirim Produk
      confirmButton.textContent = 'Kirim';  // Menyesuaikan teks tombol      
      
      // Setel pilihan radio button metode pembayaran ke "Kirim"
      document.getElementById('payment-send').checked = true;
      document.getElementById('payment-transfer').checked = false;
      document.getElementById('payment-qris').checked = false;
      
  } else if (donationType === 'Uang') {
      // Jika Uang dipilih, hanya tampilkan transfer dan qris
      transferInfo.style.display = paymentType === 'Transfer' ? 'block' : 'none';
      qrisImage.style.display = paymentType === 'QRIS' ? 'block' : 'none';
      kirimProduk.style.display = 'none';  // Menyembunyikan Kirim Produk
                    
  }

 
  // // Menampilkan atau menyembunyikan elemen sesuai dengan metode pembayaran
  document.getElementById('transfer-information').style.display = paymentType === 'Transfer' ? 'block' : 'none';
  document.getElementById('qris-picture').style.display = paymentType === 'QRIS' ? 'block' : 'none';
  document.getElementById('kirim-produk-donasi').style.display = paymentType === 'Kirim' ? 'block' : 'none';
}


//
let lastSelected = null;

function updateNominal(selectedRadio) {
  const nominalInput = document.getElementById('custom-nominal');

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


document.querySelector('#custom-nominal').addEventListener('input', function(e) {
  const rawValue = e.target.value.replace(/\D/g, '');
  e.target.value = formatNumber(rawValue);
});

//
function formatNumber(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
} 

//
function showConfirmation() {
  const errorMessageContainer = document.getElementById('error-messages');
  errorMessageContainer.innerHTML = '';

  const donorName = document.getElementById('donation-name').value;
  const donorEmail = document.getElementById('donation-email').value;
  const donorTlp = document.getElementById('donation-tlp').value;
  const nominalInput = document.getElementById('custom-nominal').value.replace(/\./g, ''); 
  const produkDetails = document.getElementById('produk-details').value.trim();
  const paymentMethod = document.querySelector('input[name="DonationPayment"]:checked').value;
  const donationType = document.querySelector('input[name="DonationType"]:checked').value;
  
  if (nominalInput === '' || isNaN(nominalInput) || parseInt(nominalInput) <= 0) {
      errorMessageContainer.innerHTML += "<hr>Tentukan Nominal, tidak boleh kosong atau bernilai 0 !<br>";
  }
  
  if (donationType === 'Produk' && !produkDetails) {
    errorMessageContainer.innerHTML += "<hr>Anda belum menentukan donasi produk!<br>";
  }

  let message = '';

  if (!donorName) message += "<hr>Nama harus diisi!<br>";
  if (!donorEmail) message += "<hr>Email harus diisi!<br>";
  if (!donorTlp) message += "<hr>Telepon harus diisi!<br>";

  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (donorEmail && !emailPattern.test(donorEmail)) {
      message += "<hr>Penulisan email salah!<br>";
  }

  if (errorMessageContainer.innerHTML || message) {
      errorMessageContainer.innerHTML += message;
      return; 
  }

   // Show confirmation section
   const donationSection = document.getElementById('donation-section-1');
   const confirmationSection = document.getElementById('confirmation-section');
   const donationTitle = document.getElementById('donation-title');
   const donationDescription = document.getElementById('donation-description');
 
   donationSection.style.display = 'none';
   confirmationSection.style.display = 'block';
   donationTitle.style.display = 'none';
   donationDescription.style.display = 'none';
 
   const fields = {
       donationType: donationType,
       donationAmount: nominalInput,
       donorName: donorName,
       donorEmail: donorEmail,
       produkDetails: produkDetails,
   };
 
   document.getElementById('type-donation').innerText = fields.donationType;
   document.getElementById('donation-amount-display').innerText = formatNumber(fields.donationAmount);
   document.getElementById('details-produk').innerText = fields.produkDetails;
   document.getElementById('donor-name').innerText = fields.donorName;
   document.getElementById('donor-email').innerText = fields.donorEmail;
   document.getElementById('donor-tlp').innerText = donorTlp;
    
   togglePaymentMethod(paymentMethod);
 
   if (paymentMethod === 'Kirim') {
       document.getElementById('transfer-information').style.display = 'none';
       document.getElementById('qris-picture').style.display = 'none';
   }
}

function submitConfirmation() {
  const errorMessageContainer = document.getElementById('error-messages');
  errorMessageContainer.innerHTML = ''; // Menghapus pesan kesalahan sebelumnya
  
  const donationType = document.querySelector('input[name="DonationType"]:checked').value;
  const nominalInput = document.getElementById('custom-nominal').value.replace(/\./g, '') || lastSelected?.value || '0';
  
  const produkDetails = document.getElementById('produk-details').value.trim() || '';

  const donorName = document.getElementById('donation-name').value;
  const donorEmail = document.getElementById('donation-email').value;
  const donorTlp = document.getElementById('donation-tlp').value;

  const paymentMethod = document.querySelector('input[name="DonationPayment"]:checked').value;
  const donationNote = document.getElementById('donation-note').value;


  const googleFormURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSetZq-Q-6W6oAn4yGgYios1RpLhKoigYtV7_Jbv7Zz-tUXijw/formResponse';

  const params = new URLSearchParams();
  params.append('entry.1274723429', donorName);
  params.append('entry.1711964533', donorEmail); 
  params.append('entry.1479109352', donorTlp); 
  params.append('entry.363889003', nominalInput); 
  params.append('entry.1082800990', paymentMethod); 
  params.append('entry.573797881', donationType); 
  params.append('entry.1469710524', donationNote);
  params.append('entry.1526120968', produkDetails);

  fetch(googleFormURL, {
      method: 'POST',
      body: params,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  });

  setTimeout(() => {
      window.location.href = 'donate-upload.html'; 
  }, 500); 
  return true;
  
}

function goBack() {
  window.location.href = 'index.html#section_program';
}

function copyToClipboard(text) {
navigator.clipboard.writeText(text).catch(err => {
    console.error("Gagal menyalin: ", err);
});
}

function upload() {
  document.getElementById('loading').style.display = 'inline-block'; 
  setTimeout(() => {
      document.getElementById('loading').style.display = 'none'; 
      alert('Terjadi kesalahan saat mengunggah file! Anda akan dialihkan ke halaman GoogleForms untuk mengunggah Bukti Transfer Anda. Mohon maaf atas ketidaknyamanan ini & terima kasih.'); 
  }, 2000);

  setTimeout(() => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSdyxLaJ9MUj3tRiBGPDcS5hR7ldlmXPC-Bnt7TEnTfTsHZD_Q/viewform'; 
  }, 10000);
  
}

