import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginModule } from '../../models/login/login.module';
import { EmailModule } from '../../models/email/email.module';
import { UploadDataModule } from '../../models/upload-data/upload-data.module';
import { SmsModule } from '../../models/sms/sms.module';
import { CustomerlistModule } from '../../models/customerlist/customerlist.module';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  API_URL = environment.API_URL + 'api';
  API_URL2 = environment.API_URL;

  loginUser(data: LoginModule): Observable<any>{
    return this.http.post(this.API_URL + '/Registration/login', data);
  }

  registerUser(data: any): Observable<any>{
    return this.http.post(this.API_URL + '/Registration/Registration', data);
  }

  uploadData(file: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(this.API_URL + '/UploadUserData', formData);
  }

  sendemail(data: EmailModule): Observable<any>{
    return this.http.post(this.API_URL + '/Email?companyName=' + data.companyname + "&subject=" + data.subject + "&message=" + data.message, data);
  }

  sendsms(data: SmsModule): Observable<any>{
    return this.http.post(this.API_URL + '/Sms/send-multiple?Campaign_name=' + data.campaignname + "&message=" + data.message, data);
  }

  getAllUsers(): Observable<CustomerlistModule[]>{
    return this.http.get<CustomerlistModule[]>(this.API_URL2 + 'UserProfile');
  }

  getUserById(id: any): Observable<CustomerlistModule>{
    return this.http.get<CustomerlistModule>(this.API_URL2 + 'UserProfile/' + id);
  }

}