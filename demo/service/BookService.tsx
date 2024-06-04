export const BookService = {   

    async getAllBooks(token: any) {
        try {
        const response = await fetch(`/api/books`, { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` } });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async insertBooks(data: any, token: any) {
        try {
        const response = await fetch(`/api/books`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data), });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async updateBooks(data: any, token: any) {
        try {
        const response = await fetch(`/api/books/${data.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data), });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async searchBooks(data: any, token: any) {
        try {
        const response = await fetch(`/api/books/search`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data), });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },
    
};
