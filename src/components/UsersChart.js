import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Bar, Legend } from 'recharts';
import Title from './Title';

export default function UsersChart({allData}) {
    const theme = useTheme();

    let names = [];
    let values = [];

    let data = [];

    const countFridgeOccupancy = () => {
        for (let i = 0; i < allData.length; i++) {
            let name = allData[i].role;

            let idx = names.indexOf(name);

            if (idx === -1) {
                names.push(name);
                values.push(1);
            } else {
                values[idx] += 1;
            }
        }

        for (let i = 0; i < names.length; i++) {
            let element = {};

            element.name = names[i];
            element.num = values[i];

            data.push(element);
        }
    };

    countFridgeOccupancy();

    return (
        <React.Fragment>
            <Title>Users distribution</Title>
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
