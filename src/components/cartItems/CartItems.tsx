'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Alert from '@mui/material/Alert';
import ShareIcon from '@mui/icons-material/Share';
import SideBar from '../sideBar/SideBar';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import './style.css';
import { RingLoader } from 'react-spinners';

// cont api = 'https://api.rawg.io/api/games?key=b07b64e7024442b9ba790a84e288e357&dates=2011-09-01,2019-09-30&platforms=18,1,7'

const CartItems = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () =>
      await fetch(
        'https://api.rawg.io/api/games?key=b07b64e7024442b9ba790a84e288e357&dates=2011-09-01,2019-09-30&platforms=18,1,7'
      ).then((res) => res.json()),
    staleTime: 0,
  });

  if (isLoading)
    return (
      <RingLoader
        color="#DAFFFB"
        size={500}
        cssOverride={{
          position: 'absolute',
          left: '45%',
          top: '45%',
          transform: 'translate(-50%,-50%)',
        }}
      />
    );

  if (error)
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{
          mt: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        you have an error and can not fetching data please check your network
        and refresh again🚫⛔
      </Alert>
    );

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          mt: '60px',
          mb: '60px',
        }}
      >
        {data.results.map((game: any) => (
          <Card key={game.id} sx={{ maxWidth: 345, m: '30px 20px' }}>
            <CardMedia
              component="img"
              height="194"
              image={game.background_image}
              alt={game.background_image}
            />
            <CardContent>
              {game.platforms
                .filter((i: any) => i.platform.slug !== 'ps-vita')
                .map((item: any) => {
                  const namePhoto = Array.from(item.platform.name)
                    .join('')
                    .split(' ')[0];
                  console.log(namePhoto);

                  return (
                    <Image
                      key={item.id}
                      style={{
                        padding: '0 2px',
                        textAlign: 'center',
                        alignItems: 'center',
                        margin: '10px 0 0 0 ',
                      }}
                      src={
                        `/platform/${namePhoto.toLowerCase()}.png` ??
                        `/platform/${namePhoto.toLowerCase()}.svg`
                      }
                      alt=""
                      width={20}
                      height={20}
                    />
                  );
                })}
              <Box
                component="span"
                sx={{
                  color: `${
                    game.metacritic > 90
                      ? `green`
                      : game.metacritic > 80
                      ? 'orange'
                      : 'red'
                  }`,
                  border: `0.1px solid ${
                    game.metacritic > 90
                      ? `green`
                      : game.metacritic
                      ? 'orange'
                      : 'red'
                  } `,
                  position: `relative`,
                  borderRadius: '3px',
                  padding: '3px',
                  float: `right`,
                  fontSize: `24px`,
                }}
              >
                {game.metacritic}
              </Box>
              <Typography variant="h6" color="text.secondary" my={2}>
                {game.name}
              </Typography>
              <Divider sx={{ my: '20px' }} />
              <Typography variant="body1" color="black" fontWeight={600}>
                Released:
                <Typography component="span"> {game.released}</Typography>
              </Typography>
              <Divider sx={{ my: '20px' }} />
              <Typography>
                Genres :
                {game.genres.map((genre: any) => (
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{
                      padding: '5px',
                      textDecoration: 'underline',
                    }}
                    color="black"
                    fontWeight={600}
                  >
                    {genre.name}
                  </Typography>
                ))}
              </Typography>

              <Divider sx={{ my: '20px' }} />
              <IconButton
                className="element"
                aria-label="rating"
                sx={{
                  borderRadius: '8px',
                  background: `#979ba1`,
                }}
              >
                {game.ratings_count} +
              </IconButton>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CartItems;
