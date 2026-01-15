import axiosInstance from "../../../shared/api/axiosInstance";

export async function ForgotPassEmail(values) {
  try {
    const { data } = await axiosInstance.post('/Users/Reset/Request', values);
    return data;
  } catch (error) {
    throw error;
  }
}
