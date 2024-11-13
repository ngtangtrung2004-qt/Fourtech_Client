import {Table } from "antd";
import { useState,useEffect } from "react";
import ReplyContact from "./replyModel";



function ContactAdmin() {
     const [dataContact,setDataContact] = useState([])
  useEffect(()=>{
    const fetchCategory = async ()=>{
      try{
        const res = await fetch('http://localhost:6060/api/contact')
        const data = await res.json();
        const formatData = data.map((ct,index)=>({
          key:index+1 ,
          UserContact:ct.UserContact,
          EmailContact:ct.EmailContact,
          PhoneContact:ct.PhoneContact,
          messageContact:ct.messageContact
        }))
        setDataContact(formatData)

      }catch(error){
        console.error('error fetching products:', error)
      }
    }
    fetchCategory()
  },[])
     const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "UserContact",
      dataIndex: "UserContact",
    },{
      title: "EmailContact",
      dataIndex: "EmailContact",
    },
    {
      title: "PhoneContact",
      dataIndex: "PhoneContact",
    },
    {
      title: "message",
      dataIndex: "messageContact",
    },
    
    {
      title: "Action",
      render: (text, record) => (
        <span className="action-product">
          <ReplyContact EmailContact={record.EmailContact}></ReplyContact>
        </span>
      ),
    },
  ];
    return ( <>
    <div className="add-product">
      </div>
      <Table columns={columns} dataSource={dataContact} pagination={false} />
    </> );
}

export default ContactAdmin;