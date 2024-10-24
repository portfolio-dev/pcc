
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

            // Check if the same radio button was selected again
            if (lastSelected === selectedRadio) {
                selectedRadio.checked = false;  // Uncheck it
                nominalInput.value = '';        // Clear the input
                lastSelected = null;            // Reset last selected
            } else {
                // Clear the last selected value if it was different
                if (lastSelected) {
                    lastSelected.checked = false;
                }
                // Set the input value based on selected radio
                nominalInput.value = selectedRadio.value;
                lastSelected = selectedRadio; // Update last selected
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

            // Update konfirmasi
            document.getElementById('donationType').innerText = document.querySelector('input[name="DonationFrequency"]:checked').value;
            document.getElementById('donationAmountDisplay').innerText = document.getElementById('customNominal').value || lastSelected?.value || '0';
            document.getElementById('donorName').innerText = document.getElementById('donation-name').value;
            document.getElementById('donorEmail').innerText = document.getElementById('donation-email').value;

            togglePaymentMethod(document.querySelector('input[name="DonationPayment"]:checked').value);
        }

        function goBack() {
            // document.getElementById('donationSection').style.display = 'block';
            // document.getElementById('confirmationSection').style.display = 'none';
            window.location.href = 'donate.html';
        }

        function submitConfirmation() {
            // Implementasi untuk mengirim data konfirmasi
            alert("Data konfirmasi telah dikirim!");
            // Anda dapat menambahkan logika untuk mengirim data ke server di sini
        }