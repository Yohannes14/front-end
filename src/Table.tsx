import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import { deleteExcelDataApi, updateExcelDataApi } from "./redux/features/api";
import { useDispatch } from "react-redux";

interface Item {
  key: string;
  item_No: string;
  description: string;
  qty: string;
  rate: string;
  amount: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  action: boolean;
  dataIndex: string;
  title: any;
  inputType: "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  action,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;

  return (
    <td {...restProps}>
      {action ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface TablesProps {
  jsonData: any; //
}
const Tables: React.FC<TablesProps> = ({ jsonData }) => {
  const [data, setData] = useState<Item[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const originData: Item[] = [];

    for (let i = 0; i < jsonData.length; i++) {
      const data: Item = {
        key: jsonData[i].id,
        item_No: jsonData[i].item_No,
        description: jsonData[i].description,
        qty: jsonData[i].qty,
        rate: jsonData[i].rate,
        amount: jsonData[i].amount,
      };
      originData.push(data);
    }

    setData(originData);
  }, [jsonData]);
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState("");

  const isAction = (record: Item) => record.key === editingKey;

  /// Delete
  const deleteHandle = (record: Partial<Item> & { key: React.Key }) => {
    deleteExcelDataApi(dispatch, Number(record.key));
    const filterItem = data.filter((item) => item.key !== record.key);
    setData([...filterItem]);
  };

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      item_No: "",
      description: "",
      qty: "",
      rate: "",
      amount: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        /// updated
        updateExcelDataApi(dispatch, Number(item.key), row);
        setData([...newData]);
        setEditingKey("");
      } else {
        newData.push(row);
        setData([...newData]);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Item No",
      width: "10%",
      dataIndex: "item_No",
      editable: true,
    },

    {
      title: "Description",
      width: "20%",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      editable: true,
      sorter: (a:Item, b:Item) => Number(a.qty) - Number(b.qty),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      editable: true,
      sorter: (a:Item, b:Item) => Number(a.rate) - Number(b.rate),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      editable: true,
      sorter: (a:Item, b:Item) => Number(a.amount) - Number(b.amount),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Item) => {
        const editable = isAction(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Button
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              type="primary"
              block
            >
              Edit
            </Button>

            <Button onClick={() => deleteHandle(record)} type="primary" danger>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "text",
        dataIndex: col.dataIndex,
        title: col.title,
        action: isAction(record),
      }),
    };
  });
  const onChange: TableProps<Item>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

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
        pagination={{
          onChange: cancel,
        }}
        onChange={onChange}
      />
    </Form>
  );
};

export default Tables;
