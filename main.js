/*
    remove book 
    change book read status
    new book btn for menu to pop up
*/

const bookList = document.querySelector("ul.book-list");
const form = document.querySelector("form");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
};

// add check for empty books
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

    const label = document.createElement(`label`);
    label.setAttribute("for", "read");
    label.textContent = `read: `;
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "read");
    checkbox.setAttribute("data-title", currBook.title);
    const remove = document.createElement("button");
    remove.textContent = "delete";
    remove.setAttribute("type", "button");
    remove.id = "remove";
    listItem.append(label, checkbox, remove);

    if (currBook.read) checkbox.checked = true;
    checkbox.addEventListener("change", (event) => {
      toggleReadStatus(checkbox.getAttribute("data-title"));
    });

    remove.addEventListener("click", (event) => {
      removeBook(checkbox.getAttribute("data-title"));
      bookList.innerHTML = "";
      displayAllBooks();
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
      if (myLibrary[i].read === true) myLibrary[i].read = false;
      else myLibrary[i].read = true;
    }
  }
}

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayAllBooks();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  form.reset();
});
