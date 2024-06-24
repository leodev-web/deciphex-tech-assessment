import React, { useEffect, useMemo, useState } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid';
import { tableColumns } from '../types/columns';
import TableToolBar from './TableToolBar';
import { fetchData, updateStatus } from '../utils/api';
import { caseData, CasesResponse } from '../types/types';
import { useLocation } from 'react-router-dom';
import { capitalizeFirstWord } from '../utils/util';
import { useCaseStore } from '../utils/store';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  StyledTypography,
  StyledActionColumn,
  StyledActionIconButton,
} from '../styles/styles';

type TableProps = {
  tabelType: string;
};

const rowHeight = 50;
const CaseTablePage = (props: TableProps) => {
  const { tabelType } = props;
  const cases = useCaseStore((state) => state.cases as CasesResponse | null);
  const paginationModal = useCaseStore((state) => state.paginationModal);
  const setCases = useCaseStore((state) => state.setCases);
  const setPaginationModal = useCaseStore((state) => state.setPaginationModal);
  const searchTerm = useCaseStore((state) => state.searchTerm);
  const { sortModal, setSortModal } = useCaseStore((state) => state);
  const { columnVisibilityModal } = useCaseStore((state) => state);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const { selectionModel, setSelectionModel } = useCaseStore((state) => state);

  const location = useLocation();

  useEffect(() => {
    setPaginationModal({ page: 0, pageSize: 10 });
  }, [location]);


  const status = useMemo(() => {
    return capitalizeFirstWord(location.pathname.replace('/', ''));
  }, [location]);

  useEffect(() => {
    fetchCasesData();
  }, [paginationModal, searchTerm, sortModal]);


  const fetchCasesData = async () => {
    try {
      const { page, pageSize } = paginationModal;
      const res = await fetchData({
        page: page + 1,
        pageSize: pageSize,
        ...(status && { status }),
        ...(searchTerm && { search: searchTerm }),
        ...(sortModal.sort &&
          sortModal.order && { sort: sortModal.sort, order: sortModal.order }),
      });
      setCases(res);
    } catch (error) {
      console.log('error', error);
    }
  };

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
      headerClassName: 'columnHeader',
      renderCell: (params) => (
        <StyledActionColumn>
          <StyledActionIconButton
            size="small"
            aria-label="actions"
            aria-haspopup="true"
            onClick={(event) => handleActionMenuClick(event, params.row)}
          >
            <MoreHorizIcon />
          </StyledActionIconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedMenu === params.row.caseName}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => handleMenuClick('Accepted', params.row.caseName)}
            >
              Accept case
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuClick('Rejected', params.row.caseName)}
            >
              Reject Case
            </MenuItem>
          </Menu>
        </StyledActionColumn>
      ),
    },
  ];

  const handleSortModelChange = (model: GridSortModel): void => {
    setSortModal({
      sort: model?.[0]?.field || '',
      order: model?.[0]?.sort || '',
    });
  };

  const handleActionMenuClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: caseData,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenu(row.caseName);
  };

  const handleMenuClick = (action: string, id: string) => {
    updateStatus([id], action).then((res) => {
      if (res) {
        fetchCasesData();
      }
    });
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '95%', mt: 1 }}>
      <StyledTypography>{tabelType}</StyledTypography>
      <TableToolBar fetchCasesData={fetchCasesData} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <DataGrid
          columns={columns}
          rows={cases?.data || []}
          getRowId={(row: caseData) => row.caseName}
          rowCount={cases?.total || 0}
          // loading={data.rows.length === 0}
          checkboxSelection
          onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
            setSelectionModel(newSelection);
          }}
          rowSelectionModel={selectionModel}
          disableRowSelectionOnClick
          autoHeight
          paginationModel={paginationModal}
          pageSizeOptions={[10, 20, 50, 100]}
          onPaginationModelChange={(model) => setPaginationModal(model)}
          paginationMode="server"
          rowHeight={rowHeight}
          sx={{ width: '80vw', overflow: 'auto', minWidth: '95%' }}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          columnVisibilityModel={columnVisibilityModal}
          getRowClassName={() => `tableRow`}
        />
      </Box>
    </Box>
  );
};

export default CaseTablePage;
