import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import AccountPopover from './AccountPopover';
import MenuIcon from '@mui/icons-material/Menu';

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 60;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));


Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot sx={{backgroundColor:'#FFFF'}}>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <MenuIcon/>
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
