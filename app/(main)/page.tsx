/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BookService } from '@/demo/service/BookService';
import { UserService } from '@/demo/service/UsersService';

import { Button } from 'primereact/button';

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);

    useEffect(() => {
        BookService.getAllBooks().then(data => setBooks(data));
    }, []);

    useEffect(() => {
        UserService.getAllUsers().then(data => setUsers(data));
    }, []);

    const checkOutProcess = () => {
        if(selectedBooks.length > 0){
            console.log(selectedBooks);
            console.log(users[0]);
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

    const footer = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <Button label="Checkout Books" icon="pi pi-check" severity="help" onClick={checkOutProcess}/>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={books} header={header} footer={footer} stripedRows scrollable 
                scrollHeight="400px" selectionMode='checkbox' 
                selection={selectedBooks} onSelectionChange={(e) => setSelectedBooks(e.value)} 
                dataKey="id" removableSort tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="id" header="Code" sortable></Column>
                <Column field="title" header="Title" sortable></Column>
                <Column field="publishedYear" header="Published Year" sortable></Column>
                <Column field="genre" header="Genre" sortable></Column>
                <Column field="stock" header="Stock" sortable></Column>
                <Column field="state" header="State" sortable></Column>
            </DataTable>
        </div>
    );
};

export default Dashboard;
