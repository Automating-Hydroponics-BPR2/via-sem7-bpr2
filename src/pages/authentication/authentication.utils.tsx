import { Typography, Link } from '@mui/material';

export const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client">
        BPR2 Hydronopics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
