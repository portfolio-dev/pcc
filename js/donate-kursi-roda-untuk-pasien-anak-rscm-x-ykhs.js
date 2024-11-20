
(function ($) {
  
  "use strict";

    jQuery('.counter-thumb').appear(function() {
      jQuery('.counter-number').countTo();
    });
    
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


document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

function redirectToSuccessPage() {
  window.location.href = 'sent.html';
}

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

  if (nominalInput === '' || isNaN(nominalInput) || parseInt(nominalInput) <= 0) {
      errorMessageContainer.innerHTML += "<hr>Tentukan Nominal tidak boleh kosong atau 0!<br>";
  }
 
  let message = '';

  if (!donorName) message += "<hr>Nama harus diisi!<br>";
  if (!donorEmail) message += "<hr>Email harus diisi!<br>";
  if (!donorWA) message += "<hr>Nomor Whatsapp harus diisi!<br>";

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
    window.location.href = 'index.html#section_program';
}

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


  if (nominalInput === '0' || nominalInput.trim() === '') {
      errorMessageContainer.innerHTML += "Tentukan Nominal tidak boleh 0 atau kosong!<br>";
  }


  const paymentMethod = document.querySelector('input[name="DonationPayment"]:checked').value;  
  const donationType = document.querySelector('input[name="DonationFrequency"]:checked').value;

  const googleFormURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSetZq-Q-6W6oAn4yGgYios1RpLhKoigYtV7_Jbv7Zz-tUXijw/formResponse';

   const params = new URLSearchParams();
  params.append('entry.1274723429', donorName); 
  params.append('entry.1711964533', donorEmail); 
  params.append('entry.1479109352', donorWA); 
  params.append('entry.476379432', nominalInput); 
  params.append('entry.1082800990', paymentMethod); 
  params.append('entry.573797881', donationType); 

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
  }, 10000);
  
}