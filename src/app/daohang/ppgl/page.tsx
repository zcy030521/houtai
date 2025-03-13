import {Table} from 'antd'
const { Column, ColumnGroup } = Table;
export default function App(){
    return (
        <div>
            <Table   style={{ width: "70vw" }}>
                <Column title="姓名" dataIndex="name" key="_id"></Column>
            </Table>
        </div>
    )
}