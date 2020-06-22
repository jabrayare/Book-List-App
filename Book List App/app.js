// Book constructor.
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
 //UI constructor.
 function UI(){

 }

 // Add book to list.

 UI.prototype.addBookToList = function(book){
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
 }
//Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// show alert.
UI.prototype.showAlert = function(message,className){
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

// Delete book from UI.
UI.prototype.DeleteBook = function(target){
  if(target.className === 'delete'){
  target.parentElement.parentElement.remove();
  }

}
 //EVen listeners.

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
   ui.DeleteBook(e.target);
   // show alert message.
   ui.showAlert('Item Removed!','success');
  e.preventDefault();
 })