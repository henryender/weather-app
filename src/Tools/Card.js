import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Clouds from '../Assets/Clouds.jpg'
import Clear from '../Assets/Clear.jpg'
import Rain from '../Assets/Rain.jpg'
import Snow from '../Assets/Snow.jpg'
import Thunderstorm from '../Assets/Thunderstorm.jpg'
import Drizzle from '../Assets/Drizzle.jpg'
import Mist from '../Assets/Mist.jpg'
import Fog from '../Assets/Fog.jpg'
import Smoke from '../Assets/Smoke.jpg'
import Haze from '../Assets/Haze.jpg'
import Dust from '../Assets/Dust.jpg'
import Sand from '../Assets/Sand.jpg'
import Tornado from '../Assets/Tornado.jpg'
import Ash from '../Assets/Ash.jpg'
import Forecast from '../Assets/Forecast.jpg'
import Squall from '../Assets/Squall.jpg'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Grid, Paper } from '@mui/material';



export default function RecipeReviewCard({ inputValue, Info, Setdrop, SetError, details }) {

  const [timer, setTimer] = React.useState()

  function HandleErr() {
    if (!inputValue) { SetError(true) }
    else { Setdrop(true) }
  }

  const today = new Date();
  const month =
    ["January", 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December']
  const Present = month[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear() + '; '
    + today.getHours({ hour12: true }) + ':' + today.getMinutes() + ':' + today.getSeconds()

  React.useEffect(() => {

    setInterval(() => {
      setTimer(today)
    }, 1000);

  }, [today])



  return (
    <>
      <Box width={{ lg: '80%', md: '80%', sm: '100%', xs: '100%' }} margin="auto" mt={5}>
        <Paper elevation={4} width='100%'>

          <Card sx={{ backgroundColor: 'beige', }}>

            <Box
              sx={{
                display: "flex",
                backgroundColor: '#676464',
                color: 'white', borderRadius: '6px', justifyContent: 'space-between',
                alignItems: "center", padding: "10px"
              }}>
              <CardHeader title={<Typography variant='h6'
                sx={{ fontFamily: 'Playfair, serif', fontSize: { xs: "20px", md: '30px' } }}>
                {`${inputValue !== '' ? `${inputValue}` : 'Search and Select a city'}`}
              </Typography>} />
              <Typography sx={{ fontSize: { xs: "25px", md: '30px' }, fontFamily: 'Playfair, serif' }}>
                {Info.weather}</Typography>
            </Box>
            <Typography
              sx={{ marginLeft: '16px', marginBottom: '5px', }}
              variant='body2'>{Present}</Typography>


            <CardMedia
              component="img"
              height="300"
              image={Info.weather?.toLowerCase().includes('clouds') ? (`${Clouds}`)
                : Info.weather?.toLowerCase().includes("clear") ? (`${Clear}`)
                  : Info.weather?.toLowerCase().includes('snow') ? (`${Snow}`)
                    : Info.weather?.toLowerCase().includes('rain') ? (`${Rain}`)
                      : Info.weather?.toLowerCase().includes('thunderstorm') ? (`${Thunderstorm}`)
                        : Info.weather?.toLowerCase().includes('drizzle') ? (`${Drizzle}`)
                          : Info.weather?.toLowerCase().includes('mist') ? (`${Mist}`)
                            : Info.weather?.toLowerCase().includes('fog') ? (`${Fog}`)
                              : Info.weather?.toLowerCase().includes('smoke') ? (`${Smoke}`)
                                : Info.weather?.toLowerCase().includes('haze') ? (`${Haze}`)
                                  : Info.weather?.toLowerCase().includes('dust') ? (`${Dust}`)
                                    : Info.weather?.toLowerCase().includes('sand') ? (`${Sand}`)
                                      : Info.weather?.toLowerCase().includes('tornado') ? (`${Tornado}`)
                                        : Info.weather?.toLowerCase().includes('ash') ? (`${Ash}`)
                                          : Info.weather?.toLowerCase().includes('squall') ? (`${Squall}`) : (`${Forecast}`)
              }
              alt={Info.weather}
            />

            {details &&
              <CardContent>

                <Grid container spacing={2}>

                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Paper elevation={3} sx={{
                      backgroundColor: '#676464',
                      color: 'white', borderRadius: '10px', padding: '10px'
                    }}>

                      <Typography
                        sx={{ fontSize: { lg: '25px', md: "20px", sm: "16px", xs: '15px' }, fontFamily: 'Playfair, serif' }}>
                        Temperature MAX: {Info.tempMax ? `${(Math.round(Info.tempMax) / 10).toPrecision(2)}` : ''} °C
                      </Typography>
                      <Typography
                        sx={{ fontSize: { lg: '25px', md: "20px", sm: "16px", xs: '15px' }, fontFamily: 'Playfair, serif' }}>
                        Temperature MIN : {Info.tempMin ? `${(Math.round(Info.tempMin) / 10).toPrecision(2)}` : ''} °C
                      </Typography>
                      <Typography sx={{ fontSize: { lg: '25px', md: "20px", sm: "16px", xs: '15px' }, fontFamily: 'Playfair, serif' }}>
                        Pressure  : {Info.pressure} mmHg
                      </Typography>
                      <Typography sx={{ fontSize: { lg: '25px', md: "20px", sm: "16px", xs: '15px' }, fontFamily: 'Playfair, serif' }}>
                        Humidity : {Info.humidity} g/m3
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Paper elevation={3} sx={{
                      backgroundColor: '#676464', color: 'white', padding: '10px', borderRadius: '10px',
                    }}>
                      <Typography textAlign='center'
                        sx={{ fontSize: { lg: '50px', md: "40px", sm: "25px", xs: '20px' }, fontFamily: 'Playfair, serif' }}>
                        Temperature<br />
                        {Info.temperature ? `${(Math.round(Info.temperature) / 10).toPrecision(2)}` : ''} °C
                      </Typography>

                    </Paper>
                  </Grid>
                </Grid>



              </CardContent>
            }
            <Typography component='h5' variant='body1' 
            sx={{ textAlign: 'right', padding: '10px', color: 'blue',fontFamily: 'Playfair, serif' }}>
              See Forcast Below
              <IconButton onClick={HandleErr}><ArrowDownwardIcon /></IconButton>
            </Typography>
          </Card>


        </Paper>

      </Box>
    </>
  );
}