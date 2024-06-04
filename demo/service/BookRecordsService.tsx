export const BookRecordsService = {   

    async checkOutStudentBooks(data: any, token: any) {
        try {
            const response = await fetch(`/api/book-records/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data), });
            return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async returnStudentBooks(data: any, token: any) {
        try {
            const response = await fetch(`/api/book-records/return`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data), });
            return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async checkOutActiveRecord(userId: string, token: any) {
        try {
        const response = await fetch(`/api/book-records/checked-out/records/${userId}`, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` } });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },
    
};
