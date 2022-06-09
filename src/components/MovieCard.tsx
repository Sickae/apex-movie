import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

export const MovieCard = (props: IMovieCardProps) => {
  console.log('movieCard props', props);
  
  return (
    <Card sx={{width: '100%'}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h5'>
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export interface IMovieCardProps {
  id: number;
  name: string;
  releaseDate: Date;
}