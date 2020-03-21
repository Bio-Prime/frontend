import React from "react";
import MUIDataTable from "mui-datatables";

export default function DataTable({data, columns, options}) {

    return(
        <MUIDataTable
            title={"Oligonucleotide Primers"}
            data={data}
            columns={columns}
            options={options}
        />
    )

}
