import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import data from './states.json'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import RecipeReviewCard from './Card';
import CircularProgressWithLabel from './Loading'
import ControlledAccordions from './Accordion';

export default function CountrySelect() {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(null);
  const [Info, setInfo] = useState({})
  const [Forecast, SetForcast] = useState([])
  const [isloading, Setloading] = useState(false)
  const [drop, Setdrop] = useState(false)
  const [Error, SetError] = useState(false)
  const [details, setDetails] = useState(false)
  const api = {
    url: 'https://api.openweathermap.org/data/2.5/',
    key: '9ec7419d9148c61081c73d6ddaa1056b'
  }

  function HandleFetch() {
    if (inputValue) {
      Setdrop(false);
      SetError(false);
      Setloading(true);
      setDetails(true);
      setTimeout(() => {
        fetch(`${api.url}weather?lat=${value.latitude}&lon=${value.longitude}&appid=${api.key}`)
          .then(response => response.json())
          .then(response => setInfo({
            weather: response.weather[0].main,
            temperature: response.main.temp,
            pressure: response.main.pressure,
            humidity: response.main.humidity,
            tempMax: response.main.temp_max,
            tempMin: response.main.temp_min,
          }));
        fetch(`${api.url}forecast?lat=${value.latitude}&lon=${value.longitude}&appid=${api.key}`)
          .then(response => response.json())
          .then(response => {

            Setloading(false);
            SetForcast(response.list.filter(day => day.dt_txt.includes('00:00:00'))
              .map(item => ({
                temp: item.main.temp,
                dt: item.dt,
                date: item.dt_txt,
                iconId: item.weather[0].id,
                desc: item.weather[0].description
              })))
          })


      }, 7400)

    }
    else (SetError(true))
  }

  return (
    <>
      <Box margin='2%'>
        <Box width={{ lg: '80%', md: '80%', sm: '80%', xs: '100%' }} margin="auto" mt={5}>
          <Typography textAlign='center'
            margin="2%"
            sx={{ fontSize: { lg: 25, md: 20, sm: 20, xs: 15 }, fontFamily: 'Playfair, serif' }} fontWeight='500px'>
            CURRENT WEATHER & FORECAST FOR DIFFERENT CITIES OF THE WORLD
          </Typography>

          <Box
            sx={{ display: 'flex', justifyContent: 'center' }}>
            <Autocomplete
              id="country-select-demo"
              sx={{ width: '75%', marginRight: '10px' }}

              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}

              loading={true}
              loadingText="Not Available"
              options={data}
              autoHighlight
              getOptionLabel={(option) => `${option.name}, ${option.country_code}`}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0, }, }} {...props} key={option.id}>
                  {option.name} ({option.country_name}),{option.country_code}
                </Box>)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a City "
                  inputProps={{ ...params.inputProps, }}
                  size='small'
                />
              )}
            />
            <Button variant='contained' size='small'
              sx={{ fontSize: { lg: "15px", md: '12px', sm: '10px', xs: '9px' } }}
              onClick={() => { HandleFetch() }}>Get Weather </Button>
          </Box>

          {Error ? (
            <Typography
              sx={{
                fontSize: { lg: "30px", md: '20px', sm: '20px', xs: '20px' },
                textAlign: "center", color: 'red', marginTop: '100px',fontFamily: 'Playfair, serif'
              }}>
              Opps!! an error Occured..<br />Please Select and Search a City
            </Typography>
          ) :
            (<Box>
              {isloading ?
                (<>
                  <Box display='flex' justifyContent='center' alignItems='center' mt={7}>
                    <CircularProgressWithLabel />
                  </Box>
                  <p style={{ textAlign: 'center' }}>Getting Weather Condition.....</p>
                </>) :
                (<Box>
                  <RecipeReviewCard Info={Info} Setdrop={Setdrop} SetError={SetError} drop={drop}
                    inputValue={inputValue} details={details} />
                </Box>)}
            </Box>)}
          {/* <div>{`inputValue: '${inputValue}'`}</div>
      <div>{`value: ${value !== null ? `Long:'${value.longitude}' Lat:${value.latitude}` : 'null'}`}</div> */}

        </Box>

        <ControlledAccordions data={Forecast} drop={drop} />

      </Box>
    </>


  );
}

