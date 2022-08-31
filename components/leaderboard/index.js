import { useState, useEffect } from 'react';
import { useAppSelector } from "@/app/hooks";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { selectLeaderboard } from '@/features/leaderboard/leaderboardSlice';
import Avatar from '@mui/material/Avatar';

export default function Leaderboard() {
  const [leaderboardUsers, setLeaderboardUsers] = useState(null);
  const _users = useAppSelector(selectLeaderboard);

  useEffect(() => {
    const _leaderboardUsers = Object.values(_users).sort((a, b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length));
    setLeaderboardUsers(_leaderboardUsers);
  }, []);

  return (
    <>
      {leaderboardUsers ?
        <TableContainer sx={{ m: '50px 0' }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Users</TableCell>
                <TableCell align="center">Answered</TableCell>
                <TableCell align="center">Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                Object.keys(leaderboardUsers).map((user) => {
                  return (
                    <TableRow key={user}>
                      <TableCell component="th" scope="row"><Avatar alt={user?.name || 'user image'} src={leaderboardUsers[user].avatarURL} /></TableCell>
                      <TableCell component="th" scope="row">{leaderboardUsers[user].name}</TableCell>
                      <TableCell align="center">{Object.keys(leaderboardUsers[user].answers).length}</TableCell>
                      <TableCell align="center">{leaderboardUsers[user].questions.length}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        : <div>loading...</div>
      }
    </>
  );
}
