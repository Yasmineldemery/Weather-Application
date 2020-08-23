/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=72b607c837e19f14737685839624162a&units=imperial'
const zip = document.getElementById('zip').value
// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

document.getElementById('generate').addEventListener('click', performAction)
function performAction(e) {
  const zip = document.getElementById('zip').value
  const feelings = document.getElementById('feelings').value
  getData(baseURL, zip, apiKey)
    .then(function (data) {
      console.log(data)
      postData('/add', {
        temp: data.temp,
        date: newDate,
        content: feelings,
      })
    })
    .then(function () {
      updateUI()
    })
}

const getData = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key)
  try {
    const data = await res.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

const updateUI = async () => {
  const request = await fetch('/all')
  try {
    const data = await request.json()
    document.getElementById('temp').innerHTML = data.temp
    document.getElementById('date').innerHTML = data.date
    document.getElementById('content').innerHTML = data.content
  } catch (error) {
    console.log('error', error)
  }
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  try {
    const newData = await response.json()
    return newData
  } catch (error) {
    console.log('error', error)
  }
}
