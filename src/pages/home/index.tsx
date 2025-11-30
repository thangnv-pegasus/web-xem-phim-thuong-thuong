import { useEffect, useState } from "react";
import { getFilmByGenre, getFilmSeries, getFilmsSuggest, getFilmTrending, getSingleFilms } from "../../services";
import { IFilm } from "../../types";
import FilmSlider from "../../components/ui/fiilm-slider";
import GridItems from "../../components/ui/grid-items";
import { NAV_LINK } from "../../constants/page";
import { publicRoutes } from "../../config/router";
import { Box, Grid } from "@chakra-ui/react";
import SideBar from "../../components/base/layout/side-bar";

export default function HomePage() {
  const [newFilms, setNewFilms] = useState<IFilm[]>();
  const [filmSeries, setFilmSeries] = useState<IFilm[]>();
  const [featureFilms, setFeatureFilms] = useState<IFilm[]>();
  const [actionFilm, setActionFilm] = useState<IFilm[]>();
  const [dangerFilm, setDangerFilm] = useState<IFilm[]>();
  const [filmTrending, setFilmTrending] = useState<IFilm[]>();

  // hàm call api lấy danh sách phim gợi ý
  const fetchFilmSuggest = async () => {
    const films = await getFilmsSuggest();
    setNewFilms(films);
  };

  // hàm call api lấy danh sách phim bộ
  const fetchFilmSeries = async () => {
    const films = await getFilmSeries(1);

    setFilmSeries(films.data);
  };

  // hàm call api lấy danh sahcs phim lẻ
  const fetchSingleFilm = async () => {
    const films = await getSingleFilms(1);

    setFeatureFilms(films.data);
  };

  // hàm call api lấy danh sách phim hành động
  const getFilmsAction = async () => {
    const films = await getFilmByGenre('hanh-dong', 1);

    setActionFilm(films.data);
  };

  // hàm call api lấy danh sách phim kinh dị
  const getDangerFilm = async () => {
    const films = await getFilmByGenre('kinh-di', 1);

    setDangerFilm(films.data);
  };

  // hàm call api lấy danh sách phim trending
  const fetchFilmTrending = async () => {
    const films = await getFilmTrending(1);

    setFilmTrending(films.data);
  };

  useEffect(() => {
    Promise.all([
      fetchFilmSuggest(),
      fetchFilmSeries(),
      fetchSingleFilm(),
      getFilmsAction(),
      getDangerFilm(),
      fetchFilmTrending(),
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
          {filmSeries && (
            <GridItems
              films={filmSeries}
              title={NAV_LINK.DRAMA_FILMS.title ?? "Phim bộ"}
              path={`${publicRoutes.films}?type=${NAV_LINK.DRAMA_FILMS.slug}`}
            />
          )}
          {featureFilms && (
            <GridItems
              films={featureFilms}
              title={NAV_LINK.FEATURE_FILMS.title ?? "Phim lẻ"}
              path={`${publicRoutes.films}?type=${NAV_LINK.FEATURE_FILMS.slug}`}
            />
          )}
          {actionFilm && (
            <GridItems
              films={actionFilm}
              title="Phim hành động"
              path={`${publicRoutes.films}?type=hanh-dong`}
            />
          )}
          {dangerFilm && (
            <GridItems
              films={dangerFilm}
              title='Phim kinh dị'
              path={`${publicRoutes.films}?type=kinh-di`}
            />
          )}
        </Box>
        {filmTrending && (
          <SideBar
            films={filmTrending}
            title="Trending"
          />
        )}
      </Grid>
    </div>
  );
}
