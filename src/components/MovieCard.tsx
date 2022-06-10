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
  
            <Box marginLeft='auto' display='flex' gap='.5rem' alignItems='center'>
              <Icon>
                <Star color='warning' />
              </Icon>
              
              <Typography variant='body1' color='text.warning'>
                {props.score}
              </Typography>  
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
  genres: [
    {
      name: string
    }
  ]
}