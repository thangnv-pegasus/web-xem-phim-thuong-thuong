import { Box } from '@chakra-ui/react';
import { IFilm } from '../../../types';
import { twMerge } from 'tailwind-merge';
import FilmItemList from '../../ui/film-item-list';
import { v4 as uuid } from 'uuid';

interface IProps {
  title: string;
  className?: string;
  films: IFilm[];
}

export default function SideBar({ title, className = '', films }: IProps) {
  return (
    <Box className={twMerge('', className)}>
      <h2 className="uppercase text-primary text-2xl py-4 font-medium border-b-2 border-dashed border-primary tracking-widest">
        {title}
      </h2>
      <Box className='py-5'>
        {films.map((film, index) => {
          return <FilmItemList film={film} position={index + 1} key={uuid()} />;
        })}
      </Box>
    </Box>
  );
}