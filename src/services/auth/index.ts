import { http } from "../../config/axios";

export const loginService = async ({email, password}: {email: string; password: string}) => {
  try {
    const res = await http.post('auth/login', {
      email,
      password
    })

    return res.data
  }catch(err) {
    console.error('>>> login err >>> ', err)

    return null;
  }
}