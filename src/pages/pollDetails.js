import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import { selectUser, setSelectedAns } from '@/features/user/userSlice';
import { selectQuestions } from '@/features/questions/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from "@/app/hooks";

export default function PollDetails() {
  const [imgURL, setImgURL] = useState('');
  const dispatch = useDispatch();
  const [authorName, setAuthorName] = useState(null);
  const router = useRouter();
  const user = useSelector(selectUser);
  const questions = useAppSelector(selectQuestions);
  const { id, ans } = router.query
  const { author, optionOne, optionTwo } = questions[`${id}`];

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }

    fetch(`/api/userDetails?author=${author}`)
      .then(res => res.json())
      .then(({ name, avatarURL }) => {
        setImgURL(avatarURL);
        setAuthorName(name);
      });
  }, []);

  const onAnsSelection = (selectedAns) => {
    // when an API is available, we would save this information to API
    dispatch(setSelectedAns({
      key: id,
      value: selectedAns
    }))
    router.replace('/');
  }

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
        <Box>
          <Typography variant="h4" component="h1" >
            Poll by {authorName}
          </Typography>

          {
            ans && <Typography variant="h4" component="h1" >
              (Answered already)
            </Typography>
          }

          <Box sx={{ margin: '40px', display: 'inline-block' }}>
            <Image src={imgURL} width={300} height={300} />
          </Box>

          <Typography variant="h5" component="p" >
            Would You Rather
          </Typography>

          {
            ans ?
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" sx={{ ml: 5, mt: 5 }} disabled>
                  {optionOne.text} {ans === 'optionOne' && <>✅</>}
                </Button>
                <Button variant="outlined" sx={{ ml: 5, mt: 5 }} disabled>
                  {optionTwo.text} {ans === 'optionTwo' && <>✅</>}
                </Button>
              </Box>
              : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" sx={{ ml: 5, mt: 5 }} onClick={() => onAnsSelection('optionOne')}>
                  {optionOne.text}
                </Button>
                <Button variant="outlined" sx={{ ml: 5, mt: 5 }} onClick={() => onAnsSelection('optionTwo')}>
                  {optionTwo.text}
                </Button>
              </Box>
          }
        </Box>
      </Container>
    </>
  );
}
