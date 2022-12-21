/* eslint-disable no-unused-vars */

const button = document.querySelector('.Button');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const booksList = document.querySelector('.books');
const listNav = document.querySelector('.listNav');
const addNav = document.querySelector('.addNav');
const contactNav = document.querySelector('.contactNav');
const listSec = document.querySelector('.for-list');
const addSec = document.querySelector('.for-add');
const contactSec = document.querySelector('.for-contact');

listSec.style.display = 'none';
addSec.style.display = 'none';
contactSec.style.display = 'none';
listNav.addEventListener('click', () => {
  listSec.style.display = 'block';
  addSec.style.display = 'none';
  contactSec.style.display = 'none';
});
addNav.addEventListener('click', () => {
  addSec.style.display = 'block';
  listSec.style.display = 'none';
  contactSec.style.display = 'none';
});
contactNav.addEventListener('click', () => {
  contactSec.style.display = 'block';
  listSec.style.display = 'none';
  addSec.style.display = 'none';
});

const books = JSON.parse(localStorage.getItem('books-list')) || [];
const tbody = document.createElement('tbody');

const date = new Date();
const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
document.querySelector('.date').innerHTML = `${date.toDateString()}, ${time}`;

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static callback(e) {
    e.preventDefault();

    const book = new Books(title.value, author.value);

    books.push(book);
    localStorage.setItem('books-list', JSON.stringify(books));

    Books.display();
    document.querySelector('.form').reset();
    // instead of this use form reset
    // title.value = '';
    // author.value = '';
    title.focus(); // to get curser standby at title input
  }

  static display() {
    let i = 0;
    tbody.innerHTML = '';
    if (books.length !== 0) {
      books.forEach((book) => {
        tbody.innerHTML += `
      <tr class='book'>
        <td><strong>"${book.title}"</strong> by <em>${book.author}</em></td>
        <td><button onclick="Books.remove(${i})" class='btn btn-outline-primary'> Remove </button> </td> 
      </tr>
      `;
        i += 1;
        booksList.appendChild(tbody);
      });
    }
    return 0;
  }

  static remove(i) {
    const x = document.querySelectorAll('.book')[i];
    tbody.removeChild(x);
    books.splice(i, 1);
    localStorage.setItem('books-list', JSON.stringify(books));
    Books.display();
  }
}

Books.display();
button.addEventListener('click', Books.callback);
