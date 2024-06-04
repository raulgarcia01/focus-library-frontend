export const BookRecordsService = {   

    async checkOutStudentBooks(data: any) {
        try {
            const response = await fetch(`/api/book-records/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }, body: JSON.stringify(data), });
            return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async returnStudentBooks(data: any) {
        try {
            const response = await fetch(`/api/book-records/return`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }, body: JSON.stringify(data), });
            return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async checkOutActiveRecord(userId: string) {
        try {
        const response = await fetch(`/api/book-records/checked-out/records/${userId}`, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },
    
};
