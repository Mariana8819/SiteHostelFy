import React, { useEffect, useRef, useState } from 'react'

const SearchBar = ({ onSearch, reservas}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    //crea una referencia para el contenedor del menú de resultados
    const resultsRef = useRef(null);

   const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    //Filtra los huéspedes por nombre
    if (value.trim()) {
        const filteredReservas = reservas.filter((reserva) =>
        `${reserva.huesped.nombre} ${reserva.huesped.apellido}`
        .toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredReservas);
    } else {
        setResults([]);
    }
   };

   //Maneja la selección de una reserva
   const handleSelectHuesped = (reserva) => {
    setQuery(`${reserva.huesped.nombre} ${reserva.huesped.apellido}`);
    setResults([]);   //Limpia los resultados
    onSearch(reserva);
   };

   //Detecta clics fuera del menú de resultados y cierra el menú
   useEffect(() => {
    const handleClickOutside = (e) => {
        if (resultsRef.current && !resultsRef.current.contains(e.target)){
            setResults([]);    //cierra elmenú de resultados
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
   }, []);

   return (
    <div className='searchBar flex-center'>
        <input 
        type="text"
        placeholder='Pesquisar pelo nome do hóspede...'
        value={query}
        onChange={handleInputChange}
        className='searchInput'
        style={{padding: '5px', borderRadius: '5px', border:'none'}} 
        />
        {results.length > 0 && (
            <ul className='searchResults' ref={resultsRef}>
                {results.map((reserva)=>(
                    <li
                    key={reserva._id}
                    onClick={()=> handleSelectHuesped(reserva)}
                    >
                        {reserva.huesped.nombre} {reserva.huesped.apellido} - Quarto {reserva.habitacion.numero}
                    </li>
                ))}
            </ul>
        )}
    </div>
   );
};

export default SearchBar;