/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import SideBar from "../../components/base/layout/side-bar";
import { IBaseReponse, ICountry, IFilm } from "../../types";
import { getFilmByGenre, getFilmsByCountry, getFilmSeries, getFilmsPagination, getFilmTrending, getSingleFilms } from "../../services";
import { v4 as uuid } from "uuid";
import Film from "../../components/ui/film-item-card";
import { useSearchParams } from "react-router";
import { NAV_LINK } from "../../constants/page";
import BasePagination from "../../components/base/pagination";
import Loading from "../../components/base/layout/loading";
import { getAllCategories, ICategory } from "../../services/categoties";
import { getAllCountries } from "../../services/countries";

export default function FilmsPage() {
  const [filmTrending, setFilmTrending] = useState<IFilm[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [params, _setParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let pageName;
  const [countries, setCountries] = useState<ICountry[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  const getCountries = async () => {
    const res = await getAllCountries()

    setCountries(res)
  }

  const getCategories = async () => {
    const res = await getAllCategories()

    setCategories(res)
  }

  if (params.get('type') === 'phim-moi') {
    pageName = 'Phim mới'
  }
  else if (params.get('type') === 'phim-bo') {
    pageName = 'Phim bộ'
  }
  else if (params.get('type') === 'phim-le') {
    pageName = 'Phim lẻ'
  } else if (categories.find(item => item.slug === params.get('type'))) {
    pageName = categories.find(item => item.slug === params.get('type'))?.name
  } else if (countries.find(item => item.slug === params.get('type'))) {
    pageName = countries.find(item => item.slug === params.get('type'))?.name
  }

  // call api lấy danh sách phim trending
  const fetchFilmTrending = async () => {
    const films = await getFilmTrending(1);

    setFilmTrending(films.data);
  };

  // call api lấy danh sách phim mới
  const fetchNewFilms = async () => {
    const films = await getFilmsPagination(page, 12);

    setFilms(films.data);
    setPageSize(films.meta.last_page);
  };

  // call api lấy danh sách phim theo thể loại
  const fetchFilmsByGenre = async () => {
    let films: IBaseReponse<IFilm[]> = {
      data: [],
      meta: {
        page: 1,
        last_page: 1,
        total: 1,
      },
      status: 'error'
    }
    // nếu người dùng tìm kiếm phim lẻ thì call api lấy danh sách phim lẻ
    if (params.get('type') === 'phim-le') {
      films = await getSingleFilms(page, 12)
      // nếu người dùng tìm phim bộ thì call api lấy danh sách phim bộ
    } else if (params.get('type') === 'phim-bo') {
      films = await getFilmSeries(page, 12);
      // nếu người dùng tim các thể loại khác thì call api lấy danh sách phim theo thể loại
    } else {
      films = await getFilmByGenre(params.get("type") ?? "", page);
      if (films.data.length === 0) {
        films = await getFilmsByCountry(params.get("type") ?? "", page);
        console.log('>>> films >>> ', films)
      }
    }
    console.log('>>> films >>> ', films)
    setFilms(films.data);
    setPageSize(films.meta.last_page);
  };

  useEffect(() => {
    fetchFilmTrending();
    getCountries()
    getCategories()
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
            {pageName}
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
            className="flex justify-center"
            pageCount={pageSize}
            pageSize={page}
            setPage={setPage}
          />
        </Box>
        <SideBar
          films={filmTrending}
          title="trending"
          key={uuid()}
        />
      </Grid>
    </>
  );
}
