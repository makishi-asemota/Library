//object constructor for each book object
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

//library array
let myLibrary = [];

//function that adds each book inputted on form into the library
function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read)
  myLibrary.push(book)
  displayBooks();
}

//function to display each book on page
function displayBooks() {
    const books = document.querySelector('.container')

        //removes previously displayed cards before looping over array again
        const removeDivs = document.querySelectorAll(".card");
        for (let i = 0; i < removeDivs.length; i++) {
            removeDivs[i].remove()
        }

        let index = 0

        //Loop over library array and display each card
        myLibrary.forEach(myLibrarys => {
            const card = document.createElement("div");
            card.classList.add("card");
            books.appendChild(card);

             //creates remove book button and class attributes to each card
            const removeBookButton = document.createElement("button");
            removeBookButton.classList.add("remove-book");
            removeBookButton.textContent = "Remove Book";

             //Link data attribute of remove button to array and card
            removeBookButton.dataset.linkedArray = index;
            card.appendChild(removeBookButton);

             //event listener to remove book from library
            removeBookButton.addEventListener('click', removeBookFromLibrary);

            //function to remove book from library
            function removeBookFromLibrary() {
                let bookToRemove = removeBookButton.dataset.linkedArray;
                myLibrary.splice(parseInt(bookToRemove), 1);
                card.remove();
                displayBooks();
            }

            //create change read status button and link to array and card
            const changeReadBtn = document.createElement("button");
            changeReadBtn.classList.add("change-read")
            changeReadBtn.textContent = "Change Read Status";
            changeReadBtn.dataset.linkedArray = index;
            card.appendChild(changeReadBtn);

            changeReadBtn.addEventListener('click', changeReadStatus)
             
            //function that creates a book prototype in order to change last read status
            function changeReadStatus() {
                let readStatusToggle = changeReadBtn.dataset.linkedArray;
                Book.prototype = Object.create(Book.prototype);
                const readStatus = new Book();

                if ((myLibrary[parseInt(readStatusToggle)].read) == "Yes") {
                    readStatus.read = "No";
                    myLibrary[parseInt(readStatusToggle)].read = readStatus.read;
                } else if ((myLibrary[parseInt(readStatusToggle)].read) == "No"){
                    readStatus.read = "Yes";
                    myLibrary[parseInt(readStatusToggle)].read = readStatus.read;
                }
                displayBooks();
            }

            //creates text elements for each card
            for (let key in myLibrarys) {
                const text = document.createElement('p');
                text.textContent = (`${key}: ${myLibrarys[key]}`);
                card.appendChild(text)
            }
            index++
        });
};

//new book button to add new book info to library
const newBookBtn = document.querySelector('.addBook')
newBookBtn.addEventListener('click', displayForm)

//displays form when button is pressed
function displayForm() {
    document.getElementById('bookForm').style.display = '';
}

//submit button that adds card to page when pressed
const submitButton = document.querySelector('.submitButton');
submitButton.addEventListener('click', bookData)

//function that takes input from form and sets its value 
function bookData() {
    let Title = document.getElementById('title').value;
    let Author = document.getElementById('author').value;
    let Pages = document.getElementById('pages').value;
    let Read = document.getElementById('read').value;

    //form will reset if one of any of the data fields are empty
    if ((Title == "") || (Author == "") || (Pages == "") || (Read == "")) {
        return;
    }

    //call addBookToLibrary() to add book data to array
    addBookToLibrary(Title, Author, Pages, Read);

    //reset form after submission
    document.getElementById('form').reset()
}

//button to clear form
const clearButton = document.querySelector(".resetButton");
clearButton.addEventListener('click', clearForm);

function clearForm() {
    document.getElementById('form').reset();
}