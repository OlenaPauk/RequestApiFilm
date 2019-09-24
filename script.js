
let getId = x => document.getElementById(x);
let currentPageNumber = 1;
function search(page) {
    // in case of first page, remove all results
    if (page === 1) {
        getId('film').innerHTML = '';
        currentPageNumber = 1;
    }
    let name = getId('name').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${name}&page=${page}&apikey=cfc44db`, false);
    xhr.send();
    let data = JSON.parse(xhr.responseText);
    console.log(data);

    if (data.Response != "False") {
        data.Search.forEach(film => {
            let posterUrl = film.Poster;
            let title = film.Title;
            let type = film.Type;
            let year = film.Year;

            let template = `
        <div class="filmPoster">
            <img  src="${posterUrl}" class="image">
            <div id="titleFilm"> ${title} </div>
            <p class="typeFilm">${type}</p>
            <p class="yearFilm">${year}</p>
            <input type="button" value="More details" onclick="details('${film.imdbID}')" id="detailsButton">
        </div>`;
            getId('moreButton').style.display = 'block';
            getId('film').insertAdjacentHTML('beforeend', template);
        });
    }
    else {
        alert('Empty result')
    }
}

function more() {
    currentPageNumber++;
    search(currentPageNumber);
}
function del() {
    getId('name').value = '';
    getId('moreButton').style.display = 'none';
}

function details(id) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=cfc44db&plot=full`, false);
    xhr.send();
    let data = JSON.parse(xhr.responseText);
    console.log(data);
    getId('filmInf').style.display = 'block';
    let template = `<div id="filmInform">`;
    if (data.Poster) {
        template += `<img  src="${data.Poster}" class="imageInf">`;
    }
    template += `<div id="container">`;
    if (data.Title) {
        template += `<div id="logo">${data.Title}</div>`;
    }
    if (data.Rated || data.Year || data.Genre) {
        template += `<p id="pg">${data.Rated} ${data.Year} ${data.Genre}</p>`;
    }
    if (data.Plot) {
        template += `<div id="plot">${data.Plot}</div>`;
    }
    if (data.Writer) {
        template += `<p id="wriiten"><b>Wtitten by: </b>${data.Writer}</p>`;
    }
    if (data.Director) {
        template += `<p id="director"><b>Director by: </b>${data.Director}</p>`;
    }
    if (data.Actors) {
        template += `<p id="actors"><b>Starring: </b>${data.Actors}</p>`;
    }
    if (data.BoxOffice) {
        template += `<p id="boxOffice"><b>BoxOffice: </b>${data.BoxOffice}</p>`;
    }
    if (data.Awards) {
        template += `<p id="awards"><b>Awards: </b>${data.Awards}</p>`;
    }
    template += `<p id="ratings"><b>Ratings: </b></p>`;
    if (data.Ratings[0]) {
        template += `<p class="source-value">${data.Ratings[0].Source} ${data.Ratings[0].Value}</p>`;
    }
    if (data.Ratings[1]) {
        template += `<p class="source-value">${data.Ratings[1].Source} ${data.Ratings[1].Value}</p>`;
    }
    if (data.Ratings[2]) {
        template += `<p class="source-value">${data.Ratings[2].Source} ${data.Ratings[2].Value}</p>`;
    }
    template += `</div >`;
    template += `</div >`;
    getId('filmInf').insertAdjacentHTML('beforeend', template);
    getId('div-color').style.display = 'block';
};
getId('div-color').addEventListener('click', () => {
    getId('div-color').style.display = 'none';
    getId('filmInf').style.display = 'none';
    getId('filmInf').innerHTML = '';
})





