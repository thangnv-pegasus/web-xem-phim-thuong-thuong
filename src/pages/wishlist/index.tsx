import { Box, Grid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { v4 as uuid } from 'uuid';
import { IFilm } from '../../types';
import { useAuth } from '../../context/authContext';
import { getWishlist } from '../../services/films';
import { getFilmsSuggest } from '../../services';
import BasePagination from '../../components/base/pagination';
import Film from '../../components/ui/film-item-card';
import SideBar from '../../components/base/layout/side-bar';

export default function WishlistPage() {
  const [filmSuggest, setFilmSuggest] = useState<IFilm[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { user } = useAuth();

  const fetchFilms = async () => {
    if (user?.id) {
      const res = await getWishlist(user.id);
      setFilms(res.data);
      setTotalPage(res.meta.last_page);
    }
  };

  // hàm call api lấy danh sách phim gợi ý
  const fetchFilmSuggest = async () => {
    const res = await getFilmsSuggest();
    setFilmSuggest(res);
  };

  useEffect(() => {
    fetchFilmSuggest();
    fetchFilms();
  }, []);

  return (
    <Box>
      <Box className="w-320 mx-auto py-10 min-h-screen">
        <Box>
          <Grid gridTemplateColumns={'3fr 1fr'} gapX={10}>
            <Box>
              {!!films && films.length > 0 ? (
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
                  {totalPage > 1 && <BasePagination
                    pageCount={totalPage}
                    setPage={setPage}
                    defaultPage={page}
                    pageSize={10}
                    className='flex justify-center'
                  />}
                </>
              ) : (
                <Text className='text-base text-gray-300'>Bạn chưa thêm phim nào</Text>
              )}
            </Box>

            <SideBar films={filmSuggest} title="Có thể bạn thích" />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
