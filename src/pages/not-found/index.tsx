import { Box, Image } from '@chakra-ui/react';
import notfound from '../../../public/404-img.png';

export default function NotFound() {
  return (
    <Box className="min-h-screen w-320 mx-auto py-10">
      <Image src={notfound} className='w-full h-full'/>
    </Box>
  );
}
