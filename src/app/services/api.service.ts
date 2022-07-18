import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // IncomeRecord
  getIncomeRecord() {
    return this.http.get<any>('http://localhost:3000/i_record')
  }
  getIncomeRecord_ync1(attr1: any, v1: any) {
    return this.http.get<any>(`http://localhost:3000/i_record?${attr1}=${v1}`)
  }
  getIncomeRecord_ync2(attr1: any, v1: any, attr2: any, v2: any) {
    return this.http.get<any>(
      `http://localhost:3000/i_record?${attr1}=${v1}&${attr2}=${v2}`,
    )
  }
  getIncomeRecord_ync3(v1: any, v2: any, v3: any) {
    return this.http.get<any>(
      `http://localhost:3000/i_record?year=${v1}&month=${v2}&category_id=${v3}`,
    )
  }
  postIncomeRecord(data: any) {
    return this.http.post<any>('http://localhost:3000/i_record', data)
  }
  putIncomeRecord(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/i_record/${id}`, data)
  }
  deleteIncomeRecord(id: number) {
    return this.http.delete<any>(`http://localhost:3000/i_record/${id}`)
  }
  getIncomeRecord_category(data: any) {
    return this.http.get<any>(
      `http://localhost:3000/i_record?category_id=${data}`,
    )
  }

  // IncomeCategory
  getIncomeCategory() {
    return this.http.get<any>('http://localhost:3000/i_category')
  }
  postIncomeCategory(data: any) {
    return this.http.post<any>('http://localhost:3000/i_category', data)
  }
  putIncomeCategory(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/i_category/${id}`, data)
  }

  // ExpenditureRecord
  getExpenditureRecord() {
    return this.http.get<any>('http://localhost:3000/e_record')
  }
  postExpenditureRecord(data: any) {
    return this.http.post<any>('http://localhost:3000/e_record', data)
  }
  putExpenditureRecord(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/e_record/${id}`, data)
  }
  deleteExpenditureRecord(id: number) {
    return this.http.delete<any>(`http://localhost:3000/e_record/${id}`)
  }
  getExpenditureRecord_category(data: any) {
    return this.http.get<any>(
      `http://localhost:3000/e_record?category_id=${data}`,
    )
  }

  // ExpenditureCategory
  getExpenditureCategory() {
    return this.http.get<any>('http://localhost:3000/e_category')
  }
  postExpenditureCategory(data: any) {
    return this.http.post<any>('http://localhost:3000/e_category', data)
  }
  putExpenditureCategory(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/e_category/${id}`, data)
  }
}
