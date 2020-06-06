import React, { Component } from 'react';
import './New_Main.css';
import Card from '../../Components/Card/Card';

if (!('webkitSpeechRecognition' in window)) {
    alert('Voice recognition not supported on your device')
} else {
    var recognition = new window.webkitSpeechRecognition(); //This object manages our whole recognition process.
    recognition.continuous = true;   //Suitable for dictation.
    recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
    //Define some more additional parameters for the recognition:
    recognition.lang = "en-US";
    recognition.maxAlternatives = 2; //Since from experience, the highest result is really the best...
    console.log('Speech set up!')
}

export default class New_Main extends Component {
    constructor() {
        super()
        this.state = {
            sentence: '',
            data: [],
            steps: '',
            loading_text: 'Setting things up...'
        }
    }
    //Function to start the recording
    startRecord = () => {
        console.log('Speak!!')

        this.setState({
            listening: true,
            loading_text: 'Listening...'
        }, () => {
            try {
                recognition.start()
            }
            catch (err) {

            }
        })
    }
    //Function to end the recording
    endRecord() {
        console.log('Hold on..')
        this.setState({
            listening: false,
            loading_text: 'Hold on...'
        }, () => {
            recognition.stop();
        })
    }

    //Linsten to the audio
    onListening() {
        //Once we get a result i.e. a group of words are finalized as sentences
        recognition.onresult = (event) => {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) { //Final results
                    this.setState({ sentence: event.results[i][0].transcript, loading: true }, () => {
                        //Send a request to the backend
                        fetch('http://localhost:8080/getImages', {
                            method: 'post',
                            headers: { 'Content-type': 'application/json' },
                            body: JSON.stringify({
                                sentence: this.state.sentence
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(this.state)
                                this.setState({ data: data.data, steps: data.steps })
                            })
                    })
                    this.setState({ loading: false })
                } else {   //i.e. interim...
                    this.setState({ sentence: event.results[i][0].transcript })
                }
            }
        }
    }
    //The method runs once all the components are rendered
    componentDidMount() {
        this.onListening();

            this.startRecord();
            setTimeout(function () {
                this.endRecord();
            }
                .bind(this)
                , 200)

            //Call startRecord in intervals of 10 sec. Then endRecord is called
            //This whole method is then called in intervas of 10.5 sec
            setInterval(function () {
                if (this.state.listening === false) {
                    this.startRecord()
                }
                setTimeout(function () {
                    if (this.state.listening === true) {
                        this.endRecord()
                    }

                }
                    .bind(this)
                    , 10000)
            }
                .bind(this)
                , 10500)

    }
    render() {
        //Making a card component
        if (typeof (this.state.data) === 'object' && this.state.data.length) {

            var rows = this.state.data.map((obj, i) => {
                console.log(obj)
                if (obj.image_url !== null) {
                    return (

                        <Card link={obj.image_url} word={obj.search_word.join(" ")} friendly={obj.friendly} />
                    );
                }
            })
        }
        return (
            <div id='new_main'>

                <div id='img-view'>
                    {
                        this.state.data.length ?
                            <div>
                                <div id='img-holder'>
                                    {rows}
                                </div>
                                <br />
                                <br />
                                <p style={{
                                    "textAlign": "center",
                                    "color": "#fff",
                                    "marginTop": "4px"
                                }}><i>Swipe left to view more</i></p>
                            </div>
                            :
                            null
                    }
                </div>
                <div id='text-view'>
                    {
                        this.state.sentence.length ?
                            <p id='text-main'>{this.state.sentence}</p>
                            :
                            <p id='text-loading'>{this.state.loading_text}</p>
                    }
                </div>
            </div>

        );
    }
}