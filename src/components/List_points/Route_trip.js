import React, {useState, useEffect} from 'react';
import style from './route_trip.module.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cells from './Cells';

function Route_trip() {
    const [arr, setArr] = useState([]);
    const [showPause, isShowPause] = useState(false);

    function firstRequest() {
        axios.get(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_MAINDATA}`)
            .then(function (response) {
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

    const list = arr.map((item) =>
        <Cells key={item.id} val={item}/>
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
                <p className={style.distance}>
                    Расстояние
                </p>
                <p className={style.time}>
                    Время
                </p>
            </div>
            <div className={style.tableBody}>
                {
                    list
                }
            </div>
            <div className={style.navigateBlock}>
                <Link className={style.link} to="/add_point">Добавить точку</Link>
                <button type='button' className={style.startBtn} onClick={() => startRoute()}>Старт</button>
                <button type='button' className={showPause ? [style.pauseBtn, style.show] : style.pauseBtn}>Пауза</button>
                <button type='button' className={style.stopBtn} onClick={() => stopRoute()}>Стоп</button>
            </div>
        </div>
    )
}
export default Route_trip;