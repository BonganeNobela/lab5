const express = require('express');
const app = express();

app.use(express.json());

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("Server listening at PORT: ", PORT);

});

app.get("/whoami", (req, res) =>{

    const whoami = {

        "studentID" : "2595626"
    };

    res.send(whoami);

});

const books = [
    {
      "id": "1",
      "title": "To Kill a Mockingbird",
      "details": [
        {
          "id": "1",
          "author": "Harper Lee",
          "genre": "Fiction",
          "publicationYear": 1960
        }
      ]
    },
    {
      "id": "2",
      "title": "1984",
      "details": [
        {
          "id": "2",
          "author": "George Orwell",
          "genre": "Dystopian",
          "publicationYear": 1949
        }
      ]
    },
    {
      "id": "3",
      "title": "Pride and Prejudice",
      "details": [
        {
          "id": "3",
          "author": "Jane Austen",
          "genre": "Romance",
          "publicationYear": 1813
        }
      ]
    },
    {
      "id": "4",
      "title": "The Great Gatsby",
      "details": [
        {
          "id": "4",
          "author": "F. Scott Fitzgerald",
          "genre": "Classic",
          "publicationYear": 1925
        }
      ]
    },
    {
      "id": "5",
      "title": "Moby-Dick",
      "details": [
        {
          "id": "5",
          "author": "Herman Melville",
          "genre": "Adventure",
          "publicationYear": 1851
        }
      ]
    }
  ]

  const bookIDs = books.map(book => book.id);
  

app.get("/books", (req, res) => {
        
     res.send(books);
    
});

app.get("/books/:id", (req, res) => {

    const { id } = req.params;

    if(!id) {

        return  res.status(400).send({ message: '400 Bad Request: no ID provided'})
    }

    if(!bookIDs.includes(id)){

        return res.status(404).send({error: '404 Not Found: Book ID invalid'})
    }

    res.send(books.find(book => book.id == id));

});


app.post('/books', (req, res) => {

    const { id } = req.body;
    const { title } = req.body;
    const { author } = req.body;
    const { genre } = req.body;
    const { publicationYear } = req.body;

    if(!id || !author || !genre  || !publicationYear){

        return res.status(400).send({error: 'Missing required book details'})
    }

    if(bookIDs.includes(id)){

        return res.status(400).send({error: 'Book ID already exists'})
    }

    const newBook = {id, title, author, genre, publicationYear};
    books.push(newBook);

    res.status(201).send({message: 'succesfully added book'});


})



