import { Button, Table, Modal, Input } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import myData from './db.json';

export default function Customer(){
    const [isEditing, setIsEditing] = useState(false)
    const [editingValue, setEditing] = useState(null)
    const [dataSource, setDataSource] = useState(myData.customer)
    
    const columns =[
      {
        key: '1',
        title: 'ID',
        dataIndex: 'id'
      },
      {
        key: '2',
        title: 'Name',
        dataIndex: 'name'
      },
      {
        key: '3',
        title: 'Email',
        dataIndex: 'email'
      },
      {
        key: '4',
        title: 'Phone',
        dataIndex: 'phone'
      },
      {
        key: '5',
        title: 'Action',
        render:(record)=>{
          return <>
          <EditOutlined onClick={()=>{
            onEdit(record)
          }}/>
          <DeleteOutlined onClick={()=>{
            onDelete(record)
          }}/>
          </>
        }
      }
    ];
  
    const onAdd=()=>{
      const newVehicle = {
        "id": parseInt(Math.random()*100),
        "name": "RandomName" + parseInt(Math.random()*100),
        "email": parseInt(Math.random()*69) + "@abv.bg",
        "phone": parseInt(Math.random()*123456) + 1,
      }
      setDataSource(pre=>{
        return[...pre, newVehicle]
      })
    };
  
    const onEdit=(record)=>{
      setIsEditing(true);
      setEditing({...record});
    };
  
    
    const resetEditing=()=>{
      setIsEditing(false);
      setEditing(null);
    }
  
    const onDelete=(record)=>{
      setDataSource((pre)=>{
        return pre.filter((value) => value.id !== record.id);
      })
    };
    
    return (
        <div>
            <Button onClick={onAdd}>Add a new value</Button>
            <Table columns={columns} dataSource={dataSource}></Table>
            <Modal 
            title='Edit value' 
            visible={isEditing} 
            onCancel={()=>{
                resetEditing();
            }}
            onOk={()=>{
                setDataSource(pre=>{
                return pre.map(value=>{
                    if(value.id === editingValue.id){
                    return editingValue
                    }else{
                    return value;
                    }
                })
                })
                resetEditing();
            }}>
                <Input value={editingValue?.name} onChange={(e)=>{
                    setEditing(pre=>{
                    return{...pre, name: e.target.value};
                    });
                }}/>
                <Input value={editingValue?.email} onChange={(e)=>{
                    setEditing(pre=>{
                    return{...pre, email: e.target.value};
                    });
                }}/>
                <Input value={editingValue?.phone} onChange={(e)=>{
                    setEditing(pre=>{
                    return{...pre, phone: e.target.value};
                    });
                }}/>
            </Modal> 
        </div>
    );
}