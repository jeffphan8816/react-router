import AllQuotes from './pages/AllQuotes'
import NewQuote from './pages/NewQuote'

import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react';
import QuoteDetails from './pages/QuoteDetail';
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/quotes'/>
                </Route>
                <Route exact path='/quotes' component={AllQuotes}/>
                <Route exact path='/new-quote' component={NewQuote}/>
                <Route path='/quotes/:id' component={QuoteDetails}/>
                <Route path={'*'} component={NotFound}/>
            </Switch>
        </Layout>

    );
}

export default App;
