import axios from 'axios';

export const fetchData = async (params: {
  page: number;
  pageSize: number;
  status?: string;
}) => {
  const { page, pageSize, status } = params;
  const url = 'http://localhost:3000/requests';
  try {
    const res = await axios.get(url, {
      params: {
        page: page,
        limit: pageSize,
        ...(status && { status }),
      },
    });
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};
