import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import FormControl from '@mui/material/FormControl';
import { selectUser } from '@/features/user/userSlice';
import { add as addQuestionToState } from '@/features/questions/questionsSlice';
import { addQuestionToLeaderboard } from '@/features/leaderboard/leaderboardSlice';
import { useDispatch, useSelector } from 'react-redux';

function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export default function AddPoll() {
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const router = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.id) {
      router.replace("/login");
    }
  }, [])

  const handleChange = (option, ev) => {
    if (option === 'option1') {
      setOption1(ev.target.value)
    } else {
      setOption2(ev.target.value)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const question = {
      id: generateUID(),
      author: user.id,
      timestamp: Date.now(),
      optionOne: {
        votes: [],
        text: option1,
      },
      optionTwo: {
        votes: [],
        text: option2
      }
    }

    dispatch(addQuestionToState(question));
    dispatch(addQuestionToLeaderboard({
      questionId: question.id,
      userId: user.id,
    }));

    router.push('/');
  }

  return (
    <>
      <Container sx={{ m: 2.5 }}>
        <Box sx={{ w: 100 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            New Poll
          </Typography>
        </Box>
      </Container>
      <Header activeIndex={2} user={user} />
      <Container sx={{ m: '20px auto', textAlign: 'center' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography variant="h5" component="p" >
            Would You Rather
          </Typography>
          <Typography variant="p" component="p" sx={{ color: '#7e7b7b' }}>
            Create your own poll
          </Typography>
          <Box sx={{ mt: 3, mb: 3 }}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <TextField
                label="Option 1"
                sx={{ mt: 1, width: '100%' }}
                value={option1}
                onChange={(ev) => handleChange('option1', ev)}
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 4 }}>
              <TextField
                label="Option 2"
                sx={{ mt: 1, width: '100%' }}
                value={option2}
                onChange={(ev) => handleChange('option2', ev)}
                required
              />
            </FormControl>

            <Button type="submit" variant="outlined" sx={{ mt: 4 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
