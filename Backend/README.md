# Backend

The backend is built using a simple `Flask` server.

## Routes:

```
Route: '/'
Methods: 'GET'
Description: 'This route returns a simple message to show that server is running fine!'
Parameters: None
Returns: String: "App up and running!!"
```

```
Route: '/getImages'
Methods: 'POST'
Description: 'The route takes in a sentence and after preprocessing it returns a list of links of images fetched.'
Parameters: String: sentence
Returns: JSON: {'data': list[{'image_url': string, 'search_word': array, 'friendly': bool}]}
```

## Text Processing

The processing of text is done using the python's `ntlk` library which provides provides a huge platform to work with natural language processing.