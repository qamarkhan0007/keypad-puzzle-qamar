import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({});
  const [prefix, setPrefix] = useState([]);
  const [error, setError] = useState();
  const [selectedHero, setSelectedHero] = useState([]);

  const code = {
    0: '',
    1: '',
    2: 'ABC',
    3: 'DEF',
    4: 'GHI',
    5: 'JKL',
    6: 'MNO',
    7: 'PQRS',
    8: 'TUV',
    9: 'WXYZ'
  };
  const superHeroes = [
    'SUPERMAN',
    'THOR',
    'ROBIN',
    'IRONMAN',
    'GHOSTRIDER',
    'CAPTAINAMERICA',
    'FLASH',
    'WOLVERINE',
    'BATMAN',
    'HULK',
    'BLADE',
    'PHANTOM',
    'SPIDERMAN',
    'BLACKWIDOW',
    'HELLBOY',
    'PUNISHER'
  ];

  // Tracking the code starting with appropriate format or not (0 <space> code)
  function handlePrefix(val) {
    prefix.push(val)
    setPrefix(prefix);
  }

  // Handler for input
  function handleInput(val) {
    if (prefix[0] === '0' && prefix[1] === '#') {
      setData({...data, [Object.keys(data).length]: +val });
    }else {
      setError('Please Follow The Instructions To Call Super Hero. i.e (0 <space> code)');
      setTimeout(() => {
        setError(null);
      },6000);
    }
  }

  // Function That calculate the code matches with any Super Hero or Not
  function findSuperHero() {
    let n = Object.keys(data).length;
    calculatePermutation(data, 0, [], n);
    if (!selectedHero.length) {
      setError('No Super Hero Code Matched !!');
      setTimeout(() => {
        setError(null);
      },5000);
    }
  }

  // Calculate all the permutations of characters
  function calculatePermutation(number, current, output, len) {
    if (current === len) {
      let str = output.join('');
      if (superHeroes.indexOf(str) !== -1) {
        selectedHero.push(str);
        setSelectedHero([...selectedHero]);
      }
      console.log(str);
      return;
    }

    for (let i = 0; i < code[number[current]].length; i++) {
      output[current] = code[number[current]][i];
      calculatePermutation(number, current+1, output, len);
      if (number[current] === 0 || number[current] === 1)
        return;
    }
  }

  // Reset
  function makeRefresh() {
    setData({});
    setSelectedHero([]);
    setError();
    setPrefix([]);
  }

  // Main JSX Body
  return (
    <div className="container">
    {error && <h4 className="text-center text-danger">{error} </h4>}
    <table className="table table-bordered text-center font-weight-bold mt-4 text-info">
      <tbody>
        <tr>
          <td colSpan="3">
            <h3>Secret Code For Super Hero</h3>
            <h2>
              {data && Object.keys(data).map(number => {
                return data[number]
              })}
            </h2>
          </td>
        </tr>
        <tr>
          <td onClick={() => handleInput('1')}><h2>1</h2> <br /> @ . ?</td>
          <td onClick={() => handleInput('2')}><h2>2</h2> <br /> A B C</td>
          <td onClick={() => handleInput('3')}><h2>3</h2> <br /> D E F</td>
        </tr>
        <tr>
          <td onClick={() => handleInput('4')}><h2>4</h2> <br />G H I</td>
          <td onClick={() => handleInput('5')}><h2>5</h2> <br />J K L</td>
          <td onClick={() => handleInput('6')}><h2>6</h2> <br />M N O</td>
        </tr>
        <tr>
          <td onClick={() => handleInput('7')}><h2>7</h2> <br />P Q R S</td>
          <td onClick={() => handleInput('8')}><h2>8</h2> <br />T U V</td>
          <td onClick={() => handleInput('9')}><h2>9</h2> <br />W X Y Z</td>
        </tr>
        <tr>
          <td onClick={findSuperHero}><h2>*</h2> <br />SEND</td>
          <td onClick={() => handlePrefix('0')}><h2>0</h2> <br />ZERO</td>
          <td onClick={() => handlePrefix('#')}><h2>#</h2> <br />SPACE</td>
        </tr>
      </tbody>
      </table>
      <div>
      {selectedHero.length? <h2>SMS Sent To </h2>: ''}
      {selectedHero.map(hero => {
        return(
          <h2 className="text-primary">{hero}</h2>
        )
      })}
      </div>
      <input type="button" className="btn btn-warning" value="Reset" onClick={makeRefresh} />
    </div>
  );
}

export default App;
