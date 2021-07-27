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
    const [hideStartBtn, isHide] = useState('');

    function firstRequest() {
        axios.get(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_MAINDATA}`)
            .then(function (response) {
                setArr(response.data);
                console.log(response.data[0].isChecked)
                console.log(Boolean(response.data[0].isChecked));
                isHide(Boolean(response.data[0].isChecked) ? style.hideStartBtn : '');
                isShowPause((response.data[0].isChecked === '1') ? true : false)
            })
            .catch(function (error) {
                alert(error);
            })
    }

    function startRoute(){
        let startDate = Date.now();
        if (localStorage.getItem('routePasswd') === null){
            let passwd = prompt('Введите пароль:');
            if (passwd !== process.env.REACT_APP_ROOT_PASSWD){
              alert('Неправильный пароль')
              return false;
            }
            localStorage.setItem('routePasswd', passwd);
            axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_START_ID}`, JSON.stringify({time: startDate}))
                .then(function (response) {
                    if (Array.isArray(response.data)){
                        setArr(response.data);
                        alert('Время пересчитано');
                        return false;
                    }
                    alert(response.data)
                })
                .catch(function (error) {
                    alert(error);
                })
            isShowPause(true);
        } else {
            axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_START_ID}`, JSON.stringify({time: startDate}))
                .then(function (response) {
                    if (Array.isArray(response.data)){
                        setArr(response.data);
                        alert('Время пересчитано');
                        return false;
                    }
                    alert(response.data)
                })
                .catch(function (error) {
                    alert(error);
                })
            isShowPause(true);
        }
    }

    function stopRoute(){
        if (localStorage.getItem('routePasswd') === null){
            let passwd = prompt('Введите пароль:')
            if (passwd !== process.env.REACT_APP_ROOT_PASSWD){
              alert('Неправильный пароль')
              return false;
            }
            localStorage.setItem('routePasswd', passwd);
            isShowPause(false);
        } else {
            isShowPause(false);
        }
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
        if (localStorage.getItem('routePasswd') === null){
            let passwd = prompt('Введите пароль:')
            if (passwd !== process.env.REACT_APP_ROOT_PASSWD){
              alert('Неправильный пароль')
              return false;
            }
            localStorage.setItem('routePasswd', passwd);
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
        } else {
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

    console.log(showPause)
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
                    className={showPause ? hideStartBtn : style.startBtn}
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