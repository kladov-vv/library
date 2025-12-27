const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const btnCloseDialog = document.querySelector('.btn-close-dialog');
const btnAddBook = document.querySelector('.btn-add-book');
const libraryBoard = document.querySelector('.library-board');

const myLibrary = [
    {title: 'book 1', author: 'author 1', pages: 100, id: 1},
    {title: 'book 2', author: 'author 2', pages: 200, id: 2}
];

// EVENTS
btnAddBook.addEventListener('click', () => {
    dialog.showModal();
});

btnCloseDialog.addEventListener('click', () => {
    form.reset();
    dialog.close();
});

form.addEventListener('submit', () => {    
    let formData = new FormData(form);
    let formObject = Object.fromEntries(formData.entries());
    
    addBookToLibrary(formObject.title, formObject.author, formObject.pages)    
    displayLibrary();
    form.reset();
    dialog.close();
});

libraryBoard.addEventListener('click', (event) => {    
    if (event.target.classList.contains('btn-remove-book')) {
        let dataID = event.target.parentNode.dataset.id;
        let book = myLibrary.find((book) => book.id == dataID);

        event.target.parentNode.remove();
        myLibrary.splice(myLibrary.indexOf(book), 1);     
    }
});

// CONSTRUCTORS
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = self.crypto.randomUUID();
}

// FUNCTIONS
function addBookToLibrary(title, author, pages) {
    myLibrary.push(new Book(title, author, pages));
}

function displayLibrary() {
    libraryBoard.replaceChildren();

    for (let book of myLibrary) {   
        let div = document.createElement("div");
        let title = document.createElement("h3");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let btn = document.createElement("button");

        title.textContent = book.title;
        author.textContent = `by ${book.author}`;
        pages.textContent = `${book.pages} pages`;
        btn.textContent = 'Remove';
    
        div.setAttribute('data-id', book.id)
        div.classList.add("book-card");
        btn.classList.add("btn-remove-book");
    
        div.append(title, author, pages, btn);
        libraryBoard.append(div);
    }   
}