import React, { Component } from 'react';
import './Card.css'

export default class Card extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props.link)
    }
    render(){
        return(
            <div id='main-img'>
                <div style={{
                    "backgroundColor" :"white",
                    "padding" :"24px",
                    "borderRadius" :"12px",
                    "boxShadow" :"0 0 10px #efefef"
                }}>
                    {
                        this.props.friendly?
                        <img className='fin-img' alt='image' src={this.props.link}/>
                        :
                        <p>Content has been censored</p>
                    }

                    <p id='word'>{this.props.word}</p>
                </div>
            </div>
        );
    }
}