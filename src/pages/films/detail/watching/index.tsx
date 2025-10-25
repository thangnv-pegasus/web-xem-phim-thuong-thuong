import { Box, Grid, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router';
import { getDetailFilm, postFilmHistory } from '../../../../services';
import { useEffect, useState } from 'react';
import { IFilmDetail } from '../../../../types';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../../../context/authContext';

export default function WatchFilm() {
  const [film, setFilm] = useState<IFilmDetail>();
  const [isHistoried, setIsHistoried] = useState(false)
  const paths = useParams();
  const {user} = useAuth()

  const fetchDetailFilm = async () => {
    const res = await getDetailFilm(paths.filmSlug ?? '');
    // console.log('>>> res >>> ', res);
    setFilm(res);
  };

  const createHistoryUser = async () => {
    if (!!paths.episodeId && !!user) {
      const res = await postFilmHistory(+paths.episodeId)
      console.log('>> res >> ', res)
      setIsHistoried(true)
    }
  }
  useEffect(() => {
    fetchDetailFilm();
  }, [paths.filmSlug]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setIsHistoried(false)
  }, [film])
  return (
    <Box className="min-h-screen">
      <Box className="w-320 mx-auto py-10">
        <Box className="h-130 w-full">
          {film && (
            <iframe
              src={
                film?.episodes.find(
                  (item) => item.id == Number(paths.episodeId)
                )?.url
              }
              className="w-full h-full"
              onLoad={async () => !isHistoried && await createHistoryUser()}
            />
          )}
        </Box>
        <Box>
          <Text className="text-primary uppercase text-2xl font-semibold py-3 mt-4 border-b-2 border-dashed border-[#383737]">
            Tập phim
          </Text>
          <Grid
            gridTemplateColumns={'repeat(14, 1fr)'}
            gap={4}
            className="mt-4"
          >
            {film?.episodes.map((item, index) => {
              return (
                <Link
                  to={`/films/${paths.filmSlug}/${item.id}`}
                  key={index}
                  className={twMerge(
                    'p-2 bg-white text-black rounded-md text-center text-sm block',
                    item.id == Number(paths.episodeId)
                      ? 'bg-[#dd003f] text-white'
                      : ''
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </Grid>
        </Box>
        <Box className="py-10">
          <Text className="text-primary uppercase text-xl font-semibold">
            {film?.name} - Tập{' '}
            {
              film?.episodes.find(
                (item) => item.id == Number(paths.episodeId)
              )?.name
            }
          </Text>
          <Text className="text-[#abb7c4]">{film?.original_name}</Text>
          <Text className='text-white text-lg py-3 font-medium'>{film?.name}, {film?.original_name}</Text>
          <div
            dangerouslySetInnerHTML={{
              __html: film?.description ?? '',
            }}
            className="text-[#abb7c4] leading-6"
          />
        </Box>
      </Box>
    </Box>
  );
}
