import { Button, Table, Modal, Input } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import myData from './db.json';

export default function Vehicle(){
    const [isEditing, setIsEditing] = useState(false)
    const [editingVehicle, setEditingVehicle] = useState(null)
    const [dataSource, setDataSource] = useState(myData.vehicle)
    
    const columns =[
      {
        key: '1',
        title: 'ID',
        dataIndex: 'id'
      },
      {
        key: '2',
        title: 'Type',
        dataIndex: 'type'
      },
      {
        key: '3',
        title: 'Number of seats',
        dataIndex: 'number of seats'
      },
      {
        key: '4',
        title: 'Price',
        dataIndex: 'price'
      },
      {
        key: '5',
        title: 'Count',
        dataIndex: 'count'
      },
      {
        key: '6',
        title: 'Action',
        render:(record)=>{
          return <>
          <EditOutlined onClick={()=>{
            onEditVehicle(record)
          }}/>
          <DeleteOutlined onClick={()=>{
            onDeleteVehicle(record)
          }}/>
          </>
        }
      }
    ];
  
    const onAddVehicle=()=>{
      const newVehicle = {
        "id": parseInt(Math.random()*100),
        "type": "common",
        "number of seats": parseInt(Math.random()*6) + 1,
        "price": parseInt(Math.random()*50),
        "count": parseInt(Math.random()*10),
      }
      setDataSource(pre=>{
        return[...pre, newVehicle]
      })
    };
  
    const onEditVehicle=(record)=>{
      setIsEditing(true);
      setEditingVehicle({...record});
    };
  
    
    const resetEditing=()=>{
      setIsEditing(false);
      setEditingVehicle(null);
    }
  
    const onDeleteVehicle=(record)=>{
      setDataSource((pre)=>{
        return pre.filter((vehicle) => vehicle.id !== record.id);
      })
    };
    return (
        <div>
            <Button onClick={onAddVehicle}>Add a new vehicle</Button>
            <Table columns={columns} dataSource={dataSource}></Table>
            <Modal 
            title='Edit Vehicle' 
            visible={isEditing} 
            onCancel={()=>{
                resetEditing();
            }}
            onOk={()=>{
                setDataSource(pre=>{
                return pre.map(vehicle=>{
                    if(vehicle.id === editingVehicle.id){
                    return editingVehicle
                    }else{
                    return vehicle;
                    }
                })
                })
                resetEditing();
            }}>
                <Input value={editingVehicle?.type} onChange={(e)=>{
                    setEditingVehicle(pre=>{
                    return{...pre, type: e.target.value};
                    });
                }}/>
                <Input value={editingVehicle?.price} onChange={(e)=>{
                    setEditingVehicle(pre=>{
                    return{...pre, price: e.target.value};
                    });
                }}/>
                <Input value={editingVehicle?.count} onChange={(e)=>{
                    setEditingVehicle(pre=>{
                    return{...pre, count: e.target.value};
                    });
                }}/>
            </Modal> 
        </div>
    );
}