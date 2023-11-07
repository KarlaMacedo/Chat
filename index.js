const express = require('express');
const path = require('path');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(app.get('port'), () => {
    console.log('Serving on port ' + app.get('port'));
})