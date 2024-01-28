import axios from 'axios'

export default class UsersService {
    private static instance: UsersService;

    public static getInstance(): UsersService {
        if (!this.instance) {
            this.instance = new UsersService();
        }
        return this.instance;
    }

    private constructor(
    ) {
        console.log('this is a private constarutor');
    }

    public async create(params: any) {
        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL + '/user',
                params
            );
            return response;
        } catch (e) {
            throw e;
        }
    }
    public async update( id: any, params: any) {
        try {
            const response = await axios.put(
                process.env.NEXT_PUBLIC_BASE_URL + `/user/${id}`,
                params
            );
            return response;
        } catch (e) {
            throw e;
        }
    }

    public async listUsers(id?: any, cache?:any) {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_BASE_URL + `/user/${id}`, cache
            );
            return response;
        } catch (e) {
            throw e;
        }
    }


}