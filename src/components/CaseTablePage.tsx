import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { tableColumns } from '../types/columns';
import TableToolBar from './TableToolBar';
import { fetchData } from '../utils/api';
import { caseData, CasesResponse } from '../types/types';
import { useLocation } from 'react-router-dom';
import { capitalizeFirstWord } from '../utils/util';
import { useCaseStore } from '../utils/store';

type TableProps = {
  tabelType: string;
};

const initialColumnVisibilityModel = {
  status: false,
  type: false,
  lastUpdated: false,
};

const rowHeight = 50;
const CaseTablePage = (props: TableProps) => {
  const { tabelType } = props;
  // const [cases, setCases] = useState<CasesResponse | null>(null);
  // const cases = useStore((state: CasesState) => state.cases as CasesResponse | null);
  const cases = useCaseStore((state) => state.cases as CasesResponse | null);
  const paginationModal = useCaseStore((state) => state.paginationModal);
  const setCases = useCaseStore((state) => state.setCases);
  const setPaginationModal = useCaseStore((state) => state.setPaginationModal);
  const searchTerm = useCaseStore((state) => state.searchTerm);

  // const [paginationModal, setPaginationModal] = useState({
  //   page: 0,
  //   pageSize: 10,
  // });
  const location = useLocation();
  const [status, setStatus] = useState(
    capitalizeFirstWord(location.pathname.replace('/', '')),
  );

  useEffect(() => {
    console.log(location.pathname.replace('/', ''));
    setStatus(capitalizeFirstWord(location.pathname.replace('/', '')));
    setPaginationModal({ page: 0, pageSize: 10 });
  }, [location]);

  useEffect(() => {
    const { page, pageSize } = paginationModal;
    console.log('page:', page, 'pageSize:', pageSize, 'status:', status);
    fetchData({
      page: page + 1,
      pageSize,
      ...(status && { status }),
      ...(searchTerm && { search: searchTerm })
    }).then((res: CasesResponse) => {
      setCases(res);
    });
  }, [paginationModal, status, searchTerm]);

  const columns: GridColDef[] = [
    ...tableColumns,
    {
      field: 'actions',
      headerName: 'ACTIONS',
      width: 200,
      sortable: false,
      filterable: false,
      disableExport: true,
      align: 'center',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}></div>
      ),
    },
  ];

  console.log('paginationModal', paginationModal, 'cases', cases);

  return (
    <Box sx={{ width: '95%', mt: 1 }}>
      <h5>{tabelType}</h5>
      <TableToolBar />
      <DataGrid
        columns={columns}
        rows={cases?.data || []}
        getRowId={(row: caseData) => row.caseName}
        rowCount={cases?.total || 0}
        // loading={data.rows.length === 0}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        paginationModel={paginationModal}
        onPaginationModelChange={(model) => setPaginationModal(model)}
        paginationMode="server"
        rowHeight={rowHeight}
        sx={{ width: '85%', overflow: 'auto' }}
        // columnVisibilityModel={initialColumnVisibilityModel}
      />
    </Box>
  );
};

export default CaseTablePage;
