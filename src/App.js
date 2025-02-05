import {Switch, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs'
import SpecificJobs from './components/SpecificJobs'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/jobs" component={Jobs} />
    <Route exact path="/jobs/:jobId" component={SpecificJobs} />
  </Switch>
)

export default App
