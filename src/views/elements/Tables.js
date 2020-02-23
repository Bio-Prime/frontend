import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Primer designation', field: 'name' },
            { title: 'Sequence', field: 'sequence' },
            { title: 'Amplicon size (bp)', field: 'size', type: 'numeric' },
            { title: 'Annealing temperature (°C)', field: 'temperature', type: 'numeric' },
            { title: 'Reference', field: 'reference', type: 'numeric' },
        ],
        data: [
            { name: 'erm(A)-F', sequence: 'TCTAAAAAGCATGTAAAAGAAA', size: 553, temperature: 52, reference: 17 },
            { name: 'kebab', sequence: 'TCTAAAAAGCATGTAAAAGAAA', size: 553, temperature: 52, reference: 17 },
            { name: 'erm(A)-F', sequence: 'TCTAAAAAGCATGTAAAAGAAA', size: 553, temperature: 52, reference: 17 },
            { name: 'erm(A)-F', sequence: 'TCTAAAAAGCATGTAAAAGAAA', size: 553, temperature: 52, reference: 17 },
            { name: 'erm(A)-F', sequence: 'TCTAAAAAGCATGTAAAAGAAA', size: 553, temperature: 52, reference: 17 },
            { name: 'erm(A)-F', sequence: 'TCTAAAAAGCATGTAAAAGAAA', size: 553, temperature: 52, reference: 17 },
            { name: 'neki', sequence: 'TCTAAAAAGCATGTAAAAGAAA', size: 553, temperature: 52, reference: 17 },
            { name: 'erm(A)-F', sequence: 'TCTAAAAAGCATGTAAAAGAAA', size: 553, temperature: 52, reference: 17 },
            { name: 'erm(A)-F', sequence: 'TCTAAAAAGCATGTAAAAGAAA', size: 553, temperature: 52, reference: 17 }
        ],
    });

    return (
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}
