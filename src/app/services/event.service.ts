import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env} from "src/environment";
import { AuthService } from "./auth.service";


const ENDPOINT_URL = env.apiBaseUrl + 'event';

@Injectable({providedIn: "root"})
export class EventService {
    constructor(private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}

    getEvents() {
        return this.http.get(ENDPOINT_URL, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }
}