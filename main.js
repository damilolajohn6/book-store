// initializes an empty array that will hold the user's library books
let library = [];

// sets the temp variable as the first element of the class "book" in the HTML file
const temp = document.querySelector(".book");

// sets the bookshelf variable as the first element of the id "bookshelf" in the HTML file
const bookshelf = document.querySelector("#bookshelf");

// initializes the id number of book that exists in the library array
let idBook = library.length;

// Book constructor function with title, author, and category parameters for each book added
function Book(title, author, category) {
  this.title = title;
  this.author = author;
  this.category = category;

  // sets the id for each book added
  if (Book.currentId === undefined) {
    Book.currentId = 0;
  }

  this.id = Book.currentId;
  Book.currentId += 1;
}

//ReloadLibrary function that displays all books in the library onto the web page
function ReloadLibrary() {
  // gets localstorage JSON data and sets it as the variable "library"
  const library = JSON.parse(localStorage.library);

  // gets bookshelf element in the HTML file and throws an error if it does not exist
  const bookshelf = document.getElementById("bookshelf");
  if (!bookshelf) {
    throw new Error("Could not find bookshelf element");
  }

  // erases the previous contents in the HTML file
  bookshelf.innerHTML = "";

  // for loop that prints all books onto page by calling the "DisplayBook" function
  for (var i = 0; i < library.length; i += 1) {
    const book = DisplayBook(library[i]);

    if (book) {
      bookshelf.appendChild(book);
    }
  }
}

// function that adds a new book into the localStorage database
function SaveBook(title, author, category) {
  //creates a new book object with 'title', 'author', and 'category' data given from the user
  const book = new Book(title, author, category);

  //initializes the library array as an empty array if "library" is not an array
  if (!Array.isArray(library)) {
    library = [];
  }

  //adds a new book object onto the library array
  library.push(book);

  //stores the updated array as a JSON string onto the user's local storage
  localStorage.setItem("library", JSON.stringify(library));

  //reloads the library by executing the 'ReloadLibrary' function
  ReloadLibrary();
}

// function that executes the following actions after the "add book" button is clicked
function AddBook() {
  //prevents the web page to refresh after the "add book" button is clicked
  event.preventDefault();

  //initializes the FormData object for the AddBook form
  const formAddBook = document.forms.AddBook;

  //gets the user's input 'title', 'author', and 'category' data from the AddBook form
  const bookData = new FormData(formAddBook);
  const bookTitle = bookData.get("title");
  const bookAuthor = bookData.get("author");
  const bookCategory = bookData.get("category");

  //resets the AddBook form fields for new input data
  formAddBook.reset();

  //adds the new book using 'SaveBook' function with the user-given data
  SaveBook(bookTitle, bookAuthor, bookCategory);
}

//function that deletes the selected book from the user's local storage by the book's "id" number

function DeleteBook(id) {
  const library = JSON.parse(localStorage.getItem("library"));
  const filteredLibrary = library.filter((book) => book.id !== id);
  localStorage.setItem("library", JSON.stringify(filteredLibrary));
  ReloadLibrary();
}

const categoryDisplay = {
  0: "None",
  1: "Adventure",
  2: "Erotic",
  3: "Epistolary",
  4: "Comic",
  5: "Docufication",
  6: "Crime",
  7: "Superhero",
  8: "Thriller",
  9: "Urban",
  10: "western",
};

function DisplayBook(book) {
  const clon = temp.content.cloneNode(true);
  const categoryText = categoryDisplay[book.category];

  clon.querySelectorAll("h2")[0].innerHTML = "BOOK NAME: " + book.title;
  clon.querySelectorAll("p")[0].innerHTML = "AUTHOR: " + book.author;
  clon.querySelectorAll("p")[1].innerHTML = "CATEGORY:" + categoryText;

  clon.querySelector("button").addEventListener("click", () => {
    DeleteBook(book.id);
  });

  bookshelf.appendChild(clon);
}

ReloadLibrary();
