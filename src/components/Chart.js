import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Bar, Legend } from 'recharts';
import Title from './Title';
import Text from "recharts/lib/component/Text";

const data = [
    {
        "name": "fridge1",
        "num": 10
    },
    {
        "name": "fridge2",
        "num": 50
    },
    {
        "name": "fridge3",
        "num": 23
    },
    {
        "name": "fridge4",
        "num": 54
    },
    {
        "name": "fridge5",
        "num": 64
    },
    {
        "name": "fridge6",
        "num": 43
    },
    {
        "name": "fridge7",
        "num": 31
    }
];

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title><Text style={{color: theme.palette.text.primary}}>Occupancy of Refrigerators</Text></Title>
            <ResponsiveContainer>
                <BarChart width={730} height={250} data={data}>
                    <XAxis dataKey="name"  stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="num" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
