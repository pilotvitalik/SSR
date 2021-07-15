import React, {useState} from 'react';
import axios from 'axios';
import style from './route_trip.module.css';

function CellsRow(props){
    const [point, updPoint] = useState(props.val.point);
    const [time, updTime] = useState(props.val.time);
    const [speed, updSpeed] = useState(props.val.speed);
    const [distance, updDistance] = useState(props.val.distance);
    const [isModify, setModify] = useState(false);
    const [collectData, changeSendData] = useState({});

    function modifyString(){
        !isModify
            ? setModify(true)
            : sendData();
    }

    function changeVal(e, func, titleField){
        let obj = collectData;
        if (!obj.hasOwnProperty('id')) obj.id = props.val.id;
        obj[titleField] = (!e.target.value) ? 0 : e.target.value;
        changeSendData(obj);
        func(e.target.value);
    }

    function sendData() {
        setModify(false);
        axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_EDIT}`, JSON.stringify(collectData))
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    let pointField = isModify
        ? <textarea value={point}
                    onChange={(e) => changeVal(e, updPoint, 'point')}/>
        : <p>{point}</p>

    return(
        <div>
            <p>{props.val.id}</p>
            {pointField}
            <input type='text'
                   value={time}
                   className={!isModify ? style.notInput : ''}
                   onChange={(e) => changeVal(e, updTime, 'time')}/>
            <input type='text'
                   value={speed}
                   className={!isModify ? style.notInput : ''}
                   onChange={(e) => changeVal(e, updSpeed, 'speed')}/>
            <input type='text'
                   value={distance}
                   className={!isModify ? style.notInput : ''}
                   onChange={(e) => changeVal(e, updDistance, 'distance')}/>
            <div className={style.modifyBlock}>
                <button type='button' className={style.editBtn} onClick={() => modifyString()}>
                    {
                        isModify
                            ? 'Отпр.'
                            : 'Ред.'
                    }
                </button>
                <button type='button'>
                    Удал.
                </button>
            </div>
        </div>
    )
}

export default CellsRow;