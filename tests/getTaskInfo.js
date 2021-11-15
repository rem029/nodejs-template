const io = require('socket.io-client');

const socket = io('http://localhost:8080'); //ip and port of server

const taskId = 'task1631166506053';
const taskInfo_Id = [
  '6139a029f3cbf880e5d2e585',
  '6139a029f3cbf880e5d2e586',
  '6139a029f3cbf880e5d2e587',
  '6139a029f3cbf880e5d2e588',
  '6139a029f3cbf880e5d2e589',
  '6139a029f3cbf880e5d2e58a',
  '6139a029f3cbf880e5d2e58b',
  '6139a029f3cbf880e5d2e58c',
  '6139a029f3cbf880e5d2e58d',
  '6139a029f3cbf880e5d2e58e',
];

socket.on(`${taskId}_UPDATE`, (data) => {
  console.log('Task Id Update', data);
});

taskInfo_Id.map((taskInfo__Id) => {
  socket.on(`${taskId}.${taskInfo__Id}_UPDATE`, (data) => {
    console.log('Task Info Id Update', data);
  });
});
