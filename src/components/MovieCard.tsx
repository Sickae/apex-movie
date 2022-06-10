import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Icon,
  Typography
} from "@mui/material";
import {Star} from "@mui/icons-material";
import {useState} from "react";
import {IWikiMovieDetails, WikipediaClient} from "../external/wikipediaClient";

export const MovieCard = (props: IMovieCardProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [details, setDetails] = useState<IWikiMovieDetails>();
  const [detailsError, setDetailsError] = useState<string>();

  const handleDetailsToggle = () => {
    const newState = !isDetailsOpen;
    setIsDetailsOpen(newState);

    if (newState && !details) {
      WikipediaClient.getExactMovieDetails(props.name, (error: any) => {
        console.error(error);
        setDetailsError('Cannot fetch movie details. Please try again later.');
      }).then(x => setDetails(x));
    }
  }

  return (
    <Card sx={{width: '100%'}}>
      <CardActionArea onClick={handleDetailsToggle}>
        <CardContent>

          <Box display='flex'>

            <Typography gutterBottom variant='h5'>
              {props.name}
            </Typography>

            <Box display='flex' marginLeft='auto' gap='.5rem' alignItems='center' justifyContent='center'>

              <Icon sx={{fontSize: '1.7rem'}}>
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
        <>
          <Divider />

          {!details && !detailsError &&
            <CardContent>
              <Box display='flex' justifyContent='center'>
                <CircularProgress />
              </Box>
            </CardContent>
          }

          {detailsError &&
            <Alert color='error'>
              {detailsError}
            </Alert>
          }
          
          {details && !detailsError &&
            <>
              <CardContent>
                <span dangerouslySetInnerHTML={{__html: details.htmlSnippet}} />
              </CardContent>
              {details.wikiPageLink &&
                <CardActions>
                  <Button component='a' href={details.wikiPageLink} target='_blank'>Read more</Button>
                </CardActions>
              }
            </>
          }
        </>
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
