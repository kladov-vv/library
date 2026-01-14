const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const btnCloseDialog = document.querySelector('.btn-close-dialog');
const btnAddBook = document.querySelector('.btn-add-book');
const libraryBoard = document.querySelector('.library-board');
const myLibrary = [
    {title: 'Book 1', author: 'author 1', pages: 100},
    {title: 'Book 2', author: 'author 2', pages: 200},
    {title: 'Book 3', author: 'author 3', pages: 300}
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
    
    addBookToLibrary(formObject.title, formObject.author, formObject.pages, formObject.status)    
    displayLibrary();
    form.reset();
});

libraryBoard.addEventListener('click', (event) => {    
    if (event.target.tagName != 'BUTTON') return;
    
    let dataID = event.target.parentNode.dataset.id;
    let bookIndex = myLibrary.findIndex((book) => book.id === dataID);
    
    if (event.target.classList.contains('btn-remove-book')) {
        event.target.parentNode.remove();
        myLibrary.splice(bookIndex, 1);
    }

    if (event.target.classList.contains('btn-change-status')) {
        myLibrary[bookIndex].changeStatus();
        displayLibrary();
    }
});

// CONSTRUCTORS
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = self.crypto.randomUUID();
    this.changeStatus = function() {
        this.status = (this.status === 'on') ? 'off' : 'on';
    }
}

// FUNCTIONS
function addBookToLibrary(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status));
}

function displayLibrary() {
    libraryBoard.replaceChildren();

    for (let book of myLibrary) {   
        let div = document.createElement("div");
        let title = document.createElement("h3");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let status = document.createElement("p");
        let btnRemove = document.createElement("button");
        let btnChangeStatus = document.createElement("button");
        
        title.textContent = book.title;
        author.textContent = `by ${book.author}`;
        pages.textContent = `${book.pages} pages`;
        status.textContent = (book.status === 'on') ? 'read' : 'not read'
        btnChangeStatus.textContent = 'Change status';
        btnRemove.textContent = 'Remove';
    
        div.setAttribute('data-id', book.id)
        div.classList.add("book-card");
        btnChangeStatus.classList.add("btn-change-status");
        btnRemove.classList.add("btn-remove-book");
    
        div.append(title, author, pages, status, btnChangeStatus, btnRemove);
        libraryBoard.append(div);
    }   
}

displayLibrary()