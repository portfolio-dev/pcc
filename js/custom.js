
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
function submitForm() {
    var iframe = document.getElementsByName('hidden_iframe')[0];
    iframe.onload = function () {
        redirectToSuccessPage();
    };
    return true; 
}

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

// TENTUKAN NOMINAL
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
  document.getElementById('transferInfo').style.display = paymentType === 'Transfer' ? 'block' : 'none';
  document.getElementById('qrisImage').style.display = paymentType === 'QRIS' ? 'block' : 'none';
  
  const confirmButton = document.getElementById('confirmButton');
  if (paymentType === 'Transfer') {
      confirmButton.textContent = 'Sudah Bayar via Transfer';
  } else if (paymentType === 'QRIS') {
      confirmButton.textContent = 'Sudah Bayar via QRIS';
  }
}

function showConfirmation() {
  const errorMessageContainer = document.getElementById('errorMessages');
  errorMessageContainer.innerHTML = '';

  const donorName = document.getElementById('donation-name').value;
  const donorEmail = document.getElementById('donation-email').value;
  const donorWA = document.getElementById('donation-wa').value;
  const nominalInput = document.getElementById('customNominal').value.replace(/\./g, ''); 

  // VALUE VALIDATION
  if (nominalInput === '' || isNaN(nominalInput) || parseInt(nominalInput) <= 0) {
      errorMessageContainer.innerHTML += "<hr>Tentukan Nominal tidak boleh kosong atau 0!<br>";
  }

  // DONATION FORM VALIDATION
  let message = '';

  if (!donorName) message += "<hr>Nama harus diisi!<br>";
  if (!donorEmail) message += "<hr>Email harus diisi!<br>";
  if (!donorWA) message += "<hr>Nomor Whatsapp harus diisi!<br>";

  // EMAIL VALIDATION
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (donorEmail && !emailPattern.test(donorEmail)) {
      message += "<hr>Penulisan email salah!<br>";
  }

  if (errorMessageContainer.innerHTML || message) {
      errorMessageContainer.innerHTML += message;
      return; 
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
  document.getElementById('donationAmountDisplay').innerText = formatNumber(fields.donationAmount);
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
      const rawValue = e.target.value.replace(/\D/g, ''); 
      e.target.value = formatNumber(rawValue);
  });
});

// FORMAT NUMBER
function formatNumber(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function submitConfirmation() {
  const errorMessageContainer = document.getElementById('errorMessages');
  errorMessageContainer.innerHTML = '';

  const donorName = document.getElementById('donation-name').value;
  const donorEmail = document.getElementById('donation-email').value;
  const donorWA = document.getElementById('donation-wa').value;

  const nominalInput = document.getElementById('customNominal').value.replace(/\./g, '') || lastSelected?.value || '0';

  // VALUE VALIDATION
  if (nominalInput === '0' || nominalInput.trim() === '') {
      errorMessageContainer.innerHTML += "Tentukan Nominal tidak boleh 0 atau kosong!<br>";
  }

  const paymentMethod = document.querySelector('input[name="DonationPayment"]:checked').value;  
  const donationType = document.querySelector('input[name="DonationFrequency"]:checked').value;

  // URL GOOGLE FORM
  const googleFormURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSetZq-Q-6W6oAn4yGgYios1RpLhKoigYtV7_Jbv7Zz-tUXijw/formResponse';

  // PARAMETER
  const params = new URLSearchParams();
  params.append('entry.1274723429', donorName); // ID ENTRY FOR NAME
  params.append('entry.1711964533', donorEmail); // ID ENTRI FOR EMAIL
  params.append('entry.1479109352', donorWA); // ID ENTRY FOR NUMBER OR WHATSAPP
  params.append('entry.1705412345', nominalInput); // ID ENTRY FOR VALUE
  params.append('entry.1082800990', paymentMethod); // ID ENTRY FOR PAYMENT
  params.append('entry.573797881', donationType); // ID ENTRY FOR KIND OF DONATION
 
  // FETCH SEND
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




