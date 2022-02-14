import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import {
  Typography,
  Table,
  Layout,
  Space,
  Button,
  Grid,
  PageHeader,
  Input,
  InputNumber,
  Select,
  Form,
  AutoComplete,
  Upload,
  List,
  Grid,
} from 'antd';
import useSWR from 'swr';
import FormBuilder from 'antd-form-builder';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const { Sidebar, Header, Content, Footer } = Layout;
import swr from 'swr';
const {} = List;

const { Paragraph } = Typography;

const createColumns = async (config) => {
  return Object.keys(config).map((i, key) => {
    const column = { key, dataIndex: i, title: columns[i] };
    console.log(column);
    return column;
  });
};

import {
  writeStorage,
  deleteFromStorage,
  useLocalStorage,
} from '@rehooks/local-storage';

// const apiData = useSWR();
class App extends Component {
  constructor() {
    super();
    this.columns = {
      id: 'ID',
      key: 'УНО',
      type: 'Тип',
      manufacturer: 'Производитель',
      model: 'Модель',
      serial: 'SN',
      inventory: 'Инв. номер',
      year: 'Год',
      place: 'Место',
    };
    this.settings = [];
    this.state = {
      columns: [],
      dataSource: [],
    };
  }

  cols = '';

  handleUpdate(data) {
    console.log(data);
  }

  handleSave() {
    //  writeStorage('name', 'Homer Simpson'); // Add an item first
    // deleteFromStorage('name'); // Deletes the item
    // const thisIsNull = localStorage.getItem('name'); // This is indeed null
  }

  handleImport() {}

  handleExport() {}

  handleSearch() {}

  componentWillUpdate() {
    console.log('update');
  }
  render() {
    // let cols = createColumns(columns)
    // columns.map((i) => {
    //   console.log(columns);
    //   return { key: i, dataIndex: 1, title: this.columns[i] };
    // });

    return (
      <Layout>
        <Header></Header>
        <Form>
          <PageHeader title={<Input />} extra={<Button>+</Button>} />
        </Form>
        <Content>
          <Table
            columns={[
              { key: 1, title: 1 },
              { key: 2, title: 2 },
              { key: 3, title: 3 },
              { key: 4, title: 4 },
              { key: 5, title: 5 },
              { key: 6, title: 6 },
              {
                key: 7,
                title: 7,
                type: '',
                onRow: (data) => {
                  console.log(data);
                  return '1';
                },
              },
            ]}
          ></Table>
        </Content>

        <Footer>
          <h3>Config</h3>
        </Footer>
      </Layout>
    );
  }
}

render(<App />, document.getElementById('root'));
