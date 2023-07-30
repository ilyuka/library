const bookList = document.querySelector("ul.book-list");
const form = document.querySelector("form");
const addBookPopUpSection = document.querySelector(".addBook");
const add = document.querySelector(".add");
const close = document.querySelector(".close");
const notification = document.querySelector(".notification");

close.addEventListener("click", () => {
    addBookPopUpSection.style.display = "none";
});

add.addEventListener("click", () => {
    addBookPopUpSection.style.display = "flex";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary();
});

const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    showInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
    }
}

function displayAllBooks() {
    bookList.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i += 1) {
        const currBook = myLibrary[i];
        const listItem = document.createElement("li");

        for (key in currBook) {
            if (key !== "info" && key !== "read") {
                const para = document.createElement("p");
                para.textContent = `${key}: ${currBook[key]}`;
                listItem.appendChild(para);
            }
        }

        const div = document.createElement("div");
        const label = document.createElement("label");
        label.setAttribute("for", "read");
        label.textContent = `read: `;
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "read");
        checkbox.setAttribute("data-title", currBook.title);
        div.append(label, checkbox);
        const remove = document.createElement("button");
        remove.textContent = "delete";
        remove.setAttribute("type", "button");
        remove.style.display = "block";
        remove.id = "remove";
        listItem.append(div, remove);

        if (currBook.read) checkbox.checked = true;

        checkbox.addEventListener("change", (event) => {
            toggleReadStatus(checkbox.getAttribute("data-title"));
        });

        remove.addEventListener("click", (event) => {
            event.target.parentNode.remove();
            removeBook(checkbox.getAttribute("data-title"));
        });

        bookList.appendChild(listItem);
    }
}

function removeBook(dataTitle) {
    for (let i = 0; i < myLibrary.length; i += 1) {
        if (myLibrary[i].title === dataTitle) {
            myLibrary.splice(i, 1);
        }
    }
}

function toggleReadStatus(dataTitle) {
    for (let i = 0; i < myLibrary.length; i += 1) {
        if (myLibrary[i].title === dataTitle) {
            myLibrary[i].read = !myLibrary[i].read;
        }
    }
}

function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    for (let i = 0; i < myLibrary.length; i += 1) {
        if (title === myLibrary[i].title && author === myLibrary[i].author) {
            notification.textContent = `There is already "${title}" by ${author} in the library.`;
            setTimeout(() => {
                notification.textContent = "";
            }, 3500);
            return;
        }
    }

    addBookPopUpSection.style.display = "none";
    form.reset();
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayAllBooks();
}
