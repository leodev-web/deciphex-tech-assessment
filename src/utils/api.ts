import axios from 'axios';
import { GridRowSelectionModel } from '@mui/x-data-grid';

export const fetchData = async (params: {
  page: number;
  pageSize: number;
  status?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc' | '';
}) => {
  const { page, pageSize, status, search, sort, order } = params;
  const url = '/requests';
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

export const updateStatus = async (
  idArr: string[] | GridRowSelectionModel,
  status: string,
) => {
  const url = `/update-status`;
  try {
    const res = await axios.put(url, {
      status: status,
      ids: idArr,
    });
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};
