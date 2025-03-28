import React from 'react';
import ReactDOM from 'react-dom';

function Counter() {
    return <div>Счётчик: 0</div>;
}

ReactDOM.render(<Counter />, document.getElementById('react-container'));
