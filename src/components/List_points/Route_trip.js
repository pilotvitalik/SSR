import React, {useState, useEffect} from 'react';
import style from './route_trip.module.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cells from './Cells';

function Route_trip() {
    const [arr, setArr] = useState([]);
    const [showPause, isShowPause] = useState(false);
    const [pauseText, setPauseText] = useState('Пауза');
    const [pause, isPause] = useState(true);

    function firstRequest() {
        axios.get(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_MAINDATA}`)
            .then(function (response) {
                console.log(response.data)
                setArr(response.data);
            })
            .catch(function (error) {
                alert(error);
            })
    }

    function startRoute(){
        let startDate = Date.now();
        axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_START_ID}`, JSON.stringify({time: startDate}))
            .then(function (response) {
                setArr(response.data);
                alert('Время пересчитано');
            })
            .catch(function (error) {
                alert(error);
            })
        isShowPause(true);
    }

    function stopRoute(){
        isShowPause(false);
    }

    function passagePoint(obj){
        axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_CHECK_POINT}`, JSON.stringify(obj))
            .then(function (response) {
                alert('Данные обновлены');
                setArr(response.data);
            })
            .catch(function (error) {
                alert(JSON.stringify(error))
            });
    }

    function pauseRoute(){
        setPauseText(pause ? 'Продолжить' : 'Пауза');
        isPause(!pause);
        let actDate = Date.now();
        axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_PAUSE_ROUTE}`, JSON.stringify({status: pause, actTime: actDate}))
            .then(function (response) {
                if(pause){
                    alert(response.data.status);
                    return false;
                }
                alert('Маршрут возобновлен');
                setArr(response.data);
            })
            .catch(function (error) {
                alert(JSON.stringify(error))
            });
    }

    const list = arr.map((item, index) =>
        <Cells key={item.id}
            val={item}
            id={index}
            arr={arr}
            func={passagePoint}/>
    );

    useEffect(() => {
        firstRequest();
    }, [])

    return (
        <div className={style.wrapper}>
            <div className={style.tableTitle}>
                <p className={style.idPoint}>
                    № п/п
                </p>
                <p className={style.status}>
                    Статус
                </p>
                <p className={style.point}>
                    Точка
                </p>
                <p className={style.duration}>
                    Время до точки
                </p>
                <p className={style.speed}>
                    Скорость
                </p>
                <p className={style.recSpeed}>
                    Рекомендуемая
                </p>
                <p className={style.distance}>
                    Расстояние
                </p>
                <p className={style.time}>
                    Время
                </p>
                <p className={style.timetable}>
                    График
                </p>
            </div>
            <div className={style.tableBody}>
                {
                    list
                }
            </div>
            <div className={style.navigateBlock}>
                <Link className={style.link} to="/add_point">Добавить точку</Link>
                <button type='button'
                    className={showPause ? style.startBtn + ' ' + style.activePause : style.startBtn}
                    onClick={() => startRoute()}>Старт</button>
                <button type='button'
                    className={showPause ? [style.pauseBtn + ' ' + style.show] : style.pauseBtn}
                    onClick={() => pauseRoute()}>{pauseText}</button>
                <button type='button' className={style.stopBtn} onClick={() => stopRoute()}>Стоп</button>
            </div>
        </div>
    )
}
export default Route_trip;