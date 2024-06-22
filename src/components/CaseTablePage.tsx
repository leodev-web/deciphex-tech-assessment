import React, { useEffect, useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { tableColumns } from '../types/columns';
import TableToolBar from './TableToolBar';
import { fetchData, updateStatus } from '../utils/api';
import { caseData, CasesResponse } from '../types/types';
import { useLocation } from 'react-router-dom';
import { capitalizeFirstWord } from '../utils/util';
import { useCaseStore } from '../utils/store';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type TableProps = {
  tabelType: string;
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
  const { sortModal, setSortModal } = useCaseStore((state) => state);
  const {columnVisibilityModal} = useCaseStore((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const [seleectdMenu, setSelectedMenu] = useState<string>('');

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
   fetchCasesData();
  }, [paginationModal, status, searchTerm, sortModal]);

  const fetchCasesData = async () => {
    try {
      const { page, pageSize } = paginationModal;
      const res= await fetchData({
        page: page + 1,
        pageSize: pageSize,
        ...(status && { status }),
        ...(searchTerm && { search: searchTerm }),
        ...(sortModal.sort &&
          sortModal.order && { sort: sortModal.sort, order: sortModal.order }),
      })
      setCases(res);
    } catch (error) {
      console.log('error', error);
    }
   
  }

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <>
          <IconButton size="small" style={{ marginLeft: 8 }} aria-label='actions' aria-haspopup='true' onClick={(event) => handleActionMenuClick(event, params.row)}>
             <MoreHorizIcon />
           </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && seleectdMenu === params.row.caseName}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuClick('Accepted', params.row.caseName)}>Accept case</MenuItem>
            <MenuItem onClick={() => handleMenuClick('Rejected',  params.row.caseName)}>Reject Case</MenuItem>
          </Menu>
          </>
          
        </div>
      ),
    },
  ];

  const handleSortModelChange = (model: GridSortModel): void => {
    setSortModal({
      sort: model?.[0]?.field || '',
      order: model?.[0]?.sort || '',
    });
  };

  const handleActionMenuClick = (event: any, row: caseData) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenu(row.caseName);
  };

  const handleMenuClick = (action: string, id: string) => {
    updateStatus([id], action).then((res) => {
      if (res) {
        fetchCasesData();
      }
    })
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '95%', mt: 1,  }}>
      <h5>{tabelType}</h5>
      <TableToolBar />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
        pageSizeOptions={[10, 20, 50, 100]}
        onPaginationModelChange={(model) => setPaginationModal(model)}
        paginationMode="server"
        rowHeight={rowHeight}
        sx={{ width: '80vw', overflow: 'auto', minWidth: '95%'
      }}
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        columnVisibilityModel={columnVisibilityModal}
      />
      </Box>
     
    </Box>
  );
};

export default CaseTablePage;
