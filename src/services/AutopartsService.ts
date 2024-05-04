import $api from "../http";
import { AxiosResponse } from "axios";
import { AutopartsResponse } from "../models/response/AutopartsResponse";

export default class AutopartService {
    static async getAllAutoparts(): Promise<AxiosResponse<AutopartsResponse[]>> {
        return $api.get<AutopartsResponse[]>('/autoparts');
    }
    static async getAutopartById(autopartId: string): Promise<AxiosResponse<AutopartsResponse[]>> {
        return $api.post<AutopartsResponse[]>('autoparts/:id', {autopartId});
    }
    static async makeNewOrder(login: string, autoparts: string[]): Promise<AxiosResponse<AutopartsResponse[]>> {
        return $api.post<AutopartsResponse[]>('/autoparts/new', {autoparts, login});
    }
}