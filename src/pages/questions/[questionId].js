import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import { addAnswer as addAnswerToLeaderBoard } from '@/features/leaderboard/leaderboardSlice';
import { selectUser, setSelectedAns } from '@/features/user/userSlice';
import { selectQuestions, addAns as addSelectedAnsToQuestion } from '@/features/questions/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from "@/app/hooks";

export default function Question({ questionId }) {
  const [userOnePercentage, setUserOnePercentage] = useState(1);
  const [userTwoPercentage, setUserTwoPercentage] = useState(1);
  const [imgURL, setImgURL] = useState('');
  const dispatch = useDispatch();
  const [authorName, setAuthorName] = useState(null);
  const router = useRouter();
  const user = useSelector(selectUser);
  const questions = useAppSelector(selectQuestions);
  const { optionOne, optionTwo } = questions[questionId];
  let ans = '';

  if (optionOne.votes.indexOf(user?.id) > -1) {
    ans = 'optionOne';
  } else if (optionTwo.votes.indexOf(user?.id) > -1) {
    ans = 'optionTwo';
  }

  useEffect(() => {
    if (!user.id) {
      router.replace(`/login?initiator=questions/${questionId}`);
    }

    fetch(`/api/userDetails?author=${questions[questionId]?.author}`)
      .then(res => res.json())
      .then(({ name, avatarURL }) => {
        setImgURL(avatarURL);
        setAuthorName(name);
      });

    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOnePer = optionOne?.votes?.length && (optionOne?.votes?.length * 100 / totalVotes).toFixed(2);
    const optionTwoPer = optionTwo?.votes?.length && (optionTwo?.votes?.length * 100 / totalVotes).toFixed(2);
    setUserOnePercentage(optionOnePer);
    setUserTwoPercentage(optionTwoPer);
  }, [optionOne, optionTwo]);

  const onAnsSelection = (selectedAns) => {
    // when an API is available, we would save this information to API
    dispatch(setSelectedAns({
      key: questionId,
      value: selectedAns
    }))
    const payload = {
      questionId,
      userId: user.id,
      selectedAns
    };
    dispatch(addAnswerToLeaderBoard(payload));
    dispatch(addSelectedAnsToQuestion(payload));
    // router.replace('/');
  }

  const UserOneAnsweredMsg = () => <Box sx={{ ml: 1 }}>({optionOne?.votes?.length} users chose this option, i.e. {userOnePercentage}% users)</Box>;
  const UserTwoAnsweredMsg = () => <Box sx={{ ml: 1 }}>({optionTwo?.votes?.length} users chose this option, i.e. {userTwoPercentage}% users)</Box>;

  return (
    <>
      <Container sx={{ m: 2.5 }}>
        <Box sx={{ w: 100 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Poll Details
          </Typography>
        </Box>
      </Container>
      <Header user={user} />
      <Container sx={{ m: '20px auto', textAlign: 'center' }}>
        {
          user?.id &&
          (<Box>
            <Typography variant="h4" component="h1" >
              Poll by {authorName}
            </Typography>

            {imgURL && <Box sx={{ margin: '40px', display: 'inline-block' }}>
              <Image src={imgURL} width={300} height={300} />
            </Box>}

            <Typography variant="h5" component="p" >
              Would You Rather
            </Typography>

            {
              ans ?
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Button variant="outlined" sx={{ ml: 5, mt: 5 }} disabled>
                    <Box>
                      {ans === 'optionOne' && <>✅</>} {optionOne?.text}
                    </Box>
                    <UserOneAnsweredMsg />
                  </Button>
                  <Button variant="outlined" sx={{ ml: 5, mt: 5 }} disabled>
                    <Box>
                      {ans === 'optionTwo' && <>✅</>} {optionTwo?.text}
                    </Box>
                    <UserTwoAnsweredMsg />
                  </Button>
                </Box>
                : <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Button variant="outlined" sx={{ ml: 5, mt: 5 }} onClick={() => onAnsSelection('optionOne')}>
                    {optionOne?.text}
                  </Button>
                  <Button variant="outlined" sx={{ ml: 5, mt: 5 }} onClick={() => onAnsSelection('optionTwo')}>
                    {optionTwo?.text}
                  </Button>
                </Box>
            }
          </Box>)
        }
      </Container>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { questionId } = query;
  return { props: { questionId } }
}
