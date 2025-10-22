/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid } from "@chakra-ui/react";
import SideBar from "../../components/base/layout/side-bar";
import { useEffect, useState } from "react";
import { IFilm } from "../../types";
import { getFilmByGenre } from "../../services";
import { v4 as uuid } from "uuid";
import Film from "../../components/ui/film-item-card";
import { useSearchParams } from "react-router";
import { NAV_LINK } from "../../constants/page";
import BasePagination from "../../components/base/pagination";
import Loading from "../../components/base/layout/loading";

export default function FilmsPage() {
  const [filmsOfYear, setFilmsOfYear] = useState<IFilm[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [params, _setParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let pageObject;

for (const link of Object.values(NAV_LINK)) {
  if (link.slug === params.get("type")) {
    pageObject = link;
    break;
  }

  const child = link.child?.find(item => item.slug === params.get("type"));
  if (child) {
    pageObject = child;
    break;
  }
}
  const fetchFilmsByYear = async () => {
    // const films = await getFilmsByYear("2024", 1);

    // setFilmsOfYear(films.items);
  };

  const fetchNewFilms = async () => {
    // const films = await getNewFilms(page);

    // setFilms(films.items);
    // setPageSize(films.paginate.total_page);
  };

  const fetchFilmsByGenre = async () => {
    // const films = await getFilmByGenre(params.get("type") ?? "", page);

    // setFilms(films.items);
    // setPageSize(films.paginate.total_page);
  };

  useEffect(() => {
    fetchFilmsByYear();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      setIsLoading(true);
      if (params.get("type") == NAV_LINK.NEW_FILMS.slug) {
        fetchNewFilms();
      } else {
        fetchFilmsByGenre();
      }
    } catch (e) {
      // throw exception
    } finally {
      setIsLoading(false);
    }
  }, [page, params.get("type")]);

  return (
    <>
      <Grid
        gridTemplateColumns={"4fr 1fr"}
        gapX={10}
        className="w-320 mx-auto py-10"
      >
        <Box>
          <h1 className="text-2xl uppercase font-semibold text-primary pb-5">
            {(pageObject as any).title || pageObject?.label}
          </h1>
          {isLoading ? (
            <Loading />
          ) : (
            <Grid
              gridTemplateColumns={"repeat(4,1fr)"}
              gap={10}
              className="min-h-screen"
            >
              {films.map((film, index) => (
                <Film
                  film={film}
                  key={index}
                />
              ))}
            </Grid>
          )}
          <BasePagination
            pageCount={pageSize}
            pageSize={page}
            setPage={setPage}
          />
        </Box>
        <SideBar
          films={filmsOfYear}
          title="trending"
          key={uuid()}
        />
      </Grid>
    </>
  );
}
