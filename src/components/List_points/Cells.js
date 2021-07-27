import React, {useState, useEffect} from 'react';
import axios from 'axios';
import style from './route_trip.module.css';

function CellsRow(props){
    const [point, updPoint] = useState(props.val.point);
    const [duration, updDuration] = useState(props.val.duration);
    const [speed, updSpeed] = useState(props.val.speed);
    const [recSpeed, updRecSpeed] = useState(props.val.recommend_speed);
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

    function prepareForAjax(){
        let startDate = Date.now();
        let obj = {
            id: props.val.id,
            val: !isChecked,
            time: startDate,
        }
        props.func(obj);
    }

    useEffect(() => {
        if (isChecked !== +props.val.isChecked) setChecked(+props.val.isChecked);
    }, [setChecked, isChecked, props.val.isChecked])

    let pointField = isModify
        ? <textarea value={point}
                    className={style.point}
                    onChange={(e) => changeVal(e, updPoint, 'point')}/>
        : <a href={process.env.REACT_APP_PHOTO_FOLDER + props.val.id + process.env.REACT_APP_PHOTO_EXTENSION} className={style.point + ' ' + style.notTextarea}>{point}</a>

    let actPoint = '';
    if (+props.id !== 0){
        actPoint = (Boolean(+props.arr[+props.id - 1].isChecked) && !Boolean(+props.arr[+props.id].isChecked))
        ? style.actPoint
        : ''
    }

    let isPassedPoint = Boolean(+props.val.isChecked)
            ? style.passedPoint
            : '';

    return(
        <div className={`${isPassedPoint} ${actPoint}`}>
            <p className={style.idPoint}>{props.val.id}</p>
            <label className={style.status}>
                <input type='checkbox'
                    name={props.val.distance + '_' + props.val.id}
                    checked={isChecked}
                    onChange={() => prepareForAjax()}/>
            </label>
            {pointField}
            <div className={style.durationBlock}>
                <label htmlFor={'duration_' + props.val.id}>Длительность:</label>
                <input type='text'
                   id={'duration_' + props.val.id}
                   value={duration}
                   className={!isModify ? style.duration + ' ' + style.notInput : style.duration}
                   onChange={(e) => changeVal(e, updDuration, 'duration')}/>
            </div>
            <div className={style.speedBlock}>
                <label htmlFor={'speed_' + props.val.id}>Скорость:</label>
                <input type='text'
                   id={'speed_' + props.val.id}
                   value={speed}
                   className={!isModify ? style.speed + ' ' + style.notInput : style.speed}
                   onChange={(e) => changeVal(e, updSpeed, 'speed')}/>
            </div>
            <div className={style.recSpeedBlock}>
                <label htmlFor={'recSpeed_' + props.val.id}>Рекомендуемая:</label>
                <input type='text'
                   id={'recSpeed_' + props.val.id}
                   value={recSpeed}
                   className={!isModify ? style.recSpeed + ' ' + style.notInput : style.recSpeed}
                   onChange={(e) => changeVal(e, updRecSpeed, 'recommend_speed')}/>
            </div> 
            <div className={style.distanceBlock}>
                <label htmlFor={'distance_' + props.val.id}>Расстояние:</label>
                <input type='text'
                   id={'distance_' + props.val.id}
                   value={distance}
                   className={!isModify ? style.distance + ' ' + style.notInput : style.distance}
                   onChange={(e) => changeVal(e, updDistance, 'distance')}/>
            </div> 
            <p className={style.time}>
                {props.val.time}
            </p>
            <p className={Boolean(+props.val.isDelay) 
                ? style.timetable + ' ' + style.later
                : style.timetable + ' ' + style.early}>
                {props.val.diff}
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