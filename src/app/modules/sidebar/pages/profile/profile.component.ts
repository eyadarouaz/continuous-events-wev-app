import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from "../../../../core/services/notification.service";
import { UserService } from "./../../../../core/services/user.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent implements OnInit{

    id = '';
    username = ''
    firstName = '';
    lastName = '';
    role = '';
    image='assets/images/default_profile_image.webp';
    comments = 0;
    likes = 0;

    editPhotoForm!: FormGroup;

    editInfoForm = new FormGroup({
      username: new FormControl('', Validators.required),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl(),
      mobile: new FormControl(),
    });

    editPwdForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });

    constructor(
      private userService: UserService,
      public dialog: MatDialog,
      private notificationService: NotificationService,
      private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
      this.userService.getProfile()
      .subscribe((res:any)=> {
        this.id = res.data.id;
        this.username = res.data.username;
        this.firstName = res.data.firstName;
        this.lastName = res.data.lastName;
        this.editInfoForm.setControl('username', new FormControl(res.data.username));
        this.editInfoForm.setControl('firstName', new FormControl(res.data.firstName));
        this.editInfoForm.setControl('lastName', new FormControl(res.data.lastName));
        const birthday = new Date(res.data.birthday);
        this.editInfoForm.setControl('birthday', new FormControl(birthday.getFullYear()+'-'+('0'+(birthday.getMonth()+1)).slice(-2)+'-'+ ('0'+birthday.getDate()).slice(-2)));
        this.editInfoForm.setControl('email', new FormControl(res.data.email));
        this.editInfoForm.setControl('mobile', new FormControl(res.data.mobile));
        if(res.data.profileImage)
          this.image = `http://localhost:3000/user/${this.id}/profile-photo`;   
      });
      this.editPhotoForm = this.formBuilder.group({image: ['']});
    }

    updateProfile(form: FormGroup) {
      const bday: Date = new Date(form.value.birthday);
      const data = {username: form.value.username, email: form.value.email, 
        firstName: form.value.firstName, lastName: form.value.lastName, mobile: form.value.mobile?.toString(),
        birthday: bday}
      return this.userService.updateProfile(data) 
      .subscribe(() => {
        this.notificationService.showSuccess('Profile updated successfully');
      });
    }

    changePassword(form: FormGroup) {
      return this.userService.changePassword(form.value.currentPassword, form.value.newPassword)
      .subscribe({next: () => {
        this.notificationService.showSuccess('Password changed successfully');
        form.reset()
      },
      error: () => {
        const element = document.getElementById('currentPwd');
        if (element)
        element.innerHTML = 'Incorrect password'
      }});
    }

    getRequiredError(control: string) {
      return this.editInfoForm.get(control)?.hasError('required');
    }

    getLengthError() {
      return this.editPwdForm.get('newPassword')?.hasError('minlength');
    }

    getEmailError() {
      return this.editInfoForm.get('email')?.hasError('email');
    }

    onFileSelect(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.editPhotoForm.get('image')?.setValue(file);
      }
    }

    submitPhoto() {
      const formData = new FormData();
      formData.append('image', this.editPhotoForm.get('image')?.value);
      this.userService.updatePhoto(formData)
      .subscribe(() => this.notificationService.showSuccess('Profile photo updated successfully'));
    }
    
  }