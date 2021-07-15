import React, {useState} from 'react';
import axios from 'axios';
import styles from './add_point.module.css';
import {Link} from 'react-router-dom'

function Add_point(){
	const [title, setTitle] = useState('');
	const [distance, setDistance] = useState('');
	const [time, setTime] = useState('');
	const [statusReq, setStatusReq] = useState('');


	function addPoint(e){
		const coefTime = 60;
		const coefDistance = 1000;
		const coefSpeed = 3.6;
		const speed = (Number(distance) * coefDistance) / (Number(time) * coefTime) * coefSpeed;
		const obj = {};
		obj.title = title;
		obj.distance = distance;
		obj.time = time;
		if (isNaN(distance) && isNaN(time)){
			obj.speed = '-';
		} else {
			obj.speed = String(Math.round(speed * 0.85));
		}
		sendData(JSON.stringify(obj));
		setTitle('');
		setDistance('');
		setTime('');
		setStatusReq('');
	}

	function sendData(data){
		axios.post(`${process.env.REACT_APP_HOSTNAME}${process.env.REACT_APP_ADD}`, data)
		  .then(function (response) {
		    if(response.status === 200){
		    	setStatusReq(response.data);
		    	setTimeout(() => {
		    		setStatusReq('');
		    	}, 2000)
		    }
		  })
		  .catch(function (error) {
		  	setStatusReq('Возникла внутренняя ошибка сервера');
		  	setTimeout(() => {
		  		setStatusReq('');
		  	}, 2000)
		  });
	}

	return (
		<div>
			<form className={styles.addForm}>
				<label>
					Название:
					<input type='text'
						name='title'
						value={title}
						onChange={(event) => setTitle(event.target.value)}/>
				</label>
				<label>
					Расстояние:
					<input type='text'
						name='distance'
						value={distance}
						onChange={(event) => setDistance(event.target.value)}/>
				</label>
				<label>
					Время:
					<input type='text'
						name='time'
						value={time}
						onChange={(event) => setTime(event.target.value)}/>
				</label>
				<button type='button' onClick={addPoint}>
					Добавить
				</button>
			</form>
			<br/>
			<Link to="/">К списку</Link>
			<p className={statusReq ? '' : styles.hideInfoMes}>
				{statusReq}
			</p>
		</div>
	)
}

export default Add_point;