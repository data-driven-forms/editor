import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import React from 'react';
import ReactDOM from 'react-dom';

import Editor from '../src/editor';

const App = () => <Editor />

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
