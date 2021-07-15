import React, {useState, useEffect} from 'react';
import style from './route_trip.module.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Route_trip() {
    const [arr, setArr] = useState([]);

    function firstRequest() {
        axios.get(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_MAINDATA}`)
            .then(function (response) {
                setArr(response.data);
            })
            .catch(function (error) {
                alert(error);
            })
    }

    function modifyString(id){
        console.log(id);
    }

    const list = arr.map((item) =>
        <div key={item.id}>
            <input type='text' value={item.id} className={style.notInput}/>
            <p>{item.point}</p>
            <input type='text' value={item.time} className={style.notInput}/>
            <input type='text' value={item.speed} className={style.notInput}/>
            <input type='text' value={item.distance} className={style.notInput}/>
            <div className={style.modifyBlock}>
                <button type='button' className={style.editBtn} onClick={() => modifyString(item.id)}>
                    Ред.
                </button>
                <button type='button'>
                    Удал.
                </button>
            </div>
        </div>
    )

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
            <Link className={style.link} to="/add_point">Добавить точку</Link>
        </div>
    )
}

export default Route_trip;