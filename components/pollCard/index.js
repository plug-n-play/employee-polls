import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

export default function PollCard({ id, author, time }) {
  const date = new Date(time);
  return (
    <Box component="span" sx={{ width: 275, display: 'inline-block', m: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {author}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {date.toLocaleString('en-GB')}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={`/questions/${id}`}>
            <a>Show</a>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
