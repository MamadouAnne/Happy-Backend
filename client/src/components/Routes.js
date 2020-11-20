import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from '../components/Landing';
import SheltersMap from '../components/SheltersMap';
import Shelter from '../components/Shelter';
import CreateShelter from '../components/CreateShelter';

export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/app" component={SheltersMap} />
            <Route path="/shelters/create" component={CreateShelter} />
            <Route path="/shelters/:id" component={Shelter} />
        </Switch>
        </BrowserRouter>
    )
}
