import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

export const tableColumns: GridColDef[] = [
  {
    field: 'priority',
    headerName: 'PRIORITY',
    width: 300,
    align: 'center',
    headerAlign: 'center',
    filterable: false,
    headerClassName: 'columnHeader',
    renderCell: (params) => {
      const { priority } = params.row;
      return (
        <Chip
          label={priority}
          color={priority === 'High' ? 'error' : 'primary'}
        />
      );
    },
  },
  {
    field: 'caseName',
    headerName: 'CASE NAME',
    width: 300,
    align: 'center',
    headerAlign: 'center',
    filterable: false,
    headerClassName: 'columnHeader',
  },
  {
    field: 'assignee',
    headerName: 'ASSIGNEE',
    minWidth: 300,
    flex: 1,
    editable: false,
    filterable: true,
    headerClassName: 'columnHeader',
  },
  {
    field: 'description',
    headerName: 'DESCRIPTION',
    flex: 2,
    editable: false,
    filterable: false,
    minWidth: 300,
    headerClassName: 'columnHeader',
  },
  {
    field: 'status',
    headerName: 'STATUS',
    width: 300,
    align: 'center',
    headerAlign: 'center',
    filterable: false,
    headerClassName: 'columnHeader',
  },
  {
    field: 'type',
    headerName: 'TYPE',
    width: 300,
    align: 'center',
    headerAlign: 'center',
    filterable: false,
    headerClassName: 'columnHeader',
  },
  {
    field: 'dateCreated',
    headerName: 'DATE CREATED',
    width: 200,
    editable: false,
    align: 'left',
    headerAlign: 'left',
    filterable: false,
    headerClassName: 'columnHeader',
  },
  {
    field: 'lastUpdated',
    headerName: 'LAST UPDATED',
    width: 200,
    editable: false,
    align: 'left',
    headerAlign: 'left',
    filterable: false,
    headerClassName: 'columnHeader',
  },
];
