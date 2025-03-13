import {Table} from 'antd'

const { Column, ColumnGroup } = Table;
export default function App(){
    return(
        <div>
            <Table   style={{ width: "70vw" }}>
                <Column title="Name" dataIndex="name" key="name" />
            </Table>
        </div>
    )
}