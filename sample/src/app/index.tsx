import * as React from 'react';
import { connect } from 'react-redux';
import { Debug } from './Debug';
import { actions } from '../../../src';
import { put } from 'redux-saga/effects';
import { response } from './Actions';
import { Response } from '../../../src/Types';


function* callback(isLoading:boolean, data:any){
    console.log(isLoading, data);
    yield put(response(isLoading, data))
}

const get = actions.fetch("https://api.nasa.gov/planetary/apod?api_key=7TTLAMNHFWUDqcRR1KrTYfZbLTa1YgM9AzDPq9c3", callback )

const Show=({isLoading, data, error}: Response)=>(
    <Debug {...{ isLoading, data: JSON.stringify(data), error }} />
)

const App = ({get, rest} : {get:any, rest:Response})=>{
    return (
        <div>
            <h1> Test Saga redux </h1>
            <div>
                <button onClick={get}>Something!</button>
            </div>
            <Show {...rest} />
        </div>
    )
}

export default connect(
    ({rest}: any)=>({
        rest
    }), (dispatch:any)=>({
            get:()=>{
                console.log("ping!");
                dispatch(get)
            }
        })
)(App);