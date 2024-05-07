const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

// Function to fetch movie details using OMDb API
const getMovieInfo = async (movie) => {
  try {
    const myAPIKey = "c3e71248";
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${myAPIKey}&t=${movie}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch movie data.");
    }

    const data = await response.json();

    showMovieData(data);
  } catch (error) {
    showErrorMessage("No Movie Found!!!");
  }
};

// Function to show movie data
const showMovieData = (data) => {
  // Remove a movie detail before dispalying another
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("noBackground"); // removing the default noBackground class from movie container div

  // Destructuring to extract props from data obj
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  //creating Parent div to display all movie details
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");

  movieElement.innerHTML = `<h2>${Title}</h2> 
                        <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

  //creating div to display genre
  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-genre"); // adding a class to element

  // using split() to separate the GENRE string and create array,apply forEach on the array to get each genre one-by-one
  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerText = element;
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += ` <p><strong>Released Date: </strong>${Released}</p>
                             <p><strong>Duration: </strong>${Runtime}</p>
                             <p><strong>Cast: </strong>${Actors}</p>
                             <p><strong>Plot: </strong>${Plot}</p>`;

  // Creating div for movie poster
  const posterElement = document.createElement("div");
  posterElement.classList.add("movie-poster");
  posterElement.innerHTML = `<img src='${Poster}'/>`;

  movieContainer.appendChild(posterElement);
  movieContainer.appendChild(movieElement);
};

//Function to display error message
const showErrorMessage = (message) => {
  movieContainer.innerHTML = `<h2>${message}</h2>`;
  movieContainer.classList.add("noBackground");
};

// Function to handle the form submission
const handleFormSubmission = (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showErrorMessage("Fetching Movie Information...");
    getMovieInfo(movieName);
  } else {
    showErrorMessage("Enter movie name to get information.");
  }
};

// Adding Event Listener on search form
searchForm?.addEventListener("submit", handleFormSubmission);
