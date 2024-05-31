export const BookService = {   

    async getAllBooks() {
        try {
        const response = await fetch(`/api/books`, { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache' } });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async insertBooks(data: any) {
        try {
        const response = await fetch(`/api/books`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }, body: JSON.stringify(data), });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async updateBooks(data: any) {
        try {
        const response = await fetch(`/api/books/${data.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }, body: JSON.stringify(data), });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },
    
};
