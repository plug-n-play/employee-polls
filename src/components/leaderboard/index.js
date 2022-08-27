import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Leaderboard() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    // call login api
    fetch("/api/leaderboard", {
      method: 'GET',
    }).then(res => res.json())
      .then((users) => {
        // sort users per answered & asked questions
        users = Object.values(users).sort((a, b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length));
        setUsers(users);
      });

  }, [])

  return (
    <>
      {users ?
        <TableContainer sx={{ m: '50px 0' }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell align="center">Answered</TableCell>
                <TableCell align="center">Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                Object.keys(users).map((user) => {
                  return (
                    <TableRow key={user}>
                      <TableCell component="th" scope="row">{users[user].name}</TableCell>
                      <TableCell align="center">{Object.keys(users[user].answers).length}</TableCell>
                      <TableCell align="center">{users[user].questions.length}</TableCell>
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
