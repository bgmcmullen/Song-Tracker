import './App.css';
import Header from './Header.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import MainPage from './MainPage.jsx';




function App() {

  const { isAuthenticated } = useAuth0();


  return (
    <>

      <Header />
      
      {isAuthenticated ? (<MainPage/>) : <h2>Please Login to continue</h2>}
      </>
  );
}


export default App;
