import React, { useState } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  AutoComplete,
} from 'antd';


// const originData = [
//   {
//     key: '000-000000',
//     type: 'SB',
//     manufacturer: 'HP',
//     model: 'Pro 6000',
//     serial: '1234567890',
//     inventory: '22-098765432',
//     year: 2012,
//     place: 230,
//   },
// ];
// let cols = {
//   id: 'ID',
//   key: 'УНО',
//   type: 'Тип',
//   manufacturer: 'Производитель',
//   model: 'Модель',
//   serial: 'SN',
//   inventory: 'Инв. номер',
//   year: 'Год',
//   place: 'Место',
// };
let type  = () {

}
// device: { manufacturer, model, year, place }, keys: { uno, serial, inventory }
let root = {
}

let range = { from: 123, to: 456 }
import models from './models'

let model = ["type": { "type": "string" } ]



let columns2 = [];
for (let i = 0; i < cols.length; i++) {
  columns.push({
    key: i,
    dataIndex: i,
    title: cols[i],
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  // const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  const inputNode = <AutoComplete options={} />;
  //inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      key: '',
      type: '',
      manufacturer: '',
      model: '',
      serial: '',
      inventory: '',
      year: '',
      place: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'key',
      dataIndex: 'key',
      width: '20%',
      editable: true,
    },
    {
      title: 'type',
      dataIndex: 'type',
      // width: '15%',
      editable: true,
      inputType: 'select',
      widget: 'select',
    },
    {
      title: 'manufacturer',
      dataIndex: 'manufacturer',
      // width: '20%',
      editable: true,
    },
    {
      title: 'model',
      dataIndex: 'model',
      // width: '20%',
      editable: true,
    },
    {
      title: 'serial',
      dataIndex: 'serial',
      // width: '10%',
      editable: true,
    },
    {
      title: 'inventory',
      dataIndex: 'inventory',
      // width: '10%',
      editable: true,
    },
    {
      title: 'year',
      dataIndex: 'year',
      // width: '10%',
      editable: true,
    },
    {
      title: 'place',
      dataIndex: 'place',
      // width: '10%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const getInputType = (col) => {
    col.dataIndex === 'year' ? 'number' : 'text';
    // col.dataIndex === 'type' ? 'select' : 'text';
    if (col.dataIndex === 'type') {
      console.log('select');
      // return ;
    }
    console.log(col);
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: getInputType(col),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

module.exports = EditableTable;
