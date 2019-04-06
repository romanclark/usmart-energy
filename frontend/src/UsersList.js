import  React, { Component } from  'react';
import  UsersService  from  './UsersService';

const  usersService  =  new  UsersService();

class  UsersList  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            users: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }

    componentDidMount() {
        var  self  =  this;
        usersService.getUsers().then(function (result) {
            self.setState({ users:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(e,user_id){
        var  self  =  this;
        usersService.deleteUser({user_id :  user_id}).then(()=>{
            var  newArr  =  self.state.users.filter(function(obj) {
                return  obj.user_id  !==  user_id;
            });
            self.setState({users:  newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        usersService.getUsersByURL(this.state.nextPageURL).then((result) => {
            self.setState({ users:  result.data, nextPageURL:  result.nextlink})
        });
    }

    // renders a table of users from the component state
    render() {

        return (
        <div  className="users--list">
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.users.map( u  =>
                    <tr  key={u.user_id}>
                        <td>{u.user_id}  </td>
                        <td>{u.first_name}</td>
                        <td>{u.last_name}</td>
                        <td>{u.email}</td>
                        <td>{u.address}</td>
                        <td>
                        <button  onClick={(e)=>  this.handleDelete(e,u.user_id) }> Delete</button>
                        <a  href={"/users/" + u.user_id}> Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
    }

}
export  default  UsersList;