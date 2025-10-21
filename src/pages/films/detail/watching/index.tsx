import { Box, Grid, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router';
import { getDetailFilm } from '../../../../services';
import { useEffect, useState } from 'react';
import { IDetailFilm } from '../../../../types';
import { twMerge } from 'tailwind-merge';

export default function WatchFilm() {
  const [film, setFilm] = useState<IDetailFilm>();
  const paths = useParams();

  const fetchDetailFilm = async () => {
    const res = await getDetailFilm(paths.filmSlug ?? '');
    // console.log('>>> res >>> ', res);
    setFilm(res.movie);
  };

  useEffect(() => {
    fetchDetailFilm();
  }, [paths.filmSlug]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [film])
  return (
    <Box className="min-h-screen">
      <Box className="w-320 mx-auto py-10">
        <Box className="h-130 w-full">
          {film && (
            <iframe
              src={
                film?.episodes[0].items.find(
                  (item) => item.slug == paths.episodeSlug
                )?.embed
              }
              className="w-full h-full"
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
            {film?.episodes[0].items.map((item, index) => {
              return (
                <Link
                  to={`/films/${paths.filmSlug}/${item.slug}`}
                  key={index}
                  className={twMerge(
                    'p-2 bg-white text-black rounded-md text-center text-sm block',
                    item.slug == paths.episodeSlug
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
              film?.episodes[0].items.find(
                (item) => item.slug === paths.episodeSlug
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
