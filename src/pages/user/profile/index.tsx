'use client';
import {
  Box,
  Tabs,
  VStack,
  Text,
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  TabsList,
  TabsTrigger,
  TabsIndicator,
  TabsContent,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { updateUser } from '../../../services/auth';
import { toast } from 'sonner';
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router';
import { IFilmHistory } from '../../../types/history';
import { getFilmHistories } from '../../../services/films';
import BasePagination from '../../../components/base/pagination';

export default function UserProfilePage() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const { user, setUser } = useAuth();
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [histories, setHistories] = useState<IFilmHistory[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const nav = useNavigate()

  const updateUserInfo = async () => {
    try {
      const newData = await updateUser({ name })

      localStorage.setItem('user', JSON.stringify(newData))
      setUser(newData)
      toast.success('Cập nhật thông tin thành công!')
    } catch (err) {
      toast.error('Cập nhật thông tin thất bại!')
    }
  }

  const fetchFilmHistories = async () => {
    const res = await getFilmHistories(page, 12)

    console.log('>>> res >>> ', res)
    setHistories(res.data)
    setLastPage(res.meta.last_page)
    setPage(res.meta.page)
  }

  useEffect(() => {
    if (!user) {
      nav('/')
    }
  }, [user])

  useEffect(() => {
    fetchFilmHistories()
  }, [])

  return (
    <Box className="min-h-screen bg-black text-white flex justify-center py-10 px-4">
      <Box className="w-full max-w-4xl bg-[#1a1a1a] p-8 rounded-2xl shadow-lg border border-[#2c2c2c]">
        <Text className="text-2xl font-semibold text-[#da966e] mb-6 text-center uppercase">
          Hồ sơ cá nhân
        </Text>

        {/* Tabs */}
        <Tabs.Root defaultValue="info">
          <TabsList className="flex justify-center mb-6 gap-6">
            <TabsTrigger value="info" className="text-gray-300 data-[selected]:text-[#da966e] font-medium">
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger value="history" className="text-gray-300 data-[selected]:text-[#da966e] font-medium">
              Lịch sử xem phim
            </TabsTrigger>
          </TabsList>

          <TabsIndicator className="bg-[#da966e] h-[2px] rounded-full" />

          {/* Thông tin cá nhân */}
          <TabsContent value="info">
            <VStack align="start">
              <Box className="flex items-center gap-4">
                <Avatar.Root className="w-20 h-20 border-2 border-[#da966e]">
                  {userData?.avatar ? (
                    <Avatar.Image src={userData.avatar} alt={userData.name} />
                  ) : (
                    <Avatar.Fallback className="bg-[#2a2a2a] text-white text-lg font-semibold">
                      {userData?.name ? userData.name[0].toUpperCase() : 'K'}
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
                <Box>
                  <Text className="text-lg font-semibold">{userData?.name || 'Khách'}</Text>
                  <Text className="text-gray-400">{userData?.email || 'Chưa có email'}</Text>
                </Box>
              </Box>

              <Box className="w-full space-y-4">
                <Box>
                  <Text className="text-sm text-gray-400 mb-1">Tên hiển thị</Text>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    bg="#2a2a2a"
                    borderColor="gray.600"
                    color="white"
                    _hover={{ borderColor: '#da966e' }}
                    _focus={{ borderColor: '#da966e', boxShadow: '0 0 0 1px #da966e' }}
                  />
                </Box>

                <Box>
                  <Text className="text-sm text-gray-400 mb-1">Email</Text>
                  <Input
                    value={email}
                    readOnly
                    bg="#2a2a2a"
                    borderColor="gray.600"
                    color="gray.400"
                  />
                </Box>

                <Button
                  mt={4}
                  bg="#da966e"
                  color="white"
                  _hover={{ bg: '#c5845d' }}
                  _active={{ bg: '#b6744f' }}
                  className="rounded-xl font-medium"
                  onClick={() => updateUserInfo()}
                >
                  Cập nhật thông tin
                </Button>
              </Box>
            </VStack>
          </TabsContent>

          {/* Lịch sử xem phim */}
          <TabsContent value="history">
            <Box className="overflow-x-auto mt-4">
              <Table.Root>
                <TableHeader>
                  <TableRow className="border-b border-[#2c2c2c]">
                    <TableCell className="text-gray-400 font-semibold w-12">#</TableCell>
                    <TableCell className="text-gray-400 font-semibold">Tên phim</TableCell>
                    <TableCell className="text-gray-400 font-semibold">Tập phim</TableCell>
                    <TableCell className="text-gray-400 font-semibold text-right">Thời gian xem</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {histories.map((item, index) => (
                    <TableRow key={item.id} className="border-b border-[#2c2c2c] hover:bg-[#222] transition">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.episode.film.name}</TableCell>
                      <TableCell>{item.episode.name}</TableCell>
                      <TableCell className="text-right text-gray-400">
                        {dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table.Root>
            </Box>
            {lastPage && <BasePagination setPage={setPage} pageCount={lastPage} pageSize={12} />}
          </TabsContent>
        </Tabs.Root>
      </Box>
    </Box>
  );
}
