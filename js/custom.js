
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
    const donationSection = document.getElementById('donationSection');
    const confirmationSection = document.getElementById('confirmationSection');
    const donationTitle = document.getElementById('donationTitle');
    donationSection.style.display = 'none';
    confirmationSection.style.display = 'block';
    donationTitle.style.display = 'none';

    document.getElementById('donationType').innerText = document.querySelector('input[name="DonationFrequency"]:checked').value;
    document.getElementById('donationAmountDisplay').innerText = document.getElementById('customNominal').value || lastSelected?.value || '0';
    document.getElementById('donorName').innerText = document.getElementById('donation-name').value;
    document.getElementById('donorEmail').innerText = document.getElementById('donation-email').value;

    const selectedPaymentMethod = document.querySelector('input[name="DonationPayment"]:checked').nextElementSibling.innerText;
    document.getElementById('paymentMethod').innerText = selectedPaymentMethod;

    togglePaymentMethod(selectedPaymentMethod);
}

function goBack() {
    window.location.href = 'donate.html';
    // const donationSection = document.getElementById('donationSection');
    // const confirmationSection = document.getElementById('confirmationSection');
    // donationSection.style.display = 'block';
    // confirmationSection.style.display = 'none';
}

function submitConfirmation() {
    alert("Data konfirmasi telah dikirim!");
}

//COPY REKENING
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(err => {
      console.error("Gagal menyalin: ", err);
  });
}