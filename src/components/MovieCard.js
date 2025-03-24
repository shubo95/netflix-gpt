import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 h-[264px]">
      <img alt="Movie Card" className="h-full" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;
