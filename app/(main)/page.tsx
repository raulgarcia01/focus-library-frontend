/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BookService } from '@/demo/service/BookService';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { BookRecordsService } from '@/demo/service/BookRecordsService';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

const Dashboard = () => {

    const [filter, setFilter] = useState("1");
    const [filterValue, setFilterValue] = useState("");
    const [books, setBooks] = useState([]);
    const [checkOutBooks, setCheckOutBooks] = useState([]);
    const [sessionUser, setSessionUser] = useState('');
    const [selectedBooks, setSelectedBooks] = useState([]);
    const toast = useRef(null);
    const router = useRouter();
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }
        try {
            const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
            const decoded = jwt.verify(token, secret.toString('utf-8'));
            setSessionUser(decoded?.sub);
            BookRecordsService.checkOutActiveRecord(decoded?.sub, token).then(record => {
                const books = record.map(item => item.book);
                setCheckOutBooks(books);
                }
            );
          } catch (error) {
            console.log(error);
            router.push('/auth/login');
            return;
          }
    }, [router]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        BookService.getAllBooks(token).then(data => setBooks(data));
    }, []);

    const checkOutProcess = () => {
        const token = localStorage.getItem('token');
        if(selectedBooks.length > 0){
            const bookIds = selectedBooks.map(book => book.id);
            const checkOutBody = {
                "userId": sessionUser,
                "booksId": bookIds
            };
            BookRecordsService.checkOutStudentBooks(checkOutBody, token).then(data => {
                if(!data?.message){
                    toast.current.show({ severity: 'success', summary: 'Process', detail: 'Check Out Sucessfully', life: 3000 });
                } else{
                    toast.current.show({ severity: 'error', summary: 'Check Out Error', detail: data?.message, life: 3000 });
                }
                BookService.getAllBooks(token).then(data => setBooks(data));
                BookRecordsService.checkOutActiveRecord(sessionUser, token).then(record => {
                    const books = record.map(item => item.book);
                    setCheckOutBooks(books);
                    }
                );
            });
        }
    };

    const filterProcess = () => {
        const token = localStorage.getItem('token');
        if(filterValue.length > 0){
            let _filterBody = {};
            if(filter === "1"){
                _filterBody = { "title": filterValue };
            } else if(filter === "2"){
                _filterBody = { "author": filterValue };
            } else {
                _filterBody = { "genre": filterValue };
            }
            BookService.searchBooks(_filterBody,token).then(data => setBooks(data));
        } else {
            BookService.getAllBooks(token).then(data => setBooks(data));
        }
    };

    //-- Templates small pieces of code
    const header = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">List of available books</h4>
            </div>
        );
    };
    
    const activeHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">Books borrowed: </h4>
            </div>
        );
    };

    const footer = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <Button label="Checkout Books" icon="pi pi-check" severity="help" onClick={checkOutProcess}/>
            </div>
        );
    };

    const toolBarStartContent = () => {
        return (
            <div className="flex flex-wrap gap-4">
                <div className="flex align-items-left"><h5>Filters: </h5></div>
                <div className="flex align-items-center">
                    <RadioButton inputId="filter1" name="title" value="1" onChange={(e) => setFilter(e.value)} checked={filter === "1"} />
                    <label htmlFor="filter1" className="ml-2">Title</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="filter2" name="author" value="2" onChange={(e) => setFilter(e.value)} checked={filter === "2"} />
                    <label htmlFor="filter2" className="ml-2">Author</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="filter3" name="genre" value="3" onChange={(e) => setFilter(e.value)} checked={filter === "3"} />
                    <label htmlFor="filter3" className="ml-2">Genre</label>
                </div>
            </div>
        );
    };

    const toolBarEndContent = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <div className="flex align-items-center">
                    <InputText type="filtertext" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} placeholder="Search criteria" />
                </div>
                <div className="flex align-items-center">
                    <Button label="Filter" icon="pi pi-filter" severity="help" onClick={filterProcess}/>
                </div>
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
                    <Column field="stock" header="Stock" sortable></Column>
                    <Column field="state" header="State" sortable></Column>
                </DataTable>
            </div>            
            <div className="card">
                <DataTable value={checkOutBooks} header={activeHeader} stripedRows scrollable 
                    scrollHeight="400px" dataKey="id" removableSort tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="Code" sortable></Column>
                    <Column field="title" header="Title" sortable></Column>
                    <Column field="author" header="Author" sortable></Column>
                    <Column field="publishedYear" header="Published Year" sortable></Column>
                    <Column field="genre" header="Genre" sortable></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default Dashboard;
