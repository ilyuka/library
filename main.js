const myLibrary = [];

const bookList = document.querySelector("ul.library");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = `${read ? "read" : "not read yet"}`;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// add check for empty books
function displayAllBooks() {
  for (let i = 0; i < myLibrary.length; i += 1) {
    const book = document.createElement("li");
    book.textContent = myLibrary[i].info();
    bookList.appendChild(book);
  }
}

const harryPotter = new Book("harry potter", "j k rowling", 194, true);
const harryPot = new Book("harry pot", "j king", 194, false);
const empty = new Book();

addBookToLibrary(harryPotter);
addBookToLibrary(harryPot);
addBookToLibrary(empty);

displayAllBooks();
