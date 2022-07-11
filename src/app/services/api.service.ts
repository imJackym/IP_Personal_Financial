import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // income
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

  putIncomeCategory(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/i_category/${id}`, data)
  }

  // expenditure
  postExpenditureRecord(data: any) {
    return this.http.post<any>('http://localhost:3000/e_record', data)
  }

  getExpenditureRecord() {
    return this.http.get<any>('http://localhost:3000/e_record')
  }

  putExpenditureRecord(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/e_record/${id}`, data)
  }

  deleteExpenditureRecord(id: number) {
    return this.http.delete<any>(`http://localhost:3000/e_record/${id}`)
  }

  getExpenditureRecord_category(data: any) {
    return this.http.get<any>(`http://localhost:3000/e_record?category=${data}`)
  }

  postExpenditureCategory(data: any) {
    return this.http.post<any>('http://localhost:3000/e_category', data)
  }

  getExpenditureCategory() {
    return this.http.get<any>('http://localhost:3000/e_category')
  }

  putExpenditureCategory(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/e_category/${id}`, data)
  }

}
