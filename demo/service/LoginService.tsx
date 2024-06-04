export const LoginService = {   

    async login(data: any) {
        try {
            const response = await fetch(`/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }, body: JSON.stringify(data), });
            return await response.json();
        } catch(error){
            console.error('Error login data: ', error);
        }
    },
}