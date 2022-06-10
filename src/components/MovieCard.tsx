import {Box, Card, CardActionArea, CardContent, Fade, Icon, Typography} from "@mui/material";
import {Star} from "@mui/icons-material";
import {useState} from "react";

export const MovieCard = (props: IMovieCardProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  return (
    <Card sx={{width: '100%'}}>
      <CardActionArea onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
        <CardContent>
          
          <Box display='flex'>
              
            <Typography gutterBottom variant='h5'>
              {props.name}
            </Typography>
            
            <Box display='flex' marginLeft='auto' gap='.5rem' alignItems='center' justifyContent='center'>
              
              <Icon sx={{fontSize: '1.7rem'}} >
                <Star color='warning' fontSize='inherit' />
              </Icon>
              
              <Box display='flex' flexDirection='column'>
                
                <Box display='flex' gap='.5rem'>
                  <Typography variant='body1'>
                    {props.score}
                  </Typography>
                  
                  <Typography variant='caption' color='gray'>
                    / 10
                  </Typography>
                </Box>

                <Typography variant='body2' color='gray'>
                  {props.votes > 1000 ? `${(props.votes / 1000).toFixed(2)}K` : props.votes}
                </Typography>
                
              </Box>
            </Box>
          </Box>
          
          <Typography variant='body2' color='text.secondary'>
            {props.genres.map(x => x.name).join(', ')}
          </Typography>
          
        </CardContent>
      </CardActionArea>

      {isDetailsOpen &&
        <Fade in={isDetailsOpen}>
          <CardContent>
            ...details...
          </CardContent>
        </Fade>
      }
    </Card>
  )
}

export interface IMovieCardProps {
  id: number;
  name: string;
  score: number;
  votes: number;
  genres: [
    {
      name: string
    }
  ];
}