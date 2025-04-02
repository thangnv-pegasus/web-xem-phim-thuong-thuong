import { useEffect, useState } from "react";
import { getFilmByGenre, getNewFilms } from "../../services";
import { IFilm } from "../../types";
import FilmSlider from "../../components/ui/fiilm-slider";
import GridItems from "../../components/ui/grid-items";
import { NAV_LINK } from "../../constants/page";
import { publicRoutes } from "../../config/router";
import { Grid } from "@chakra-ui/react";

export default function HomePage() {
  const [newFilms, setNewFilms] = useState<IFilm[]>();
  const [dramaFilms, setDramaFilms] = useState<IFilm[]>();
  const [featureFilms, setFeatureFilms] = useState<IFilm[]>();

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
  }

  useEffect(() => {
    getNewFilmsData();
    getFilmsDrama();
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

      <Grid gridTemplateColumns={"4fr 1fr"}>
        <div>
          {dramaFilms && (
            <GridItems
              films={dramaFilms}
              title={NAV_LINK.DRAMA_FILMS.title}
              path={`${publicRoutes.films}?type=${NAV_LINK.DRAMA_FILMS.slug}`}
            />
          )}
        </div>
        <div></div>
      </Grid>
    </div>
  );
}
