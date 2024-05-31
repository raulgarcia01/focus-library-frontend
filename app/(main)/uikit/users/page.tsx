/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { UserService } from '../../../../demo/service/UsersService';

const UserMantto = () => {

    let emptyUser = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        role: "Student",
        state: "ACTIVE"
    };

    const [users, setUsers] = useState([]);
    const [userDialog, setUserDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [user, setUser] = useState(emptyUser);
    const toast = useRef(null);

    useEffect(() => {
        UserService.getAllUsers().then(data => setUsers(data));
    }, []);

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };

        _user[`${name}`] = val;

        setUser(_user);
    };

    const onRoleChange = (e) => {
        let _user = { ...user };

        _user['role'] = e.value;
        setUser(_user);
    };

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const openToUpdate = () => {
        if(selectedUser){
            setUser(selectedUser);
            setSubmitted(false);
            setUserDialog(true);
        }
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < users.length; i++) {
            if (users[i]?.id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const saveUser = () => {
        setSubmitted(true);

        if (user.username.trim() && user.password.trim() 
            && user.firstName.trim() && user.lastName.trim()
            && user.email.trim() && user.role.trim()) {
            let _users = [...users];
            let _user = {...user};
            
            if(!user?.id){
                UserService.insertUsers(_user).then(data => {
                    if(data){
                        setUser(data);
                        _users.push(data);
                        setUsers(_users);
                        setUserDialog(false);
                        setUser(emptyUser);
                        toast.current.show({ severity: 'success', summary: 'Action', detail: 'User Created', life: 3000 });
                    } else{
                        toast.current.show({ severity: 'error', summary: 'Wrong data entry', detail: 'Attempt to create a new User', life: 3000 });
                    }
                });
            } else {
                UserService.updateUsers(_user).then(data => {
                    if(data){
                        setUser(data);
                        const index = findIndexById(_user.id);
                        _users[index] = _user;
                        setUsers(_users);
                        setUserDialog(false);
                        setUser(emptyUser);
                        toast.current.show({ severity: 'success', summary: 'Action', detail: 'User Updated', life: 3000 });
                    } else{
                        toast.current.show({ severity: 'error', summary: 'Wrong data entry', detail: 'Attempt to update a new User', life: 3000 });
                    }
                });
            }
        }
    };


    //-- Templates small pieces of code
    const header = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">Manage Users</h4>
            </div>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew}/>
                <Button label="Update" icon="pi pi-pencil" severity="info" onClick={openToUpdate}/>
            </div>
        );
    };

    const userDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveUser}/>
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={users} header={header} stripedRows scrollable scrollHeight="400px"
                        selectionMode='checkbox' selection={selectedUser} 
                        onSelectionChange={(e) => setSelectedUser(e.value)} dataKey="id" 
                        removableSort tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="Code" sortable ></Column>
                    <Column field="username" header="User Name" sortable ></Column>
                    <Column field="firstName" header="First Name" sortable ></Column>
                    <Column field="lastName" header="Last Name" sortable ></Column>
                    <Column field="email" header="Email" sortable ></Column>
                    <Column field="role" header="Role" sortable ></Column>
                    <Column field="state" header="State" sortable ></Column>
                </DataTable>

                <Dialog visible={userDialog} style={{ width: '40rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="User Information" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="firstName" className="font-bold">
                        First Name
                        </label>
                        <InputText id="firstName" value={user.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.firstName })} />
                        {submitted && !user.firstName && <small className="p-error">First Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="lastName" className="font-bold">
                        Last Name
                        </label>
                        <InputText id="lastName" value={user.lastName} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.lastName })} />
                        {submitted && !user.lastName && <small className="p-error">Last Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="email" className="font-bold">
                        Email Address
                        </label>
                        <InputText id="email" value={user.email} keyfilter="email" onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                        {submitted && !user.email && <small className="p-error">Email Address is required.</small>}
                    </div>
                    <Divider align="center">
                        <span className="p-tag">Settings</span>
                    </Divider>
                    <div className="field">
                        <label htmlFor="username" className="font-bold">
                        Username
                        </label>
                        <InputText id="username" value={user.username} onChange={(e) => onInputChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.username })} />
                        {submitted && !user.username && <small className="p-error">Username is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="password" className="font-bold">
                        Password
                        </label>
                        <Password  id="password" value={user.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.password })} />
                        {submitted && !user.password && <small className="p-error">Password is required.</small>}
                    </div>

                    <div className="field">
                        <label className="mb-3 font-bold">Roles</label>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="role1" name="role" value="Student" onChange={onRoleChange} checked={user.role === 'Student'} />
                                <label htmlFor="role1">Student</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="role2" name="role" value="Librarian" onChange={onRoleChange} checked={user.role === 'Librarian'}  />
                                <label htmlFor="role2">Librarian</label>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
        
    );
};

export default UserMantto;
