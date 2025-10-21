import { twMerge } from "tailwind-merge";
import { IFilm } from "../../types";
import { Link } from "react-router";
import { publicRoutes } from "../../config/router";
import { Box } from "@chakra-ui/react";

export default function Film({
  film,
  className = "",
}: {
  film: IFilm;
  className?: string;
}) {
  return (
    <Box as={'article'} className={twMerge(`h-66 w-full relative rounded-sm overflow-hidden`, className)}>
      <figure className="absolute top-0 left-0 right-0 bottom-0">
        <img
          src={film.poster_url}
          alt={film.name}
          className="w-full h-full object-cover object-center block"
        />
      </figure>
      <div className="absolute bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.5)] py-3 px-4 text-center text-white">
        <Link
          to={`${publicRoutes.films}/${film.slug}`}
          title={film.name}
          className="line-clamp-1 text-base font-semibold pb-1 hover:text-[#da966e]"
        >
          {film.name}
        </Link>
        <p
          title={film.original_name}
          className="line-clamp-1 text-sm"
        >
          {film.original_name}
        </p>
      </div>
    </Box>
  );
}
