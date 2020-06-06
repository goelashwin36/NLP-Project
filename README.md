# Natural Language Processing

## Title

Audio Imagifier

## Desctiption

The project is meant for Dyslexic people who have a learning disorder and often find it hard to read text, understand audio and even write.

The project helps in generating a stream of images from live audio.

The webkit speech recognition is used to convert audio into text in realtime. The generated text is sent to backend, which after preprocessing is used to query the Azure cognitive Image search api and finally return a set of images urls. The images corresponding to the urls are then fetched and it helps in effective visualization of the audio stream.

## Technologies Used

- Frontend: React, webkit speech recognition.
- Backend: nltk, Flask, Azure cognitive image search API