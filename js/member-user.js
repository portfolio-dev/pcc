// MENU
document.addEventListener('DOMContentLoaded', function () {
    // Pastikan elemen sudah ada di halaman sebelum menambahkan event listener
    const berandaLink = document.getElementById('link-beranda');
    const profilLink = document.getElementById('link-profil');
    const tugasLink = document.getElementById('link-tugas');
    const kampanyeLink = document.getElementById('link-kampanye');

    // Pastikan link ditemukan, lalu tambahkan event listener
    if (berandaLink && profilLink && kampanyeLink) {
        berandaLink.addEventListener('click', function () {
            toggleView('beranda-member');
        });

        profilLink.addEventListener('click', function () {
            toggleView('profil-member');
        });

        tugasLink.addEventListener('click', function () {
            toggleView('tugas-member');
        });

        kampanyeLink.addEventListener('click', function () {
            toggleView('kampanye-member');
        });
    }

    // Fungsi untuk menampilkan dan menyembunyikan tampilan
    function toggleView(viewId) {
        const allViews = ['beranda-member', 'profil-member', 'tugas-member', 'kampanye-member'];
        allViews.forEach(function (view) {
            const viewElement = document.getElementById(view);
            if (view === viewId) {
                viewElement.style.display = 'block'; // Menampilkan tampilan yang dipilih
            } else {
                viewElement.style.display = 'none'; // Menyembunyikan tampilan lainnya
            }
        });
    }
});

// VERIFIKASI PROFIL
// Menampilkan pop-up verifikasi
function showPopup() {
    document.getElementById("popup").style.display = "flex";
}

// Menutup pop-up
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Menampilkan pop-up kode akses
function showCode() {
    document.getElementById("popup-code").style.display = "flex";
}

// Menutup pop-up
function closeCode() {
    document.getElementById("popup-code").style.display = "none";
}

// DAFTAR TUGAS
// Mengambil elemen penting
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// Fungsi untuk menambahkan tugas ke DOM
function addTodoToDOM(todoText, category = "Pribadi", dueDate = "", isCompleted = false) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span><hr><br>${todoText}</span><br><br>
        <span class="category">(${category})</span>
        <span class="due-date">${dueDate ? `⏰ ${dueDate}` : ""}<br><br></span>
    `;

    if (isCompleted) {
        li.classList.add("completed");
    }

    // Membuat tombol "Selesaikan"
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Tugas Selesai";
    completeBtn.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTodos();
    });

    // Memberikan jarak dan warna biru pada tombol "Selesaikan"
    completeBtn.style.marginRight = "10px";  // Jarak antar tombol
    completeBtn.style.marginTop = "5px";     // Jarak vertikal
    completeBtn.style.backgroundColor = "blue";  // Warna biru
    completeBtn.style.color = "white";           // Warna teks putih
    completeBtn.style.border = "none";           // Menghilangkan border default
    completeBtn.style.padding = "5px 10px";      // Memberikan padding pada tombol
    completeBtn.style.cursor = "pointer";        // Mengubah cursor saat hover

    // Membuat tombol "Hapus"
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTodos();
    });

    // Memberikan jarak pada tombol "Hapus"
    deleteBtn.style.marginTop = "5px";       // Jarak vertikal
    deleteBtn.style.marginLeft = "10px";     // Jarak ke kiri dari tombol "Selesaikan"

    // Menambahkan tombol "Selesaikan" dan "Hapus" ke dalam li
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // Menambahkan li ke dalam todoList
    todoList.appendChild(li);
}




// Fungsi untuk menyimpan tugas ke localStorage
function saveTodos() {
    const todos = [];
    document.querySelectorAll("#todoList li").forEach(li => {
        const text = li.querySelector("span").textContent.trim();
        const category = li.querySelector(".category").textContent.replace(/[()]/g, "").trim();
        const dueDate = li.querySelector(".due-date")?.textContent.replace("⏰", "").trim() || "";
        todos.push({
            text,
            category,
            dueDate,
            completed: li.classList.contains("completed"),
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Fungsi untuk memuat tugas dari localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => addTodoToDOM(todo.text, todo.category, todo.dueDate, todo.completed));
}

// Event untuk menambahkan tugas baru
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    const category = document.getElementById("categorySelect").value;
    const dueDate = document.getElementById("patient-born").value;
    if (todoText) {
        addTodoToDOM(todoText, category, dueDate);
        saveTodos();
        todoInput.value = ""; // Reset input
        document.getElementById("patient-born").value = ""; // Reset tanggal
    }
});

// Untuk melakukan searching tugas
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();
    document.querySelectorAll("#todoList li").forEach(li => {
        const taskText = li.textContent.replace("Hapus", "").trim().toLowerCase();
        li.style.display = taskText.includes(searchValue) ? "flex" : "none";
    });
});

function sortTodosByDate() {
    const todos = Array.from(document.querySelectorAll("#todoList li"));
    todos.sort((a, b) => {
        const dateA = new Date(a.querySelector(".due-date")?.textContent.replace("⏰", "").trim() || "");
        const dateB = new Date(b.querySelector(".due-date")?.textContent.replace("⏰", "").trim() || "");
        return dateA - dateB;
    });
    todos.forEach(todo => todoList.appendChild(todo)); // Atur ulang di DOM
}

// Memuat tugas saat halaman pertama kali dimuat
loadTodos();
sortTodosByDate();