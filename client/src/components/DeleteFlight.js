import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Button, Popconfirm } from 'antd';

export default function DeleteFlight (){

  function handlerr(e)  {
    e.preventDefault()
    //const objectId = mongoose.Types.ObjectId("619d2081e14be00bceb61741");
  //  axios({
  //       method: 'post',
  //       url: 'https://localhost:3001/admin/deleteFlight',
  //       data: {
  //        id : "619d2081e14be00bceb61741"
  //       }
  //     }).then((res)=>{
  //         console.log(res)
  //         console.log("flight deleted")

  //     }).catch((err)=>{
  //         console.log(err)
  //         console.log("couldn't update flight")

  //     })

      axios({
        method: 'POST',
        url: 'http://localhost:3001/admin/deleteFlight',
        data: {
          id : "619d2040e14be00bceb6173f"
        }
      }).then((res)=>{
        console.log(res)
        console.log("flight deleted")

    }).catch((err)=>{
        console.log(err)
        console.log("couldn't update flight")

    });
  };
  
 
    


      return (
        //   <div>
        //   <Popconfirm onConfirm={handlerr()} title="Are you sure you want to cancel this flight？" okText="Yes"  cancelText="No">
        //     <Button>Delete</Button>
        //     </Popconfirm>
        //     </div>
           
               <div>
               <Popconfirm title="Are you sure you want to delete this flight?" onConfirm={(e)=>{handlerr(e)}} okText="Yes" cancelText="No">
                  <a href="#">Delete</a>
                </Popconfirm>
                </div>
      )


    
     
}