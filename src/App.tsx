import React, { useState } from 'react';
import styled from 'styled-components';

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
}

const PokemonSearch: React.FC = () => {
  const [pokemonName, setPokemonName] = useState<string>('');
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

  const searchPokemon = async () => {
    setLoading(true);
    setError(null);
    setPokemonData(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon no encontrado.');
      }
      const data: PokemonData = await response.json();
      setPokemonData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPokemon();
  };

  return (
    <AppContainer>
      <Container>
        <Title>Buscar Pokémon</Title>
        <Form onSubmit={handleSearch}>
          <Input
            type="text"
            value={pokemonName}
            onChange={handleInputChange}
            placeholder="Ingresa el nombre del Pokémon"
          />
          <Button type="submit">Buscar</Button>
        </Form>

        {loading && <Message>Cargando...</Message>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {pokemonData && (
          <PokemonInfo>
            <PokemonName>{pokemonData.name}</PokemonName>
            <PokemonImage src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            <PokemonTypes>
              {pokemonData.types.map((typeInfo, index) => (
                <li key={index}>{typeInfo.type.name}</li>
              ))}
            </PokemonTypes>
            <h3>Movimientos:</h3>
            <PokemonMoves>
              {pokemonData.moves.slice(0, 5).map((moveInfo, index) => (
                <li key={index}>{moveInfo.move.name}</li>
              ))}
            </PokemonMoves>
          </PokemonInfo>
        )}
      </Container>
    </AppContainer>
  );
};

export default PokemonSearch;

// Estilos con styled-components
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #e0e7ff;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #007bff;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #0056b3;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  color: #666;
  font-size: 1rem;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 1rem;
`;

const PokemonInfo = styled.div`
  text-align: center;
  margin-top: 1.5rem;

  h3 {
    color: #000; /* Color negro para el texto del encabezado */
    margin-top: 1rem;
  }
`;

const PokemonName = styled.h3`
  font-size: 1.5rem;
  color: #000000;
  text-transform: capitalize;
`;

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 0.5rem;
`;

const PokemonTypes = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 0.5rem;

  li {
    display: inline;
    background-color: #ffcc00;
    padding: 0.2rem 0.5rem;
    margin: 0.2rem;
    border-radius: 3px;
    font-size: 0.9rem;
    color: #333;
    text-transform: capitalize;
  }
`;

const PokemonMoves = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 0.5rem;

  li {
    background-color: #d1fae5;
    padding: 0.3rem 0.6rem;
    margin: 0.2rem 0;
    border-radius: 5px;
    font-size: 0.9rem;
    color: #065f46;
    text-transform: capitalize;
  }
`;