import { useEffect, useState } from "react";
import { getFilmByGenre, getFilmsByYear, getNewFilms } from "../../services";
import { IFilm } from "../../types";
import FilmSlider from "../../components/ui/fiilm-slider";
import GridItems from "../../components/ui/grid-items";
import { NAV_LINK } from "../../constants/page";
import { publicRoutes } from "../../config/router";
import { Box, Grid } from "@chakra-ui/react";
import SideBar from "../../components/base/layout/side-bar";

export default function HomePage() {
  const [newFilms, setNewFilms] = useState<IFilm[]>();
  const [dramaFilms, setDramaFilms] = useState<IFilm[]>();
  const [featureFilms, setFeatureFilms] = useState<IFilm[]>();
  const [showingFilms, setShowingFilms] = useState<IFilm[]>();
  const [tvShowFilms, setTvShowFilms] = useState<IFilm[]>();
  const [filmsOfYear, setFilmsOfYear] = useState<IFilm[]>();

  const getNewFilmsData = async () => {
    const films = await getNewFilms(1);

    setNewFilms(films.items);
  };

  const getFilmsDrama = async () => {
    const films = await getFilmByGenre(NAV_LINK.DRAMA_FILMS.slug, 1);
    setDramaFilms(films.items);
  };

  const getFeatureFilms = async () => {
    const films = await getFilmByGenre(NAV_LINK.FEATURE_FILMS.slug, 1);
    setFeatureFilms(films.items);
  };

  const getShowingFilms = async () => {
    const films = await getFilmByGenre(NAV_LINK.CINEMA_FILMS.slug, 1);
    setShowingFilms(films.items);
  };

  const getTvShowFilms = async () => {
    const films = await getFilmByGenre(NAV_LINK.TV_SHOWS.slug, 1);
    setTvShowFilms(films.items);
  };

  const fetchFilmsByYear = async () => {
    const films = await getFilmsByYear("2024", 1);

    setFilmsOfYear(films.items);
  };

  useEffect(() => {
    Promise.all([
      getNewFilmsData(),
      getFilmsDrama(),
      getFeatureFilms(),
      getShowingFilms(),
      getTvShowFilms(),
      fetchFilmsByYear(),
    ]);
  }, []);

  return (
    <div className="w-320 mx-auto">
      <section className="py-4">
        <h2 className="text-[#da966e] text-2xl uppercase font-semibold pb-3">
          Phim đề cử
        </h2>
        {newFilms && (
          <FilmSlider
            films={newFilms}
            perView={5}
          />
        )}
      </section>

      <Grid
        gridTemplateColumns={"4fr 1fr"}
        gapX={10}
      >
        <Box>
          {dramaFilms && (
            <GridItems
              films={dramaFilms}
              title={NAV_LINK.DRAMA_FILMS.title}
              path={`${publicRoutes.films}?type=${NAV_LINK.DRAMA_FILMS.slug}`}
            />
          )}
          {featureFilms && (
            <GridItems
              films={featureFilms}
              title={NAV_LINK.FEATURE_FILMS.title}
              path={`${publicRoutes.films}?type=${NAV_LINK.FEATURE_FILMS.slug}`}
            />
          )}
          {showingFilms && (
            <GridItems
              films={showingFilms}
              title={NAV_LINK.CINEMA_FILMS.title}
              path={`${publicRoutes.films}?type=${NAV_LINK.CINEMA_FILMS.slug}`}
            />
          )}
          {tvShowFilms && (
            <GridItems
              films={tvShowFilms}
              title={NAV_LINK.TV_SHOWS.title}
              path={`${publicRoutes.films}?type=${NAV_LINK.TV_SHOWS.slug}`}
            />
          )}
        </Box>
        {filmsOfYear && (
          <SideBar
            films={filmsOfYear}
            title="Trending"
          />
        )}
      </Grid>
    </div>
  );
}
