import {Box, Icon, Typography} from "@mui/material";
import {SentimentSatisfiedSharp} from "@mui/icons-material";

export const LandingPage = () => {
  return (
    <Box display='flex' flexDirection='column' gap='1rem' alignItems='center' justifyContent='center'>
      <Typography variant='h5'>Why don't you search for a movie?</Typography>
      <Icon fontSize='large'>
        <SentimentSatisfiedSharp fontSize='inherit' />
      </Icon>
    </Box>
  )
}