/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useRef, use } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BookService } from '@/demo/service/BookService';
import { UserService } from '@/demo/service/UsersService';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { BookRecordsService } from '@/demo/service/BookRecordsService';

const BookRecordMantto = () => {

    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const toast = useRef(null);

    useEffect(() => {
        UserService.getAllUsers().then(data => setUsers(data));
    }, []);

    const checkStudentBooks = (user: any) => {
        setSelectedUser(user);
        BookRecordsService.checkOutActiveRecord(user.id).then(record => {
            const books = record.map(item => item.book);
            setBooks(books);
        }
    );
    };

    const returnProcess = () => {
        if(selectedBooks.length > 0){
            const bookIds = selectedBooks.map(book => book.id);
            const checkOutBody = {
                "userId": selectedUser.id,
                "booksId": bookIds
            };
            BookRecordsService.returnStudentBooks(checkOutBody).then(data => {
                if(!data?.message){
                    toast.current.show({ severity: 'success', summary: 'Process', detail: 'Return Sucessfully', life: 3000 });
                } else{
                    toast.current.show({ severity: 'error', summary: 'Return Error', detail: data?.message, life: 3000 });
                }
                BookRecordsService.checkOutActiveRecord(selectedUser.id).then(record => {
                    const _books = record.map(item => item.book);
                    setBooks(_books);
                });
            });
        }
    };

    //-- Templates small pieces of code
    const header = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">Borrowed books by : {selectedUser?.firstName} {selectedUser?.lastName}</h4>
            </div>
        );
    };

    const footer = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <Button label="Return Books" icon="pi pi-check" severity="help" onClick={returnProcess}/>
            </div>
        );
    };

    const selectedStudentTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.firstName} {option.lastName} </div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const studentOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.firstName} {option.lastName} </div>
            </div>
        );
    };

    const toolBarStartContent = () => {
        return (
            <div className="flex flex-wrap gap-1">
                <div className="flex align-items-left"><h5>Students: </h5></div>
            </div>
        );
    };

    const toolBarEndContent = () => {
        return (
            <div className="flex flex-wrap gap-1">
                <Dropdown value={selectedUser} onChange={(e) => checkStudentBooks(e.value)} options={users} optionLabel="students" placeholder="Select a Student" 
                filter valueTemplate={selectedStudentTemplate} itemTemplate={studentOptionTemplate} className="w-full md:w-14rem" />
            </div>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="filters">
                <Toolbar start={toolBarStartContent} end={toolBarEndContent} />
            </div>
            <div className="card">
                <DataTable value={books} header={header} footer={footer} stripedRows scrollable 
                    scrollHeight="400px" selectionMode='checkbox' 
                    selection={selectedBooks} onSelectionChange={(e) => setSelectedBooks(e.value)} 
                    dataKey="id" removableSort tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="Code" sortable></Column>
                    <Column field="title" header="Title" sortable></Column>
                    <Column field="author" header="Author" sortable></Column>
                    <Column field="publishedYear" header="Published Year" sortable></Column>
                    <Column field="genre" header="Genre" sortable></Column>
                    <Column field="state" header="State" sortable></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default BookRecordMantto;

