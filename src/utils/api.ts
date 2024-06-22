import axios from 'axios';

export const fetchData = async (params: {
  page: number;
  pageSize: number;
  status?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc' | '';
}) => {
  const { page, pageSize, status, search, sort, order } = params;
  const url = 'http://localhost:3000/requests';
  try {
    const res = await axios.get(url, {
      params: {
        page: page,
        limit: pageSize,
        ...(status && { status }),
        ...(search && { search }),
        ...(sort && { sort }),
        ...(order && { order }),
      },
    });
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};
