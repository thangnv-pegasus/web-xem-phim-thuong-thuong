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
import { registerService } from '../../../services/auth'; // 🔥 cần tạo API service tương tự loginService
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { ROLE } from '../../../constants';

// ✅ Schema validate
const schema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirm_password: z.string().min(6, 'Xác nhận mật khẩu phải có ít nhất 6 ký tự'),
}).refine((data) => data.password === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Mật khẩu xác nhận không khớp',
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // call api đăng ký tài khoản, nếu đúng thì thông báo, nếu thất bại thông báo ra màn hình
  const onSubmit = async (data: FormData) => {
    const res = await registerService({
      name: data.name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      role: ROLE.USER
    });
    console.log('Register response:', res);

    if(!(res?.status === 200 || res?.status === 201 || res?.id)) {
      toast.error(res?.response?.data?.message || 'Đăng ký thất bại! Vui lòng thử lại.')
    }else {
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      nav('/login');
    }
    
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) nav('/');
  }, [nav]);

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
          Đăng ký
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <Field.Root invalid={!!errors.name}>
            <Field.Label color="gray.300">
              Họ và tên <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="text"
              placeholder="Nguyễn Văn A"
              {...register('name')}
              bg="#2a2a2a"
              borderColor="gray.600"
              _hover={{ borderColor: '#da966e' }}
              _focus={{ borderColor: '#da966e', boxShadow: '0 0 0 1px #da966e' }}
              color="white"
              _placeholder={{ color: 'gray.500' }}
            />
            {errors.name && (
              <Text color="red.400" fontSize="sm" mt={1}>
                {errors.name.message}
              </Text>
            )}
          </Field.Root>

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

          {/* Confirm Password */}
          <Field.Root invalid={!!errors.confirm_password}>
            <Field.Label color="gray.300">Xác nhận mật khẩu</Field.Label>
            <Input
              type="password"
              placeholder="********"
              {...register('confirm_password')}
              bg="#2a2a2a"
              borderColor="gray.600"
              _hover={{ borderColor: '#da966e' }}
              _focus={{ borderColor: '#da966e', boxShadow: '0 0 0 1px #da966e' }}
              color="white"
              _placeholder={{ color: 'gray.500' }}
            />
            {errors.confirm_password && (
              <Text color="red.400" fontSize="sm" mt={1}>
                {errors.confirm_password.message}
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
            Đăng ký
          </Button>
        </form>

        <Text textAlign="center" mt={6} fontSize="sm" color="gray.400">
          Đã có tài khoản?{' '}
          <Text
            as="span"
            color="#da966e"
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => nav('/login')}
          >
            Đăng nhập
          </Text>
        </Text>
      </Box>
    </div>
  );
}
