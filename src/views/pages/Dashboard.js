import React from 'react';
import DataTable from "../../components/DataTable";

export default function Dashboard() {

    const columns =
        [
            "Name", "Sequence", "Orientation", "Location in lab", "Position in the reference", "Tm (°C)", "Optimal T of annealing (°C)",
            "Purification method", "Amount available", "Date", "Length of amplicone", "Storing T (°C)", "GC%", "Organism", "Gen", "Designer (name and surname)",
            "5' modification", "3' modification", "Manufacturer", "Supplier", "Type of primer", "Human genom build", "NCBI gen ID",
            "Did you check specificity in blast?", "Formulation", "Application", "Project", "If TaqMan: sonda sequence", "Ordered by",
            "Comment", "Analysis"
        ];

    const data = [
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],

    ];

    const options = {
        filterType: 'checkbox',
    };

    return (
        <DataTable columns={columns} data={data} options={options}/>
    );

}
