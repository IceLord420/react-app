import 'antd/dist/antd.css'
import Navbar from './Navbar';
import Vehicle from './pages/Vehicle';
import Customer from './pages/Customer';
import Rent from './pages/Rent';
import Home from './pages/Home';

function App() {
  let component
  switch(window.location.pathname){
      case "/":
        component = <Home />
        break
      case "/vehicle":
        component = <Vehicle />
        break
      case "/customer":
        component = <Customer />
        break
      case "/rent":
        component = <Rent />
        break
  }

  return (
    <>
      <Navbar />
      {component}
    </>
  );
}

export default App;
