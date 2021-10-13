import DataTable from 'react-data-table-component';

const SharedTable = ({data}) => {

    return (
        <DataTable
            columns={data.column}
            data={data.data}
            pagination
            fixedHeader
        />
    );
}
 
export default SharedTable;