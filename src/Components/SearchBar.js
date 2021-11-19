import React from 'react';

const SearchBar = ({products, setProducts}) => {
  const [val, setVal] = React.useState('');
  const handleClick = () => {
    const result = products.filter(p => p.name === val);
    setProducts(result);
  }


  return (
    <>
      <input type="text" value={val} onChange={({target}) => setVal(target.value)} />
      <button onClick={handleClick}>Search</button>
    </>
  );
}

export default SearchBar;