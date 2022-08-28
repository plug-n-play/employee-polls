import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppSelector } from "@/app/hooks";
import { selectQuestions } from '@/features/questions/questionsSlice';
import PollCard from '@/components/pollCard';

export default function Dashboard({ user }) {
  const ansKeys = Object.keys(user.answers);
  const questions = useAppSelector(selectQuestions);
  let answeredQs = [];
  ansKeys.map(k => answeredQs.push(questions[k]));

  let unansweredQs = [];
  questions && Object.keys(questions).map(key => {
    if (ansKeys.indexOf(key) === -1) unansweredQs.push(questions[key])
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
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            New Questions
          </Typography>
          {unansweredQs.length ? (unansweredQs.sort(function (a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          }).map(({ id }) => (
            <PollCard key={id} id={id} author={questions[id].author} time={questions[id].timestamp} />
          )))
            : <Typography variant="p" component="p" gutterBottom>
              None
            </Typography>}
        </Box>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Answered Questions
          </Typography>
          {answeredQs.length ? (answeredQs.sort(function (a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          }).map(({ id }) => (
            <PollCard key={id} id={id} author={questions[id].author} time={questions[id].timestamp} ans={user.answers[`${id}`]} />
          )))
            : <Typography variant="p" component="p" gutterBottom>
              None
            </Typography>}

        </Box>
      </Container>
    </>
  );
}
