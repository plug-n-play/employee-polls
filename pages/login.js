import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { createTheme } from '@mui/material/styles';
import Header from '@/components/Header';
import { selectUser, setUser } from '@/features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';

// const theme = createTheme();

export default function SignIn() {
  const inputRef = useRef();
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { initiator } = router?.query || { initiator: '' };
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.id) {
      router.replace("/");
    }
    inputRef.current.focus()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // call login api
    window.fetch && window.fetch("/api/auth", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password'),
      })
    }).then(res => res.json())
      .then(({ user, error }) => {
        if (user) {
          // set user to store
          dispatch(setUser(user));
          router.push(initiator ? initiator : '/');
        } else {
          setLoginError(error)
        }
      });
  }

  return (
    <>
      <Container sx={{ m: 2.5 }}>
        <Box sx={{ w: 100 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
        </Box>
      </Container>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              data-testid="username"
              inputRef={inputRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              data-testid="password"
              id="password"
              autoComplete="current-password"
            />
            {loginError && <div className='error'>{loginError}</div>}
            <Button
              type="submit"
              data-testid="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <style jsx>{`
        .error {
          color: #ff0000;
        }
      `}</style>
    </>
  );
}