export function getPokemonTypeByWeather(weather: string): string {
  const map: Record<string, string> = {
    Rain: 'water',
    Clear: 'fire',
    Snow: 'ice',
    Thunderstorm: 'electric',
    Clouds: 'normal',
    Drizzle: 'grass',
    Mist: 'ghost',
    Fog: 'ghost',
  };

  return map[weather] || 'normal'; // default: normal
}
