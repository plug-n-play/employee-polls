import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppSelector } from "@/app/hooks";
import { selectQuestions } from '@/features/questions/questionsSlice';
import PollCard from '@/components/pollCard';

export default function Dashboard({ user }) {
  const answeredQs = Object.keys(user.answers)

  let questions = useAppSelector(selectQuestions);
  let unansweredQs = [];

  questions && Object.keys(questions).map(key => {
    if (answeredQs.indexOf(key) === -1) unansweredQs.push(questions[key])
  });

  return (
    <>
      <Container sx={{ m: 2.5 }}>
        <Box sx={{ w: 100 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
        </Box>
      </Container>

      <Container sx={{ m: 2.5 }}>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Answered Questions
          </Typography>
          {answeredQs.length ? (answeredQs
            .map((k) => (
              <PollCard key={k} id={k} author={questions[k].author} ans={user.answers[`${k}`]} />
            )))
            : <Typography variant="p" component="p" gutterBottom>
              None
            </Typography>}

        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            New Questions
          </Typography>
          {unansweredQs.length ? (unansweredQs
            .map((k) => (
              <PollCard key={k.id} id={k.id} author={questions[k.id].author} />
            )))
            : <Typography variant="p" component="p" gutterBottom>
              None
            </Typography>}
        </Box>
      </Container>
    </>
  );
}
