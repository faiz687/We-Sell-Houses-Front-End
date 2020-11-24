import React from 'react';
import { Card } from 'antd';
import { Form, Input, Button , Upload  } from 'antd';
import { Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { status, json } from '../utilities/requestHandlers';
import HouseCategory from './HouseCategory';
import HouseFormFeatures from './HouseFormFeatures';
// import UserContext from '../Contexts/User';


const normFile = e => { 
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const Rules=[{ required: true, message: 'Incomplete Field' }]

const layout = { labelCol : { span: 4 } ,  wrapperCol : { span: 15 }, };
  
class RegisterHouse extends React.Component { 
  
  constructor(props) {
    super(props)
    this.formRef = React.createRef();
    this.onFinish = this.onFinish.bind(this);
    this.OnCategoryChange = this.OnCategoryChange.bind(this);
    this.CheckFeatures = this.CheckFeatures.bind(this);
  }
  
  OnCategoryChange = value => {
    console.log(value)
    this.formRef.current.setFieldsValue({ Category : value});    
  }

  CheckFeatures = async (_, HouseFeatures) => {
    if (!HouseFeatures || HouseFeatures.length < 2){
      return Promise.reject(new Error('At least 2 Features'));
    }
    
    
    
    
  }

  onFinish = values => { 
    console.log(values)
    
    
//     const {email, password} = values;
//      fetch('https://round-job-8000.codio-box.uk/api/v1/users/Login', {
//             method: "POST",
//             headers: {
//                 "Authorization": "Basic " + btoa(email + ":" + password)
//             }        
//         })
//     .then(status)
//     .then(json)
//     .then(user => {
//         console.log('Logged in successfully');
//         console.log(user);
//         this.context.login(user);
//     })
//     .catch(error => {
//          console.log(error)
//         // TODO: show nicely formatted error message
//         console.log('Login failed');
//     });    
    };
  
  render() {
    return (
        <Card title="Register House" className={"CardClass"} >
          <Form {...layout} ref={this.formRef}  className={"RegisterPropertyClass"}  name="basic" size="middle"  initialValues={{ remember: true }}  onFinish={this.onFinish} >
            <Form.Item label="House Title" rules={Rules}  name="title" ><Input /></Form.Item>
            <Form.Item name="description" rules={Rules} label="Describe House"><Input.TextArea style={{ height:"7em"}} /></Form.Item>
            <Form.Item label="Category" rules={Rules} name="Category" >
              <HouseCategory OnChange={this.OnCategoryChange}/>
            </Form.Item>
            <HouseFormFeatures/>
            <Form.Item name="offerprice" rules={Rules} label="Asking Price"><Input /></Form.Item>
            <Form.Item name="location"  rules={Rules} label="Location"><Input /></Form.Item>
            <Form.Item name="underoffer"  rules={Rules}label="Under Offer" valuePropName="checked" ><Checkbox/></Form.Item>
            <Form.Item name="hightpriority"  rules={Rules}label="High Priority" valuePropName="checked" ><Checkbox/></Form.Item>
            <Form.Item name="upload" rules={Rules}label="Upload Image" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload name="logo" action="/upload.do" listType="picture">
                 <Button>Click to upload</Button>
              </Upload>
           </Form.Item>
            <Form.Item className={"SubmitButton"}>
              <Button type="primary" htmlType="submit" style={{fontWeight:"500"}}>Add House</Button>
            </Form.Item>
          </Form>
        </Card>
     );
  }
}

export default RegisterHouse;