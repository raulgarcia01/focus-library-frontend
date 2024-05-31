/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { BookService } from '../../../../demo/service/BookService';

const BookMantto = () => {

    let emptyBook = {
        title: "",
        author: "",
        genre: "",
        publishedYear: 0,
        stock: 0,
        state: "ACTIVE"
    };

    const [books, setBooks] = useState([]);
    const [bookDialog, setBookDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [book, setBook] = useState(emptyBook);
    const toast = useRef(null);

    useEffect(() => {
        BookService.getAllBooks().then(data => setBooks(data));
    }, []);

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _book = { ...book };

        _book[`${name}`] = val;

        setBook(_book);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _book = { ...book };

        _book[`${name}`] = val;

        setBook(_book);
    };

    const onRoleChange = (e) => {
        let _book = { ...book };

        _book['role'] = e.value;
        setBook(_book);
    };

    const openNew = () => {
        setBook(emptyBook);
        setSubmitted(false);
        setBookDialog(true);
    };

    const openToUpdate = () => {
        if(selectedBook){
            setBook(selectedBook);
            setSubmitted(false);
            setBookDialog(true);
        }
    };

    const hideDialog = () => {
        setSubmitted(false);
        setBookDialog(false);
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < books.length; i++) {
            if (books[i]?.id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const saveBook = () => {
        setSubmitted(true);

        if (book.title.trim() && book.author.trim() 
            && book.genre.trim() && book.publishedYear
            && book.stock) {
            let _books = [...books];
            let _book = {...book};
            
            if(!book?.id){
                BookService.insertBooks(_book).then(data => {
                    if(data){
                        setBook(data);
                        _books.push(data);
                        setBooks(_books);
                        setBookDialog(false);
                        setBook(emptyBook);
                        toast.current.show({ severity: 'success', summary: 'Action', detail: 'Book Created', life: 3000 });
                    } else{
                        toast.current.show({ severity: 'error', summary: 'Wrong data entry', detail: 'Attempt to create a new Book', life: 3000 });
                    }
                });
            } else {
                BookService.updateBooks(_book).then(data => {
                    if(data){
                        setBook(data);
                        const index = findIndexById(_book.id);
                        _books[index] = _book;
                        setBooks(_books);
                        setBookDialog(false);
                        setBook(emptyBook);
                        toast.current.show({ severity: 'success', summary: 'Action', detail: 'Book Updated', life: 3000 });
                    } else{
                        toast.current.show({ severity: 'error', summary: 'Wrong data entry', detail: 'Attempt to update a new Book', life: 3000 });
                    }
                });
            }
        }
    };


    //-- Templates small pieces of code
    const header = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">Manage Books</h4>
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

    const bookDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveBook}/>
        </React.Fragment>
    );


    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={books} header={header} stripedRows scrollable scrollHeight="400px"
                        selectionMode='checkbox' selection={selectedBook} 
                        onSelectionChange={(e) => setSelectedBook(e.value)} dataKey="id" 
                        removableSort tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="Code"></Column>
                    <Column field="title" header="Title"></Column>
                    <Column field="publishedYear" header="Published Year"></Column>
                    <Column field="genre" header="Genre"></Column>
                    <Column field="stock" header="Stock"></Column>
                    <Column field="state" header="State"></Column>
                </DataTable>

                <Dialog visible={bookDialog} style={{ width: '40rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Book Information" modal className="p-fluid" footer={bookDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="title" className="font-bold">
                        Title
                        </label>
                        <InputText id="title" value={book.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !book.title })} />
                        {submitted && !book.title && <small className="p-error">First Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="author" className="font-bold">
                        Author
                        </label>
                        <InputText id="author" value={book.author} onChange={(e) => onInputChange(e, 'author')} required autoFocus className={classNames({ 'p-invalid': submitted && !book.author })} />
                        {submitted && !book.author && <small className="p-error">Last Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="genre" className="font-bold">
                        Genre
                        </label>
                        <InputText id="genre" value={book.genre} onChange={(e) => onInputChange(e, 'genre')} required autoFocus className={classNames({ 'p-invalid': submitted && !book.genre })} />
                        {submitted && !book.genre && <small className="p-error">Email Address is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="publishedYear" className="font-bold">
                        Published Year
                        </label>
                        <InputNumber id="publishedYear" value={book.publishedYear} useGrouping={false} onValueChange={(e) => onInputNumberChange(e, 'publishedYear')} required autoFocus className={classNames({ 'p-invalid': submitted && !book.publishedYear })} />
                        {submitted && !book.publishedYear && <small className="p-error">Username is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="stock" className="font-bold">
                        Stock
                        </label>
                        <InputNumber  id="stock" value={book.stock} onValueChange={(e) => onInputNumberChange(e, 'stock')} required autoFocus className={classNames({ 'p-invalid': submitted && !book.stock })} />
                        {submitted && !book.stock && <small className="p-error">Stock is required.</small>}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default BookMantto;
