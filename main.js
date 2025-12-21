const libraryBoard = document.querySelector('.library-board');
const myLibrary = [
    {title: 'book 1', author: 'author 1', pages: 100, id: 1},
    {title: 'book 2', author: 'author 2', pages: 200, id: 2}
];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = self.crypto.randomUUID();
}

function addBookToLibrary(title, author, pages) {
    myLibrary.push(new Book(title, author, pages));
}

function displayLibrary() {
    libraryBoard.replaceChildren();
    for (const book of myLibrary) {
            let div = document.createElement("div");
            div.classList.add("book-card");
            div.textContent = `${book.title} by ${book.author} (${book.pages} pages), ID: ${book.id}`;
            libraryBoard.appendChild(div);
    }   
}