import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postIncomeRecord(data: any) {
    return this.http.post<any>('http://localhost:3000/i_record', data)
  }

  getIncomeRecord() {
    return this.http.get<any>('http://localhost:3000/i_record')
  }

  putIncomeRecord(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/i_record/${id}`, data)
  }

  deleteIncomeRecord(id: number) {
    return this.http.delete<any>(`http://localhost:3000/i_record/${id}`)
  }

  getIncomeRecord_category(data: any) {
    return this.http.get<any>(`http://localhost:3000/i_record?category=${data}`)
  }

  postIncomeCategory(data: any) {
    return this.http.post<any>('http://localhost:3000/i_category', data)
  }

  getIncomeCategory() {
    return this.http.get<any>('http://localhost:3000/i_category')
  }
}
