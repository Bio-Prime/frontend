import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';

const columns = [
    {
        title: 'Primer designation',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Sequence',
        dataIndex: 'sequence',
        key: 'sequence',
    },
    {
        title: 'Amplicon size (bp)',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: 'Annealing temperature (°C)',
        key: 'temperature',
        dataIndex: 'temperature',
    },
    {
        title: 'Reference',
        key: 'reference',
        dataIndex: 'reference',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <span>
                <a>Update</a>
                <Divider type="vertical" />
                <a>Delete</a>
            </span>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'erm(A)-F',
        sequence: 'TCTAAAAAGCATGTAAAAGAAA',
        size: '553',
        temperature: '52',
        reference: '17'
    },
    {
        key: '2',
        name: 'erm(A)-F',
        sequence: 'TCTAAAAAGCATGTAAAAGAAA',
        size: '553',
        temperature: '52',
        reference: '17'
    },
    {
        key: '3',
        name: 'erm(A)-F',
        sequence: 'TCTAAAAAGCATGTAAAAGAAA',
        size: '553',
        temperature: '52',
        reference: '17'
    },
    {
        key: '4',
        name: 'erm(A)-F',
        sequence: 'TCTAAAAAGCATGTAAAAGAAA',
        size: '553',
        temperature: '52',
        reference: '17'
    }
];

class Home extends Component {
    render() {
        return (
            <div>
                <h2>HELLO</h2>
                <Table columns={columns} dataSource={data} />
                <p>Cras facilisis urna ornare ex volutpat, et
                    convallis erat elementum. Ut aliquam, ipsum vitae
                    gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                    metus nec massa. Maecenas hendrerit laoreet augue
                    nec molestie. Cum sociis natoque penatibus et magnis
                    dis parturient montes, nascetur ridiculus mus.</p>

                <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
            </div>
        );
    }
}

export default Home;
