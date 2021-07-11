import Link from 'next/link';
import {useState} from 'react';
import axios from 'axios';
import styles from '../styles/Add_point.module.css';

function Add_point(obj){
	const [title, setTitle] = useState('');
	const [distance, setDistance] = useState('');
	const [time, setTime] = useState('');
	const [pointId, setPointId] = useState('');
	const [statusReq, setStatusReq] = useState('');


	function addPoint(e){
		const coefTime = 60;
		const coefDistance = 1000;
		const coefSpeed = 3.6;
		const speed = Math.round((Number(distance) * coefDistance) / (Number(time) * coefTime) * coefSpeed);
		const obj = {};
		obj.title = title;
		obj.distance = distance;
		obj.time = time;
		obj.speed = String(speed);
		obj.pointId = pointId;
		sendData(JSON.stringify(obj));
	}

	async function sendData(data){
		axios.post(`${obj.host}${obj.page}`, data)
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
						onChange={() => setTitle(event.target.value)}/>
				</label>
				<label>
					Расстояние:
					<input type='text'
						name='distance'
						value={distance}
						onChange={() => setDistance(event.target.value)}/>
				</label>
				<label>
					Время:
					<input type='text'
						name='time'
						value={time}
						onChange={() => setTime(event.target.value)}/>
				</label>
				<label>
					pointId:
					<input type='text'
						name='pointId'
						value={pointId}
						onChange={() => setPointId(event.target.value)}/>
				</label>
				<button type='button' onClick={addPoint}>
					Добавить
				</button>
			</form>
			<br/>
			<Link href="/route_trip">
			    <a>К списку</a>
			</Link>
			<p className={statusReq ? '' : styles.hideInfoMes}>
				{statusReq}
			</p>
		</div>
	)
}

export async function getStaticProps() {
	return {
	    props: {
	       host: process.env.HOSTNAME,
	       page: process.env.ADD,
	    },
	}
}

export default Add_point;