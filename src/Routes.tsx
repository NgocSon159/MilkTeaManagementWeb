import * as React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {OrderHomeForm} from './milktea-project/components/order/order-home';
import { TestForm } from './milktea-project/components/order/test';

export const MilkTeaRoutes : React.FunctionComponent = (props: any) => (
        <Switch>
            <Route exact path="/" component={OrderHomeForm} />
            <Route exact path="/test/:tableId" component={TestForm} name="test"/>
            <Redirect from="" to=""/>
        </Switch>
)
