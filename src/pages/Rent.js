import { Button, Table, Modal } from 'antd';
import { useState } from 'react';
import myData from './db.json';

export default function Rent(){
    const [isRenting, setIsRenting] = useState(false)
    const [rentingCustomer, setRentingCustomer] = useState(null)
    const [dataSourceVehicle, setDataSourceVehicle] = useState(myData.vehicle)
    const [dataSourceCustomer, setDataSourceCustomer] = useState(myData.customer)
    const [dataSourceRent, setDataSourceRent] = useState(myData.rent)
    
    
    const columnsRent =[
        {
          key: '1',
          title: 'Rented for days',
          dataIndex: 'days'
        },
        {
          key: '2',
          title: 'Vehicle Id',
          dataIndex: 'vehicle_id'
        },
        {
          key: '3',
          title: 'Customer Id',
          dataIndex: 'customer_id'
        },
        {
          key: '4',
          title: 'Price per day',
          render:(record)=>{
            var price = record.price
            if(record.days >= 3 && record.days < 5)
                price -= price * 0.05
            else if(record.days >= 5 && record.days < 10)
                price -= price * 0.07
            else if(record.days >= 10)
                price -= price * 0.1                
            return price;
          }
        }
      ];

    const columnsVehicle =[
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
        title: 'Price per day',
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
          <Button onClick={()=>{
            const newRent = {
                "days": parseInt(Math.random()*30) + 1,
                "vehicle_id": record.id,
                "customer_id": rentingCustomer.id,
                "price": record.price 
            }

            const editVehicle = {
                "id": record.id,
                "type": record.type,
                "number of seats": record['number of seats'],
                "price": record.price,
                "count": record.count -= 1
            }

            setDataSourceVehicle(pre=>{
                return pre.map(v =>{
                  if(v.id === record.id){
                    return editVehicle
                  }else{
                    return v;
                  }
                })
            })
            
            setDataSourceRent(pre=>{
                return[...pre, newRent]
            })

            // resetRenting();
          }}>
              Rent this car
          </Button>
          </>
        }
      }
    ];

    const columnsCustomer =[
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
              <Button onClick={()=>{
                onRentVehicle(record)
              }}>Rent a vehicle
              </Button>
              </>
            }
          }
    ];

    const onRentVehicle=(record)=>{
      setIsRenting(true);
      setRentingCustomer({...record});
    };
  
    
    const resetRenting=()=>{
      setIsRenting(false);
      setRentingCustomer(null);
    }
  
    return (
        <div>
            <Table columns={columnsCustomer} dataSource={dataSourceCustomer}></Table>
            <Modal title='Select a vehicle' visible={isRenting}
                onOk={()=>{
                    resetRenting();
                }}
                onCancel={()=>{
                    resetRenting();
                }}>
                <Table columns={columnsVehicle} dataSource={dataSourceVehicle}></Table>
            </Modal> 

            <Table columns={columnsRent} dataSource={dataSourceRent}></Table>
        </div>
    );
}