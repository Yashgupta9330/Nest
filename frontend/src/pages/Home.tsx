import { useState } from 'react';
import SearchBar from '../components/search';

const Home = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchResult = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto mt-4">
      <SearchBar
        placeholder="Search for a committee..."
        searchEndpoint="http://127.0.0.1:8000/api/v1/owasp/search/committee"
        onSearchResult={handleSearchResult}
      />
    </div>
  )
};

export default Home;
