import { useEffect } from "react";
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import Leaderboard from "@/components/leaderboard";
import { selectUser } from '@/features/user/userSlice';
import { useSelector } from 'react-redux';

export default function Index() {
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user?.id) {
      router.replace("/login?initiator=leaderboard");
    }
  }, [])

  return (
    <>
      {
        user?.id ?
          (<><Container sx={{ m: 2.5 }}>
            <Box sx={{ w: 100 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Leaderboard
              </Typography>
            </Box>
          </Container>
            <Header activeIndex={1} user={user} />
            <Leaderboard /></>)
          : <div>Loading...</div>
      }
    </>
  );
}
