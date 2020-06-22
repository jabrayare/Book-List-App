class Book{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');
    // Create tr element.
    const row = document.createElement('tr');
    // insert columns.
    row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href ="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
    console.log(list);
  }
  showAlert(message,className){
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
      const div = document.createElement('div');
      div.className =  `alert ${className}`;
      div.appendChild(document.createTextNode(message));
    container.insertBefore(div,form);
  
  
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
      }
  }
  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}
// Local storage class.
class store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }
    else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks(){
    const books = store.getBooks();
    books.forEach(element => {
        const ui = new UI;
        ui.addBookToList(book);
    });
  }
  static addBook(book){
   const books = store.getBooks();
   books.push(book);
   localStorage.setItem('books',JSON.stringify(books));
  }
  static removeBook(){

  }
}

document.getElementById('book-form').addEventListener('submit', function(e){
  // Getting form input values.
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //Instantiate book.
  const book = new Book(title,author,isbn);

  //Instantiate UI.
  const ui = new UI();

  // Validate
  if(title != '' && author != '' && isbn != ''){
  ui.addBookToList(book);
  // add book to local storage.
  store.addBook(book);
  //Clear fields.
  ui.clearFields();
  ui.showAlert('Book added to your List','success')
  }
  else{
    ui.showAlert('Please fill out all the fields','error');
  }

   e.preventDefault();
 });

 document.getElementById('book-list').addEventListener('click', function (e){
   const ui = new UI();
   ui.deleteBook(e.target);
   // show alert message.
   ui.showAlert('Item Removed!','success');
  e.preventDefault();
 })