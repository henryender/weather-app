import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';



export default function ControlledAccordions({ data, drop }) {

  const yee = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const DayInaweek = new Date().getDay();
  const correct = yee.slice(DayInaweek, yee.length).concat(yee.slice(0, DayInaweek))

  const month =
    ["January", 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December']
  const today = new Date();
  const Present = today.getDate() + 'th-'
    + month[today.getMonth()] +
    '-' + today.getFullYear() + '; '
    + today.getHours({ hour12: true }) + ':' + today.getMinutes() + ':' + today.getSeconds()

 

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
  <>
  {drop?(<Grid container spacing={2} mt={5}>
      {data.map((place, dt_txt) =>
        <Grid item lg={2.4} md={2.4} sm={4} xs={6}>
          <Item sx={{ padding: '10px' }} key={dt_txt}>
            <h3>{correct[dt_txt]}</h3>
            <h3>{Present}</h3>
            <h3>{place.desc}</h3>
            <i className={`owf owf-${place.iconId} owf-5zx`} style={{ fontSize: '5rem' }} />
            <h3>Temperature: {(Math.round(place.temp) / 10).toPrecision(2)}°C</h3>
          </Item>
        </Grid>
      )}
    </Grid>):(null)}
  </>
  );
}