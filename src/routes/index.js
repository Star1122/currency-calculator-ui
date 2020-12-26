import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Converter from 'containers/Converter';
import ConversionHistory from 'containers/ConvertionHistory';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Converter} />
      <Route exact path="/history" component={ConversionHistory} />

      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
