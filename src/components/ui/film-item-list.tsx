import { Box, Flex } from '@chakra-ui/react';
import { IFilm } from '../../types';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router';

interface IProps {
  film: IFilm;
  position: number;
  className?: string;
}

export default function FilmItemList({
  film,
  position = 1,
  className = '',
}: IProps) {
  return (
    <Flex className={twMerge('gap-x-4 py-2', className)} alignItems={'center'}>
      <Box className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-sm font-medium">
        {position}
      </Box>
      <Box className="flex-1">
        <Link
          to={`/films/${film.slug}`}
          className="transition-all ease-linear duration-300 hover:text-primary text-base line-clamp-1 font-medium"
          title={film.name}
        >
          {film.name}
        </Link>
        <p className="text-xs line-clamp-1 opacity-80 mt-1" title={film.original_name}>
          {film.original_name}
        </p>
      </Box>
    </Flex>
  );
}
