import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordComponent, LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { EditProfileComponent, ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddMemberComponent,DashboardComponent } from './components/dashboard/dashboard.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    EditProfileComponent,
    DashboardComponent,
    AddMemberComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
