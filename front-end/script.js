const addForm = document.getElementById('form_add');
const updateForm = document.getElementById('form_update');
const deleteForm = document.getElementById('form_delete');
const getForm = document.getElementById('form_get');
const table = document.getElementById('table');

//****************************  SECTION  ********************************* */
//? SETTING UP THE REQUEST FUNCTION FOR REQUESTING DATA FROM API

const request = async (url, type, data, heads) =>
  data
    ? await fetch(url, {
        method: type,
        body: data,
        headers: heads,
      })
    : await fetch(url, {
        method: type,
      });

//****************************  SECTION  ********************************* */
//? ADD NEW USERS HANDLER

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  //****************************  SECTION  ********************************* */
  //? CREATED AND EMPTY OBJECT TO STORE THE USER DATA
  const inputData = {};

  //? POPULATING THE INPUT DATA VARIABLE WITH DATA ENTERED BY USER IN THE FORM
  addForm
    .querySelectorAll('input')
    .forEach((el) => (inputData[el.name] = el.value));

  //****************************  SECTION  ********************************* */
  //? WAITING FOR THE RESPONSE OF THE REQUEST
  const response = await request(
    'https://basic-server-class13.herokuapp.com/user',
    'POST',
    JSON.stringify(inputData),
    { 'content-type': 'application/json' }
  ); //? PASSING THE PARAMETERS FOR THE REQUEST FUNCTION

  //****************************  SECTION  ********************************* */
  //? SHOWING RESPONSE TO THE USER
  alert(
    response.status === 200
      ? 'User Created Successfully.'
      : 'An Error Occurred.'
  );
});

//****************************  SECTION  ********************************* */
//? UPDATE USER HANDLER

updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  //****************************  SECTION  ********************************* */
  //? GETTING THE VALUE OF ID
  const id = updateForm.querySelector('#id').value;

  //****************************  SECTION  ********************************* */
  //? CREATED AND EMPTY OBJECT TO STORE THE USER DATA
  const inputData = {};

  //? POPULATING THE INPUT DATA VARIABLE WITH DATA ENTERED BY USER IN THE FORM
  updateForm
    .querySelectorAll('input')
    .forEach((el) => (el.name !== 'id' ? (inputData[el.name] = el.value) : ''));

  //****************************  SECTION  ********************************* */
  //? WAITING FOR THE RESPONSE OF THE REQUEST
  const response = await request(
    `https://https://add-remove-data-server.herokuapp.com//user/${id}`,
    'PUT',
    JSON.stringify(inputData),
    {
      'content-type': 'application/json',
    }
  ); //? PASSING THE PARAMETERS FOR THE REQUEST FUNCTION

  //****************************  SECTION  ********************************* */
  //? SHOWING RESPONSE TO THE USER
  alert(
    response.status === 200
      ? 'User Updated Successfully.'
      : 'An Error Occurred.'
  );
});

//****************************  SECTION  ********************************* */
//? DELETE ( ALL USERS / SINGLE USER ) HANDLER

deleteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  //****************************  SECTION  ********************************* */
  //? GETTING THE VALUE OF ID
  const id = deleteForm.querySelector('input').value;

  //****************************  SECTION  ********************************* */
  //? SETTING UP THE URL ACCORDING TO THE ID IF SPECIFIED
  const url = `https://add-remove-data-server.herokuapp.com//user${
    id ? `/${id}` : 's'
  }`;
  //? WAITING FOR THE RESPONSE OF THE REQUEST
  const response = await request(url, 'DELETE'); //? PASSING THE PARAMETERS FOR THE REQUEST FUNCTION

  //****************************  SECTION  ********************************* */
  //? SHOWING RESPONSE TO THE USER
  alert(
    response.status === 200 && id
      ? 'User Deleted Successfully.'
      : response.status === 200 && !id
      ? 'All Users Deleted.'
      : 'An Error occurred.'
  );
});

//****************************  SECTION  ********************************* */
//? GET ( ALL USERS / SINGLE USER ) HANDLER

getForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  //****************************  SECTION  ********************************* */
  //? GETTING THE VALUE OF ID
  const id = getForm.querySelector('input').value;

  //****************************  SECTION  ********************************* */
  //? SETTING UP THE URL ACCORDING TO THE ID IF SPECIFIED
  const url = `https://add-remove-data-server.herokuapp.com//user${
    id ? `/${id}` : 's'
  }`;
  //? WAITING FOR THE RESPONSE OF THE REQUEST
  const response = await request(url, 'GET'); //? PASSING THE PARAMETERS FOR THE REQUEST FUNCTION
  //? CREATING THE DATA VARIABLE TO STORE THE FETCHED DATA
  let data;

  //****************************  SECTION  ********************************* */
  //? SHOWING USER THE ERROR IF USER NOT FOUND
  if (response.status === 404) {
    alert('User Not Found');
  } else {
    //? SETTING UP THE DATA ACCORDING TO THE ID IF SPECIFIED
    data = id ? [await response.json()] : await response.json();

    //****************************  SECTION  ********************************* */
    //? CREATING THE EMPTY HTML VARIABLE
    let html = '';

    //? POPULATING THE HTML VARIABLE WITH HTML
    data.forEach((el, ind) => {
      html += `<tr><td>${ind}</td><td>${el.name}</td><td>${el.email}</td><td>${el.address}</td><td>${el.contact}</td></tr>`;
    });

    //****************************  SECTION  ********************************* */
    //? RENDERING THE HTML ONTO THE WEB PAGE
    table.querySelector('tbody').innerHTML = html;
  }
});
