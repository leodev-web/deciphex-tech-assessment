/** 
 * @description BatchUpdateComponent
 * BatchUpdateComponent is a component that allows users to perform batch actions on selected cases.
 * It displays a button that, when clicked, opens a menu with two options: "Accept cases" and "Reject cases".
 * When a user selects an option, the selected cases are updated with the corresponding status and the component triggers a fetchCasesData function to update the cases data.
 */
import React from 'react';
import {
  ButtonGroup,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { updateStatus } from '../utils/api';
import { useCaseStore } from '../utils/store';

const batchOptions = ['Accept cases', 'Reject cases'];
const BatchUpdateComponent = ({
  fetchCasesData,
}: {
  fetchCasesData: () => void;
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [batchBtnOpen, setBatchBtnOpen] = React.useState(false);
  const { selectionModel, setSelectionModel } = useCaseStore((state) => state);

  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleMenuItemClick = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setBatchBtnOpen(false);
    setSelectedIndex(index);
    if (index === 0) {
      await updateStatus(selectionModel, 'Accepted');
    } else {
      await updateStatus(selectionModel, 'Rejected');
    }
    setSelectionModel([]);
    fetchCasesData();
  };

  const handleToggle = () => {
    setBatchBtnOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setBatchBtnOpen(false);
  };

  return (
    <ButtonGroup
      variant="contained"
      ref={anchorRef}
      aria-label="Button group with a nested menu"
    >
      <Button onClick={handleToggle} disabled={selectionModel.length === 0}>
        {'Batch Actions'}
        <ArrowDropDownIcon />
      </Button>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={batchBtnOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {batchOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ButtonGroup>
  );
};

export default BatchUpdateComponent;
