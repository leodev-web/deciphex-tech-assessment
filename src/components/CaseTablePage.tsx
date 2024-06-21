import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { tableColumns } from '../types/columns';
import TableToolBar from './TableToolBar';
import { fetchData } from '../utils/api';
import { caseData, CasesResponse } from '../types/types';
import { useLocation } from 'react-router-dom';
import { capitalizeFirstWord } from '../utils/util';

type TableProps = {
  tabelType: string;
};
const CaseTablePage = (props: TableProps) => {
  const { tabelType } = props;
  const [cases, setCases] = useState<CasesResponse | null>(null);

  const [paginationModal, setPaginationModal] = useState({
    page: 0,
    pageSize: 10,
  });
  const location = useLocation();
  const [status, setStatus] = useState(
    capitalizeFirstWord(location.pathname.replace('/', '')),
  );

  useEffect(() => {
    console.log(location.pathname.replace('/', ''));
    setStatus(capitalizeFirstWord(location.pathname.replace('/', '')));
  }, [location]);

  useEffect(() => {
    const { page, pageSize } = paginationModal;
    console.log('page:', page, 'pageSize:', pageSize, 'status:', status);
    fetchData({
      page: page + 1,
      pageSize,
      ...(status && { status }),
    }).then((res: CasesResponse) => {
      setCases(res);
    });
  }, [paginationModal, status]);

  const columns: GridColDef[] = [
    ...tableColumns,
    {
      field: 'actions',
      headerName: 'Action',
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
        rowHeight={38}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        paginationModel={paginationModal}
        onPaginationModelChange={(model) => setPaginationModal(model)}
        paginationMode="server"
      />
    </Box>
  );
};

export default CaseTablePage;
