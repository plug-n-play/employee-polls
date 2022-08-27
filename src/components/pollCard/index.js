/*
  e.g. props:
  {
    id: 1,
    author: 'singh',
    // TODO:
    timeCreated: '4:11 PM',
    dateCreated: '6th Aug, 2022',
  }
*/
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

export default function PollCard({ id, author, ans }) {
  return (
    <Box component="span" sx={{ width: 275, display: 'inline-block', m: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {author}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={ans ? `/pollDetails?id=${id}&ans=${ans}` : `/pollDetails?id=${id}`}>
            <a>Show</a>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}

// TODO:
// const PollCard = ({ question, author }) => {
//   return (
//     <Link href={'questions/' + question.id}>
//       <div className="m-3 p-2 rounded-xl shadow-md hover:shadow-xl transition bg-zinc-300 max-w-sm mx-auto flex items-center space-x-4">
//         <div className="shrink-0">
//           <img className="h-12 w-12" src={author?.avatarURL} alt="Author" />
//         </div>
//         <div>
//           <div className="text-xl font-medium text-black">{question.author}</div>
//           <p className="text-xs italic">{new Date(question.timestamp).toDateString()}</p>
//           <p className="underline underline-offset-4">Show</p>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default PollCard;
