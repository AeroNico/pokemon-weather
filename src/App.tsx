import { useState } from 'react';
import { fetchWeatherByCity } from './api/weather';
import { fetchPokemonByType } from './api/pokemon';
import { getPokemonTypeByWeather } from './utils/weatherToType';
import {
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from '@mui/material';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [pokemons, setPokemons] = useState<{ name: string; sprite: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setPokemons([]);

    try {
      const weatherData = await fetchWeatherByCity(city);
      setWeather(weatherData);

      const condition = weatherData.weather[0].main; // ejemplo: "Rain"
      const pokemonType = getPokemonTypeByWeather(condition);
      const pokemonList = await fetchPokemonByType(pokemonType);
      setPokemons(pokemonList);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ¡Pokémon según el clima!
      </Typography>

      <TextField
        label="Ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mb: 2, mr: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Buscar clima y Pokémon
      </Button>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}

      {weather && (
        <>
          <Typography sx={{ mt: 2 }}>
            En {weather.name} hace {weather.main.temp}°C con clima{' '}
            {weather.weather[0].description}.
          </Typography>
          <Typography>
            Pokémon salvajes del tipo <strong>{getPokemonTypeByWeather(weather.weather[0].main)}</strong> están apareciendo:
          </Typography>
          <List>
            {pokemons.map(({ name, sprite }) => (
              <ListItem key={name}>
                {sprite && (
                  <img
                    src={sprite}
                    alt={name}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                )}
                {name}
              </ListItem>
            ))}
          </List>

        </>
      )}
    </Container>
  );
}

export default App;
