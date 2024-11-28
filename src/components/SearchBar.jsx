import React, { useState } from "react";


const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search in your dreams..."
                value={query}
                onChange={handleInputChange}          
            
            />
        </div>
    );
};

export default SearchBar