
const express = require('express');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);

});



// npx sequelize model:generate --name City --attributes name:string
// npx sequelize db:migrate
// npx sequelize-cli db:migrate --name 20250314190308-create-task-assignees.js
// npx sequelize-cli db:migrate:undo:all
// npx sequelize-cli db:migrate:undo --name 20250314190028-create-task.js
