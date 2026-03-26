const API_KEY = "26ddb98";
const BASE_URL = "https://www.omdbapi.com/?";
const BASE_URL_CONT = "t=3+idiots&apikey=26ddb98";

const input = document.querySelector("#movieInput");
const button = document.querySelector(".button");

const title = document.querySelector("#title");
const released = document.querySelector("#released");
const imdb = document.querySelector("#imdb");
const genre = document.querySelector("#genre");
const actors = document.querySelector("#actors");
const plot = document.querySelector("#plot");

const img = document.querySelector("#img");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const movie = input.value;

  const URL = `${BASE_URL}t=${encodeURIComponent(movie)}&apikey=${API_KEY}`; //if encodeURIComponent is not used it treats % and other symbols as special components
  const response = await fetch(URL);
  const data = await response.json();
  // console.log(data);

  if (data.Response === "False") {
    img.src = "default_poster.jpg";
    title.innerText = "Movie not found!!";
    released.innerText = "-";
    imdb.innerText = "-";
    genre.innerText = "-";
    actors.innerText = "-";
    plot.innerText = "-";
    return;
  }

  img.onerror = function () {
    this.src = "default_poster.jpg";
  };

  if (!data.Poster || data.Poster === "N/A") {
    img.src = "default_poster.jpg";
  } else {
    img.src = data.Poster;
  }

  title.innerText = data.Title;
  released.innerText = data.Released;
  imdb.innerText = data.imdbRating;
  genre.innerText = data.Genre;
  actors.innerText = data.Actors;
  plot.innerText = data.Plot;

  input.value = "";
  // console.log(data.Title)
});
