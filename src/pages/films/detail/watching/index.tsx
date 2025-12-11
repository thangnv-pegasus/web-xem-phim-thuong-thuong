import { Box, Field, Grid, Text } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router';
import { getDetailFilm, postFilmHistory } from '../../../../services';
import { useEffect, useState } from 'react';
import { IFilmDetail } from '../../../../types';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../../../context/authContext';
import { MessageSquareText } from 'lucide-react';
import { getCommentsByEpisodeId, postCommentFilm } from '../../../../services/films';
import { IComment } from '../../../../types/comment';
import UserAvatarMenu from '../../../../components/ui/user-menu';

export default function WatchFilm() {
  const [film, setFilm] = useState<IFilmDetail>();
  const [isHistoried, setIsHistoried] = useState(false)
  const [comments, setComments] = useState<IComment[]>([])
  const paths = useParams();
  const { user } = useAuth()

  // hàm call api lấy thông tin chi tiết của phim
  const fetchDetailFilm = async () => {
    const res = await getDetailFilm(paths.filmSlug ?? '');
    setFilm(res);
  };

  const fetchListComment = async () => {
    if (!!paths.episodeId) {
      const res = await getCommentsByEpisodeId(+paths.episodeId, 1, 12);
      console.log('res comments', res);
      setComments(res.data);
    };
  }

  // hàm call api lưu lịch sử xem phim của người dùng
  const createHistoryUser = async () => {
    if (!!paths.episodeId && !!user) {
      const res = await postFilmHistory(+paths.episodeId)
      setIsHistoried(true)
    }
  }
  useEffect(() => {
    fetchDetailFilm();
    fetchListComment();
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
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
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
        <Box>
          <div className='flex items-center gap-x-2 text-base font-medium'><MessageSquareText className='size-5 text-[#dd003f]' /> Bình luận</div>
          <Box>
            {paths?.episodeId && <CommentForm episodeId={+paths?.episodeId} />}
          </Box>
          <Box className="mt-6">
            {comments?.length > 0 && comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import {
  Textarea,
  Button,
} from "@chakra-ui/react";
import { toast } from 'sonner';
import dayjs from 'dayjs';

function CommentForm({ episodeId }: { episodeId: number }) {
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const nav = useNavigate();

  const submitComment = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để bình luận', {
        position: 'top-center',
        className: 'text-green-700 bg-white'
      });
      nav('/login');
      return;
    };

    const params = {
      episodeId,
      content: comment,
      userId: user.id
    }
    const res = await postCommentFilm(params);
    if (!!res?.id) {
      toast.success('Bình luận thành công', {
        position: 'top-center',
        className: 'text-green-700 bg-white'
      });
      setComment('');
    } else {
      toast.error('Bình luận thất bại, vui lòng thử lại', {
        position: 'top-center',
        className: 'text-green-700 bg-white'
      });
    }
  }

  return (
    <Box
      className="text-white p-6 rounded-xl mt-5 border border-gray-700 w-full mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Viết bình luận</h2>
      <form onSubmit={(e) => { e.preventDefault(); submitComment(); }}>
        {/* Comment */}
        <Field.Root className="mb-4">
          <Field.Label className="text-gray-300">Để lại bình luận</Field.Label>
          <Textarea
            placeholder="Để lại bình luận"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-transparent border-gray-700"
          />
        </Field.Root>

        {/* Submit */}
        <Button
          type="submit"
          colorScheme="orange"
          className="mt-4 px-6 py-2 rounded-lg"
          onSubmit={submitComment}
        >
          Gửi bình luận
        </Button>

        <p className="text-sm text-gray-400 mt-2">
          * Không cần đăng nhập. Bình luận vi phạm chính sách sẽ bị xoá.
        </p>
      </form>
    </Box>
  );
}


const CommentItem = ({ comment }: { comment: IComment }) => {
  const { user } = useAuth();
  return (
    <Box className="py-4 border-b border-b-[#383737] flex items-start gap-x-4">
      <UserAvatarMenu user={user} />
      <div className='flex flex-col gap-y-2'>
        <div className='flex items-center gap-x-1'>
          <Text className='font-medium'>{comment.user.name} - </Text>
          <Text className='text-xs opacity-80 leading-3'>{dayjs(comment.createdAt).format('DD/MM/YYYY hh:mm:ss')}</Text>
        </div>
        <Text className="text-white">{comment.content}</Text>
      </div>
    </Box>
  )
}
