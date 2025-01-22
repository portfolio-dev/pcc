// Mengambil elemen penting
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// Fungsi untuk menambahkan tugas ke DOM
function addTodoToDOM(todoText, category = "Pribadi", dueDate = "", isCompleted = false) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span>${todoText}</span><br><br>
        <span class="category">(${category})</span>
        <span class="due-date">Paling Lambat : ${dueDate ? `⏰ ${dueDate}` : ""}</span>
    `;

    if (isCompleted) {
        li.classList.add("completed");
    }

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTodos();
    });

    li.appendChild(deleteBtn);
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
    const dueDate = document.getElementById("dueDateInput").value;
    if (todoText) {
        addTodoToDOM(todoText, category, dueDate);
        saveTodos();
        todoInput.value = ""; // Reset input
        document.getElementById("dueDateInput").value = ""; // Reset tanggal
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