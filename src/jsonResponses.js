// Because this is made in memory, it is purely
// used for demonstrating responses, and does not
// actually save our responses.
const users = {};

// Respond with JSON object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Respond without JSON object
// the only difference is we do not write a JSON
// object, hence responding without a JSON object
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  // return list by default
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Both name and age are required.',
  };

  // check that both fields are present (name and age)
  if (!body.name || !body.age) {
    respondJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // 201 >> user created successfully
  let responseCode = 201;

  // 204 >> user exists, update it with a new age
  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  // add -or- update fields
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  responseJSON.message = 'Updated (No Content)';


  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getUsers,
  addUser,
};
