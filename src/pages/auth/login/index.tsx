'use client';
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  Field,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginService } from '../../../services/auth';
import { redirect, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useAuth } from '../../../context/authContext';

// ✅ Schema validate
const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const nav = useNavigate();
  const { setUser } = useAuth(); // ✅ lấy từ context

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await loginService(data);

    if (res) {
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user); // ✅ cập nhật state toàn app
      toast.success('Đăng nhập thành công!');
      return nav('/');
    } else {
      toast.error('Thông tin đăng nhập không đúng!');
    }
  };

  return (
    <div className="min-h-screen flex py-10 items-center justify-center bg-black text-white">
      <Box
        bg="#1a1a1a"
        p={8}
        rounded="2xl"
        shadow="2xl"
        className="w-full max-w-md border border-[#2c2c2c]"
      >
        <Heading
          as="h2"
          size="lg"
          textAlign="center"
          mb={8}
          color="#da966e"
          fontWeight="semibold"
          className="font-semibold text-2xl uppercase"
        >
          Đăng nhập
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <Field.Root invalid={!!errors.email}>
            <Field.Label color="gray.300">
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="email"
              placeholder="me@example.com"
              {...register('email')}
              bg="#2a2a2a"
              borderColor="gray.600"
              _hover={{ borderColor: '#da966e' }}
              _focus={{ borderColor: '#da966e', boxShadow: '0 0 0 1px #da966e' }}
              color="white"
              _placeholder={{ color: 'gray.500' }}
            />
            {errors.email && (
              <Text color="red.400" fontSize="sm" mt={1}>
                {errors.email.message}
              </Text>
            )}
          </Field.Root>

          {/* Password */}
          <Field.Root invalid={!!errors.password}>
            <Field.Label color="gray.300">Mật khẩu</Field.Label>
            <Input
              type="password"
              placeholder="********"
              {...register('password')}
              bg="#2a2a2a"
              borderColor="gray.600"
              _hover={{ borderColor: '#da966e' }}
              _focus={{ borderColor: '#da966e', boxShadow: '0 0 0 1px #da966e' }}
              color="white"
              _placeholder={{ color: 'gray.500' }}
            />
            {errors.password && (
              <Text color="red.400" fontSize="sm" mt={1}>
                {errors.password.message}
              </Text>
            )}
          </Field.Root>

          {/* Submit */}
          <Button
            type="submit"
            width="full"
            size="md"
            mt={4}
            bg="#da966e"
            color="white"
            _hover={{ bg: '#c5845d' }}
            _active={{ bg: '#b6744f' }}
            fontWeight="semibold"
            rounded="xl"
          >
            Đăng nhập
          </Button>
        </form>

        <Text textAlign="center" mt={6} fontSize="sm" color="gray.400">
          Chưa có tài khoản?{' '}
          <Text
            as="span"
            color="#da966e"
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => nav('/register')}
          >
            Đăng ký
          </Text>
        </Text>
      </Box>
    </div>
  );
}
