document.getElementById('display-message').style.display = 'none';
const searchBook = () => {

    /*-----  Input Value -----*/

    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;

    /*----- Clear Input  -----*/
    searchField.value = '';

    /*----- Result Field Display None -----*/
    document.getElementById('display-message').style.display = 'none';

    /*-----  Invalid Input -----*/
    if (searchText == '') {
        window.alert('Invalid Input');
    }

    /*----- Fetch URL -----*/
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => { displayMessage(data.numFound); displaySearchResult(data.docs)});
    }
}

/*----- Display Result -----*/
const displayMessage = number => {
    const resultNumber = document.getElementById('result');
    resultNumber.innerText = number;
    document.getElementById('display-message').style.display = 'block';
}

/*----- show Result -----*/

const displaySearchResult = (searchBooks) => {
    const searchResult = document.getElementById('book-result');
    searchResult.textContent = '';
    if (searchBooks.length == 0) {
        console.log('not found');
    }
    else {
        searchBooks.forEach(searchBook => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 ">
                    <div class="card-body">
                        <img src="https://covers.openlibrary.org/b/id/${searchBook.cover_i}-M.jpg" class="card-img-top" alt="...">
                    </div>
                    <div class="card-footer">
                        <h5 class="card-title"><span class="fw-bold">Book Name: </span>${searchBook.title}</h5>
                        <h5 class="card-title"><span class="fw-bold">Author Name: </span>${searchBook.author_name[0]}</h5>
                        <h5 class="card-title"><span class="fw-bold">Publisher Name: </span>${searchBook.publisher[0]}</h5>
                        <h5 class="card-title"><span class="fw-bold">First Publish: </span>${searchBook.first_publish_year}</h5>
                    </div>
            </div>
        `;
            searchResult.appendChild(div);
        });
    }
}