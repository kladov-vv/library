const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = self.crypto.randomUUID();
}

function addBookToLibrary(title, author, pages) {
    myLibrary.push(new Book(title, author, pages));
}