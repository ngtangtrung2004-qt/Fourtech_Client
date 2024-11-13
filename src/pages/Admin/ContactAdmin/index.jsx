import {Table } from "antd";
import { useState,useEffect } from "react";
import ReplyContact from "./replyModel";
import { formatDate } from "../../../config/formatDate";



function ContactAdmin() {
     const [dataContact,setDataContact] = useState([])
  useEffect(()=>{
    const fetchCategory = async ()=>{
      try{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`)
        const data = await res.json();
        const formatData = data.map((ct,index)=>({
          key:index+1 ,
          UserContact:ct.UserContact,
          EmailContact:ct.EmailContact,
          PhoneContact:ct.PhoneContact,
          messageContact:ct.messageContact,
          createdAt:ct.createdAt   
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
      title: "DateContact",
      dataIndex: "createdAt",
      render: (date) => formatDate(date),
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