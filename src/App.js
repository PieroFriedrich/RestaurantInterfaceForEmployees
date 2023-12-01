import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import ServerInterface from './pages/ServerInterface';
import KitchenInterface from './pages/KitchenInterface';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import { MenuProvider } from './pages/MenuContext';

export default function App(props) {
  return (
    <div>
      <h1>Welcome to Piero's Restaurant (Employee's Version)</h1>
      <NavBar/>
      <MenuProvider>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/server' component={ServerInterface} />
          <Route path='/kitchen' component={KitchenInterface} />
          <Route path='/documentation' component={Documentation} />
          <Route component={NotFound} />
        </Switch>
      </MenuProvider>
    </div>
  );
}
