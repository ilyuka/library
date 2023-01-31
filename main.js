const bookList = document.querySelector("ul.library");
const form = document.querySelector("form");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = `${read ? "read" : "not read yet"}`;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
};

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const book = new Book(title, author, pages, read);
  const li = document.createElement("li");
  li.textContent = book.info();
  myLibrary.push(book);
  bookList.appendChild(li);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  form.reset();
});

// add check for empty books
function displayAllBooks() {
  for (let i = 0; i < myLibrary.length; i += 1) {
    const book = document.createElement("li");
    book.textContent = myLibrary[i].info();
    bookList.appendChild(book);
  }
}
