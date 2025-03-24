import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    setIsLoading(true);
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
      console.log(gptResults.choices?.[0]?.message?.content);

      // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

      // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

      // For each movie I will search TMDB API

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]
      try {
        const tmdbResults = await Promise.all(promiseArray);

        console.log(tmdbResults);
        dispatch(
          addGptMovieResult({
            movieNames: gptMovies,
            movieResults: tmdbResults,
          })
        );
      } catch (e) {
        setIsLoading(false);
      }
    } catch (e) {
      setError(
        "Unable to fetch search results Please try again after sometime."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 relative py-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          disabled={isLoading}
          onChange={() => {
            setError("");
          }}
          className=" p-4 m-4 col-span-9 rounded-lg focus-visible:outline-none focus-visible:border focus-visible:border-white input-bg caret-white text-white disabled:opacity-50 disabled:pointer-events-none"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:pointer-events-none"
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {lang[langKey].search}
        </button>
        {error && (
          <p className="text-base text-red-700 w-full absolute bottom-2 left-5">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
