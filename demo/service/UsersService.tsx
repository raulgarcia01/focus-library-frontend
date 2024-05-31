export const UserService = {   

    async getAllUsers() {
        try {
        const response = await fetch(`/api/users`, { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache' } });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },


    async insertUsers(data: any) {
        try {
        const response = await fetch(`/api/users`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }, body: JSON.stringify(data), });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },

    async updateUsers(data: any) {
        try {
        const response = await fetch(`/api/users/${data.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }, body: JSON.stringify(data), });
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return await response.json();
        } catch(error){
            console.error('Error feching data: ', error);
        }
    },
    
};
