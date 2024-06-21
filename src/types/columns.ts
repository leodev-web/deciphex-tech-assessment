import { GridColDef } from '@mui/x-data-grid';

export const tableColumns: GridColDef[] = [
  {
    field: 'caseName',
    headerName: 'Case Name',
    width: 300,
    align: 'center',
    headerAlign: 'center',
    filterable: false,
  },
  {
    field: 'assignee',
    headerName: 'Assignee',
    width: 300,
    editable: false,
    sortable: false,
    filterable: true,
  },
  {
    field: 'description',
    headerName: 'description',
    flex: 1,
    editable: false,
    sortable: false,
    filterable: false,
  },
  {
    field: 'dateCreated',
    headerName: 'Date created',
    width: 200,
    editable: false,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    filterable: false,
  },
];
