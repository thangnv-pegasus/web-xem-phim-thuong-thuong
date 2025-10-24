'use client';
import {
  Button,
  Box,
  VStack,
  Text,
  Portal,
  Popover,
  PopoverCloseTrigger,
  Avatar,
} from '@chakra-ui/react';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/authContext';

export default function UserAvatarMenu({ user }: { user: any }) {
  const nav = useNavigate();
  const { logout } = useAuth()

  return (
    <Popover.Root>
      {/* Trigger */}
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-0 hover:bg-gray-800 transition"
          aria-label="Open user menu"
        >
          <Avatar.Root className="w-9 h-9 border-2 border-[#da966e]">
            {user?.avatar ? (
              <Avatar.Image src={user.avatar} alt={user.name} />
            ) : (
              <Avatar.Fallback className="bg-[#2a2a2a] text-white text-sm font-semibold">
                {user?.name
                  ? user.name.slice(0, 2).toUpperCase()
                  : 'K'}
              </Avatar.Fallback>
            )}
          </Avatar.Root>
        </Button>
      </Popover.Trigger>

      {/* Content */}
      <Portal>
        <Popover.Positioner>
          <Popover.Content className="w-56 rounded-2xl shadow-lg bg-[#1a1a1a] text-white border border-[#2c2c2c]">
            <Popover.Arrow />
            <Popover.Body className="p-4">
              <VStack align="start">
                <Box className="w-full pb-2 border-b border-[#2c2c2c]">
                  <Text className="font-semibold">{user?.name || 'Khách'}</Text>
                  <Text className="text-sm text-gray-400">
                    {user?.email || 'Chưa có email'}
                  </Text>
                </Box>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 hover:bg-gray-800"
                  onClick={() => nav('/user')}
                >
                  <UserIcon size={16} />
                  Trang cá nhân
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 hover:bg-red-900 text-red-400"
                  onClick={() => {
                    logout()
                  }}
                >
                  <LogOut size={16} />
                  Đăng xuất
                </Button>
              </VStack>
            </Popover.Body>

            <PopoverCloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
