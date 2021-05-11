import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BoardPage() {

    let { id } = useParams();

    const [board, setBoard] = useState({
        name: '',
        columns: []
    });
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND + '/board/' + id)
            .then(res => {
                setBoard({ name: res.data.name, columns: res.data.columns })
            })
    })

    return (<h1>{board.name}</h1>);
}