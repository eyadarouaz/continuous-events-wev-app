import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env} from "src/environment";
import { AuthService } from "./auth.service";

const ENDPOINT_URL = env.apiBaseUrl + 'user';

@Injectable({providedIn: "root"})
export class UserService {
    
    constructor(private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}

    getUsers() {
        return this.http.get(ENDPOINT_URL, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }    

    addUser(data: any) {
        return this.http.post(ENDPOINT_URL, data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }

    deleteUser(id: number) {
        return this.http.delete(ENDPOINT_URL + `/${id}`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }

    getProfile() {
        return this.http.get(ENDPOINT_URL + '/my-profile', {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    updateProfile(data: any) {
        return this.http.put(ENDPOINT_URL + '/edit-profile', data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }

}