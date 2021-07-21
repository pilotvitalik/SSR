import React, {useState, useEffect} from 'react';
import style from './route_trip.module.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cells from './Cells';

function Route_trip() {
    const [arr, setArr] = useState([]);
    const [showPause, isShowPause] = useState(false);
    const [startInd, setStartInd] = useState('');

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
        let startDate = new Date()
        let startDateMil = Date.now();
        let period = 22 * 1000 * 60;
        let stopDateMil = startDate + period;
        let stopDate = new Date(stopDateMil);
        axios.get(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_START_ID}`)
            .then(function (response) {
                setStartInd(response.data[0]['MIN(id)']);
                console.log(response.data[0]['MIN(id)']);
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
                <p>
                    № п/п
                </p>
                <p>
                    Статус
                </p>
                <p>
                    Точка
                </p>
                <p>
                    Время
                </p>
                <p>
                    Скорость
                </p>
                <p>
                    Расстояние
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