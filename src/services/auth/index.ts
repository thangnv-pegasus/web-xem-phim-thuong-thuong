import { http } from "../../config/axios";

export const loginService = async ({ email, password }: { email: string; password: string }) => {
  try {
    const res = await http.post('auth/login', {
      email,
      password
    })

    return res.data
  } catch (err) {
    console.error('>>> login err >>> ', err)

    return null;
  }
}

export const registerService = async ({ email, password, confirm_password, name, role }: { email: string; password: string, confirm_password: string, name: string, role: number }) => {
  try {
    const res = await http.post('auth/register', {
      email,
      password,
      confirm_password,
      name,
      role,
    })

    return res.data
  } catch (err) {
    console.error('>>> login err >>> ', err)

    return err;
  }
}

export async function logoutService() {
  return await http.post('auth/logout')
}

export async function updateUser(payload: any) {
  const user = JSON.parse(localStorage.getItem('user') || '')
  if (!!user) {
    const res = await http.patch(`users/${user.id}`, payload)

    return res.data
  }

  return null;
}