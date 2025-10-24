import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react';
import SideBar from '../../../components/base/layout/side-bar';
import { useEffect, useState } from 'react';
import { IDetailFilm, IFilm, IFilmDetail } from '../../../types';
import {
  getDetailFilm,
  getFilmByGenre,
  getFilmTrending,
} from '../../../services';
import { Link, useParams } from 'react-router';
import { MdPlayCircleOutline } from 'react-icons/md';
import FilmSlider from '../../../components/ui/fiilm-slider';

export default function DetailFilmPage() {
  const [filmTrending, setFilmTrending] = useState<IFilm[]>([]);
  const [filmDetail, setFilmDetail] = useState<IFilmDetail>();
  const [filmsByGenre, setFilmsByGenre] = useState<IFilm[]>([]);
  const pathName = useParams();

  const fetchFilmTrending = async () => {
      const films = await getFilmTrending(1);
  
      setFilmTrending(films.data);
    };

  const fetchDetailFilm = async () => {
    const res = await getDetailFilm(pathName.filmSlug ?? '');
    if(res) {
      setFilmDetail(res);
    }
  };

  console.log('>>> film detail >>> ', filmDetail)

  const getFilmCategoryString = () => {
    return filmDetail?.filmCategories.map((item) => item.category.name).join(', ');
  };

  const fetchFilmsByGenre = async () => {
    const res = await getFilmByGenre(
      filmDetail?.filmCategories[0].category.slug ?? 'hanh-dong',
      1
    );

    setFilmsByGenre(res.data);
  };

  useEffect(() => {
    fetchFilmTrending();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    fetchDetailFilm();
  }, [pathName.filmSlug]);

  useEffect(() => {
    fetchFilmsByGenre();
  }, [filmDetail]);

  return (
    <Box className="min-h-screen">
      <Box className="w-320 mx-auto py-10">
        <Grid gridTemplateColumns={'3fr 1fr'} gapX={10}>
          <Box>
            <Flex className="w-full min-h-20 bg-[#181818] p-5 gap-x-10">
              <Link
                to={`/films/${pathName.filmSlug}/${filmDetail?.episodes[0].id}`}
                className="block h-110 relative group"
              >
                <img
                  src={filmDetail?.thumb_url}
                  alt={filmDetail?.name}
                  className="w-ful h-full object-cover object-center"
                />
                <Button className="absolute bottom-0 left-0 right-0 bg-[#dd003f] rounded-none text-white uppercase font-semibold text-xs">
                  Xem Phim
                </Button>
                <Flex
                  justifyContent={'center'}
                  alignItems={'center'}
                  className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] hidden group-hover:flex transition-all ease-linear duration-200 text-4xl"
                >
                  <MdPlayCircleOutline />
                </Flex>
              </Link>
              <Box className="flex-1">
                <h2 className="text-3xl font-bold uppercase mb-2 text-primary">
                  {filmDetail?.name}
                </h2>
                <p className="text-xs text-[#999] mb-3">
                  {filmDetail?.original_name}
                </p>
                <Box className="bg-[#222] min-h-20 w-full p-4 text-[#bbb] text-xs space-y-3 font-semibold">
                  <p>{`${filmDetail?.name} - ${filmDetail?.original_name}`}</p>
                  
                  <Text>Thời lượng: {filmDetail?.time}</Text>
                  <Text>Số tập: {filmDetail?.total_episodes}</Text>
                  <Text>Chất lượng: {filmDetail?.quality}</Text>
                  <Text>Thể loại: {getFilmCategoryString()}</Text>
                  <Text>Đạo diễn: {filmDetail?.director || 'đang cập nhật'}</Text>
                  <Text>Diễn viên: {filmDetail?.casts || 'đang cập nhật'}</Text>
                </Box>
              </Box>
            </Flex>
            <Box className="my-5">
              <Text className='uppercase py-2 inline-block text-primary font-semibold text-2xl relative before:absolute before:top-full before:content-[""] before:left-0 before:right-1/2 before:h-0.75 before:bg-primary'>
                Nội dung chi tiết
              </Text>
              <Text className="mb-3 mt-8 text-2xl font-medium">
                {filmDetail?.name}
              </Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: filmDetail?.description ?? '',
                }}
                className="text-[#abb7c4] leading-7 text-sm"
              />
            </Box>
            <Box className="max-w-240">
              <Text className="text-2xl font-medium uppercase text-primary py-3 border-b-2 border-dashed border-[#383737] mb-5">
                Có thể bạn sẽ thích
              </Text>
              {filmsByGenre && <FilmSlider films={filmsByGenre} perView={4} />}
            </Box>
          </Box>
          <SideBar films={filmTrending} title="Trending" />
        </Grid>
      </Box>
    </Box>
  );
}
