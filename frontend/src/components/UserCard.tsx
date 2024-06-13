import React from 'react';
import { Table, Button, Select } from 'antd';
import { EditOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserCard: React.FC = () => {
  const columns = [
    {
      title: 'Usuário',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, record: any) => (
        <span>
          <Button icon={record.status === 'ativo' ? <StopOutlined /> : <CheckCircleOutlined />} />
          <Button icon={<EditOutlined />} />
        </span>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      type: 'Administrador',
      status: 'ativo',
    },
    {
      key: '2',
      name: 'Jim Green',
      type: 'Usuário',
      status: 'inativo',
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Select mode="multiple" placeholder="Tipo de Usuário" className="mr-2">
          <Option value="administrador">Administrador</Option>
          <Option value="usuario">Usuário</Option>
        </Select>
        <Select mode="multiple" placeholder="Status" className="mr-2">
          <Option value="ativo">Ativo</Option>
          <Option value="inativo">Inativo</Option>
        </Select>
        <Button type="primary">Filtrar</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default UserCard;
