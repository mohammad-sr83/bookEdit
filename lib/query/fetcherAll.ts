import axios from "axios";
import useSWRMutation from "swr/mutation";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

export const fetcherIndex = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

// export const fetcherCreate = async (url: string, { arg }: { arg: FormData }) => {
//     const response = await axios.post(url, arg, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
// };

// export const fetcherUpdate = async (url: string, { arg }: { arg: FormData }) => {
//   const response = await axios.put(url, arg, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };


// const fetcherBookDelete = async (url: string, { arg }: { arg: string | number }) => {
//   const response = await axios.delete(`${url}/${arg}`);
//   return response.data;
// };

// export const useDelete = (url:string) => {
//   return useSWRMutation(url, fetcherBookDelete);
// };