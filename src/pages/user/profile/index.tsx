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
import { useState } from 'react';
import dayjs from 'dayjs';

export default function UserProfilePage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const watchHistory = [
    { id: 1, title: 'One Piece', episode: 'Tập 1080', watchedAt: '2025-10-23 19:30' },
    { id: 2, title: 'Attack on Titan', episode: 'Tập 12', watchedAt: '2025-10-22 22:00' },
    { id: 3, title: 'Demon Slayer', episode: 'Tập 5', watchedAt: '2025-10-20 21:10' },
  ];

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
                  {user?.avatar ? (
                    <Avatar.Image src={user.avatar} alt={user.name} />
                  ) : (
                    <Avatar.Fallback className="bg-[#2a2a2a] text-white text-lg font-semibold">
                      {user?.name ? user.name[0].toUpperCase() : 'K'}
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
                <Box>
                  <Text className="text-lg font-semibold">{user?.name || 'Khách'}</Text>
                  <Text className="text-gray-400">{user?.email || 'Chưa có email'}</Text>
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
                  {watchHistory.map((item, index) => (
                    <TableRow key={item.id} className="border-b border-[#2c2c2c] hover:bg-[#222] transition">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.episode}</TableCell>
                      <TableCell className="text-right text-gray-400">
                        {dayjs(item.watchedAt).format('DD/MM/YYYY HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table.Root>
            </Box>
          </TabsContent>
        </Tabs.Root>
      </Box>
    </Box>
  );
}
