export const BookRecordsService = {   

    async getAllBookRecords() {
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
    
};
