import { useState, useEffect } from 'react';
import './App.css';

const getStorageTheme = () => {
  let theme = 'light-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};

function App() {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState([]);

  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  let calcBmi = event => {
    event.preventDefault();

    // height : cm
    // if weight: lbs and height : in formula is  weight / height * height * 703

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      let bmi = weight / ((height * height) / 10000);
      setBmi(bmi.toFixed(1));

      bmi <= 0
        ? setMessage('Please enter a valid weight and height')
        : bmi < 18.5
        ? setMessage('You are underweight')
        : bmi >= 18.5 && bmi < 24.9
        ? setMessage('You are a healthy weight')
        : bmi >= 25 && bmi < 29.9
        ? setMessage('You are over weight')
        : bmi > 30
        ? setMessage('You are obese')
        : setMessage('Please enter a valid weight and height');
    }
    // if (bmi < 18.5) {
    //   setMessage('You are underweight');
    // } else if (bmi >= 18.5 && bmi < 25) {
    //   setMessage('You are a healthy weight');
    // } else if (bmi >= 25 && bmi < 30) {
    //   setMessage('You are a overweight');
    // } else if (bmi >= 30) {
    //   setMessage('You are a obese');
    // }
  };
  let reset = () => {
    window.location.reload();
  };

  return (
    <>
      <div className='nav-center'>
        <button className='btn-toggle' onClick={toggleTheme}>
          {theme}
        </button>
      </div>
      <div className='app'>
        <div className='container'>
          <h2 className='center'>BMI Calculator</h2>
          <form onSubmit={calcBmi}>
            <div>
              <label>Weight (kg)</label>
              <input value={weight} onChange={e => setWeight(e.target.value)} />
            </div>
            <div>
              <label>Height (cm)</label>
              <input value={height} onChange={event => setHeight(event.target.value)} />
            </div>
            <div>
              <button className='btn' type='submit'>
                Submit
              </button>
              <button
                className='btn btn-outline'
                onClick={() =>
                  reset({
                    height: '',
                    weight: '',
                    message: '',
                  })
                }
                type='submit'>
                Reload
              </button>
            </div>
          </form>
          <div className='center'>
            <h3>Your BMI is : {bmi}</h3>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
