/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BookService } from '../../../../demo/service/BookService';

const BookRecordMantto = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        BookService.getAllBooks().then(data => setProducts(data));
    }, []);

    return (
        <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Code"></Column>
                <Column field="title" header="Title"></Column>
                <Column field="publishedYear" header="Published Year"></Column>
                <Column field="genre" header="Genre"></Column>
                <Column field="stock" header="Stock"></Column>
                <Column field="state" header="State"></Column>
            </DataTable>
        </div>
    );
};

export default BookRecordMantto;
