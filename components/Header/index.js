import * as React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/userSlice'

const pages = [
  {
    title: 'Home',
    pathname: '',
  },
  {
    title: 'Leaderboard',
    pathname: 'leaderboard',
  },
  {
    title: 'New',
    pathname: 'add',
  }
];

const settings = [
  {
    title: 'Logout',
    pathname: 'login',
  }
];

const ResponsiveAppBar = ({ activeIndex, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    document.cookie = "swr-auth-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    dispatch(setUser(null));
    router.push('/login');
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            > */}
            {/* {pages.map(({ title, pathname, isActive }) => (
                <MenuItem key={title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link href={pathname.toLowerCase()}>
                      <a className={isActive ? 'active' : ''}>{title}`</a>
                    </Link>
                  </Typography>
                </MenuItem>
              ))} */}
            {/* </Menu> */}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ title, pathname, isActive }, index) => (
              (
                <Button
                  key={title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link href={`/${pathname}`}>
                    <a className={`headerLink ${index === activeIndex ? 'active' : ''}`}>{title}</a>
                  </Link>
                </Button>
              )
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user && (<><Box component="span" sx={{ fontWeight: 600, mr: 2, display: { xs: 'none', md: 'inline-block' } }}>
              {user?.name}
            </Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.name || 'user image'} src={user?.avatarURL} />
                </IconButton>
              </Tooltip>
              <Box component="span" sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                <span className='headerLink logout' onClick={onLogout}>Logout</span>
              </Box></>)}

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ title, pathname }) => (
                <MenuItem key={title} onClick={handleCloseUserMenu}>
                  <Link href={`/${pathname}`}>
                    <a>{title}</a>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <style jsx>{`
        .headerLink {
            color: #fff;
            text-decoration: none;
        }
        .headerLink.active, .headerLink:hover {
          text-decoration: underline;
        }
        .logout {
          margin-left: 16px;
        }
      `}</style>
    </AppBar >
  );
};
export default ResponsiveAppBar;
