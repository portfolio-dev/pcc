
(function ($) {

  "use strict";

  // COUNTER NUMBERS
  jQuery('.counter-thumb').appear(function () {
    jQuery('.counter-number').countTo();
  });

  // CUSTOM LINK
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  });

})(window.jQuery);


// NO COPPY OR DOWNLOAD
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// BLOCK CTRL+U (View Source)
document.addEventListener('keydown', function (e) {
  // Block Ctrl+U and Ctrl+Shift+U
  if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
    e.preventDefault();
    return false;
  }
});

//DELETE .html
if (window.location.pathname.endsWith('.html')) {
  var hash = window.location.hash;
  var newUrl = window.location.pathname.replace('.html', '');
  newUrl += hash;
  window.history.replaceState(null, '', newUrl);
}

//PRINT NEWS PAGE
document.getElementById('printButton').addEventListener('click', function (e) {
  e.preventDefault();
  window.print();
});



// SUBMIT FORM
function submitForm(action) {

  // var response = grecaptcha.getResponse();
  // if (response.length === 0) {
  //     alert("Harap verifikasi bahwa Anda bukan robot.");
  //     return false;
  // }


  // Menentukan halaman pengalihan berdasarkan aksi
  if (action === 'redirectToSuccessPage') {
    redirectToSuccessPage();
  } else if (action === 'registrasiPeserta') {
    registrasiPeserta();
  } else if (action === 'comment') {
    comment();
  } else if (action === 'chdJakarta') {
    chdJakarta();
  }

  // Lanjutkan pengiriman formulir
  return true;
}

function redirectToSuccessPage() {
  window.location.href = 'sent.html';
}

function registrasiPeserta() {
  window.location.href = '/kirim-registrasi.html';
}

function comment() {
  window.location.href = '/sent.html';
}

function chdJakarta() {
  window.location.href = '/sent-chd.html';
}

// Fungsi untuk menangani pengalihan setelah iframe selesai memuat
function handleIframeLoad() {
  // Menentukan halaman pengalihan di sini, jika dibutuhkan
  window.location.href = 'sent.html';  // Halaman tujuan default
}

document.getElementById('buttonRedirectToSuccessPage').addEventListener('click', function () {
  submitForm('redirectToSuccessPage');
});

document.getElementById('buttonRegistrasiPeserta').addEventListener('click', function () {
  submitForm('registrasiPeserta');
});

document.getElementById('buttonComment').addEventListener('click', function () {
  submitForm('comment');
});

document.getElementById('buttonChdJakarta').addEventListener('click', function () {
  submitForm('chdJakarta');
});