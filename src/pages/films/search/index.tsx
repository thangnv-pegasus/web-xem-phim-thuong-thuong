import { Box, Grid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { IFilm } from '../../../types';
import { getFilmsPagination, getFilmsSuggest } from '../../../services';
import SideBar from '../../../components/base/layout/side-bar';
import Film from '../../../components/ui/film-item-card';
import { v4 as uuid } from 'uuid';
import BasePagination from '../../../components/base/pagination';

export default function SearchPage() {
  const [params, _setSearchParams] = useSearchParams();
  const [filmSuggest, setFilmSuggest] = useState<IFilm[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchFilms = async () => {
    const res = await getFilmsPagination( page, 12, params.get('keyword') ?? '');
    setFilms(res.data);
    setTotalPage(res.meta.last_page);
  };

  const fetchFilmSuggest = async () => {
    const res = await getFilmsSuggest();
    setFilmSuggest(res);
  };

  useEffect(() => {
    fetchFilmSuggest();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    fetchFilms();
  }, [params.get('keyword'), page]);

  return (
    <Box>
      <Box className="w-320 mx-auto py-10 min-h-screen">
        <Text as={'h3'} className="text-lg font-medium uppercase">
          <Text as={'span'} className="text-primary">
            Kết quả tìm kiếm cho:
          </Text>{' '}
          {params.get('keyword')}
        </Text>
        <Box>
          <Grid gridTemplateColumns={'3fr 1fr'} gapX={10}>
            <Box>
              {films.length > 0 ? (
                <>
                  <Grid
                    className="py-5"
                    gridTemplateColumns={'repeat(4, 1fr)'}
                    gap={10}
                  >
                    {films.map((film) => (
                      <Film film={film} key={uuid()} className="" />
                    ))}
                  </Grid>
                  <BasePagination
                    pageCount={totalPage}
                    setPage={setPage}
                    defaultPage={1}
                    pageSize={10}
                    className='flex justify-center'
                  />
                </>
              ) : (
                <Text className='text-base mt-10 text-gray-300'>Không có kết quả</Text>
              )}
            </Box>

            <SideBar films={filmSuggest} title="Có thể bạn thích" />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
