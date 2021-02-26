function client(endpoint, customConfig = {}) {
  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, customConfig)
    .then(res => res.json())
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
