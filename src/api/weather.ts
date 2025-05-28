const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeatherByCity(city: string) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ciudad no encontrada");
    return await response.json();
  } catch (error) {
    throw error;
  }
}