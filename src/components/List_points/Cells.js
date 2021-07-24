import React, {useState} from 'react';
import axios from 'axios';
import style from './route_trip.module.css';

function CellsRow(props){
    const [point, updPoint] = useState(props.val.point);
    const [duration, updDuration] = useState(props.val.duration);
    const [speed, updSpeed] = useState(props.val.speed);
    const [distance, updDistance] = useState(props.val.distance);
    const [isModify, setModify] = useState(false);
    const [collectData, changeSendData] = useState({});
    const [isChecked, setChecked] = useState(+props.val.isChecked);

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
                alert(response.data);
            })
            .catch(function (error) {
                alert(JSON.stringify(error))
            });
    }

    function deleteString(){
        axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_DELETE}`, JSON.stringify({id: props.val.id}))
            .then(function (response) {
                alert(response.data);
            })
            .catch(function (error) {
                alert(JSON.stringify(error))
            });
    }

    function passagePoint(){
        let obj = {
            id: props.val.id,
            val: !isChecked,
        }
        axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_CHECK_POINT}`, JSON.stringify(obj))
            .then(function (response) {
                setChecked(response.data.status);
            })
            .catch(function (error) {
                alert(JSON.stringify(error))
            });
    }

    let pointField = isModify
        ? <textarea value={point}
                    className={style.point}
                    onChange={(e) => passagePoint(e, updPoint, 'point')}/>
        : <p className={style.point + ' ' + style.notTextarea}>{point}</p>

    return(
        <div>
            <p className={style.idPoint}>{props.val.id}</p>
            <label className={style.status}>
                <input type='checkbox'
                    name={props.val.distance + '_' + props.val.id}
                    checked={isChecked}
                    onChange={() => passagePoint()}/>
            </label>
            {pointField}
            <input type='text'
                   value={duration}
                   className={!isModify ? style.duration + ' ' + style.notInput : style.duration}
                   onChange={(e) => changeVal(e, updDuration, 'time')}/>
            <input type='text'
                   value={speed}
                   className={!isModify ? style.speed + ' ' + style.notInput : style.speed}
                   onChange={(e) => changeVal(e, updSpeed, 'speed')}/>
            <input type='text'
                   value={distance}
                   className={!isModify ? style.distance + ' ' + style.notInput : style.distance}
                   onChange={(e) => changeVal(e, updDistance, 'distance')}/>
            <p className={style.time}>
                {props.val.time}
            </p>
            <div className={style.modifyBlock}>
                <button type='button' className={style.editBtn} onClick={() => modifyString()}>
                    {
                        isModify
                            ? 'Отпр.'
                            : 'Ред.'
                    }
                </button>
                <button type='button' onClick={() => deleteString()}>
                    Удал.
                </button>
            </div>
        </div>
    )
}

export default CellsRow;