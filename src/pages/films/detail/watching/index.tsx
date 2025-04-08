import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { getDetailFilm } from '../../../../services';
import { useEffect, useState } from 'react';
import { IDetailFilm } from '../../../../types';

export default function WatchFilm() {
  const [film, setFilm] = useState<IDetailFilm>();
  const [epsode, setEpsode] = useState<string>('');
  const paths = useParams();

  const fetchDetailFilm = async () => {
    const res = await getDetailFilm(paths.filmSlug ?? '');

    setFilm(res.movie)
  };

  useEffect(() => {
    fetchDetailFilm();
  }, []);

  return (
    <Box className="min-h-screen">
      <Box className="w-320 mx-auto py-10">
        <Box>
            {/* <video src={film.} /> */}
        </Box>
      </Box>
    </Box>
  );
}
