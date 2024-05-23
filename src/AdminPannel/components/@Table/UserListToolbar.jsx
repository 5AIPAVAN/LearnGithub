import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';


const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: '20px 20px 60px #F1F6F9,-20px -20px 60px #F1F6F9',
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));


UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName }) {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search doctor..."
          startAdornment={<SearchIcon />}
        />
      )}

      {numSelected > 0 &&
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      // ) : (
      //   <Tooltip title="Filter list">
      //     <IconButton>
      //       fil
      //     </IconButton>
      //   </Tooltip>
      }
    </StyledRoot>
  );
}