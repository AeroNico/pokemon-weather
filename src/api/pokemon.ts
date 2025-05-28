export async function fetchPokemonByType(type: string) {
  const url = `https://pokeapi.co/api/v2/type/${type}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Tipo no encontrado");
    const data = await response.json();

    // Tomamos hasta 5 Pokémon al azar
    const selected = data.pokemon
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    // Por cada uno, pedimos su sprite
    const results = await Promise.all(
      selected.map(async (entry: any) => {
        const res = await fetch(entry.pokemon.url);
        const details = await res.json();
        return {
          name: details.name,
          sprite: details.sprites.front_default,
        };
      })
    );

    return results;
  } catch (error) {
    throw error;
  }
}
