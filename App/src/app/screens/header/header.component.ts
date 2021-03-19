import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Event, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Page, pagesArray } from '../../shared/page.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    currentUrl = '';

    get isLoggedIn(): boolean {
        return this.authService.isAuthenticated();
    }

    get page(): Page {
        return this.currentUrl ? pagesArray().find(page => page.url === this.currentUrl) : null;
    }

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {
        this.router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            this.currentUrl = routerEvent.url;
        } else if (routerEvent instanceof NavigationEnd) {
            if (routerEvent.urlAfterRedirects) {
                this.currentUrl = routerEvent.urlAfterRedirects;
            } else {
                this.currentUrl = routerEvent.url;
            }
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('login');
    }
}
