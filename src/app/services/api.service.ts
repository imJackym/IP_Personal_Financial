import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // IncomeRecord - get
  getIncomeRecord() {
    return this.http.get<any>("http://localhost:3000/i_record")
  }
  getIncomeRecord_ync1(attr1: any, v1: any) {
    return this.http.get<any>(`http://localhost:3000/i_record?${attr1}=${v1}`)
  }
  getIncomeRecord_ync2(attr1: any, v1: any, attr2: any, v2: any) {
    return this.http.get<any>(`http://localhost:3000/i_record?${attr1}=${v1}&${attr2}=${v2}`)
  }
  getIncomeRecord_ync3(v1: any, v2: any, v3: any) {
    return this.http.get<any>(`http://localhost:3000/i_record?year=${v1}&month=${v2}&category_id=${v3}`)
  }
  // IncomeRecord - get by category
  getIncomeRecord_category(data: any) {
    return this.http.get<any>(`http://localhost:3000/i_record?category_id=${data}`)
  }
  // IncomeRecord - post
  postIncomeRecord(data: any) {
    return this.http.post<any>("http://localhost:3000/i_record", data)
  }
  // IncomeRecord - put
  putIncomeRecord(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/i_record/${id}`, data)
  }
  // IncomeRecord - delete
  deleteIncomeRecord(id: number) {
    return this.http.delete<any>(`http://localhost:3000/i_record/${id}`)
  }
  // -------------------------------------------------------------------------------------------------------
  // IncomeCategory - get
  getIncomeCategory() {
    return this.http.get<any>("http://localhost:3000/i_category")
  }
  // IncomeCategory - post
  postIncomeCategory(data: any) {
    return this.http.post<any>("http://localhost:3000/i_category", data)
  }
  // IncomeCategory - put
  putIncomeCategory(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/i_category/${id}`, data)
  }

  // -------------------------------------------------------------------------------------------------------
  // ExpenditureRecord - get
  getExpenditureRecord() {
    return this.http.get<any>("http://localhost:3000/e_record")
  }
  getExpenditureRecord_ync1(attr1: any, v1: any) {
    console.log(`http://localhost:3000/e_record?${attr1}=${v1}`)
    return this.http.get<any>(`http://localhost:3000/e_record?${attr1}=${v1}`)
  }
  getExpenditureRecord_ync2(attr1: any, v1: any, attr2: any, v2: any) {
    console.log(`http://localhost:3000/e_record?${attr1}=${v1}&${attr2}=${v2}`)
    return this.http.get<any>(`http://localhost:3000/e_record?${attr1}=${v1}&${attr2}=${v2}`)
  }
  getExpenditureRecord_ync3(v1: any, v2: any, v3: any) {
    console.log(`http://localhost:3000/e_record?year=${v1}&month=${v2}&category_id=${v3}`)
    return this.http.get<any>(`http://localhost:3000/e_record?year=${v1}&month=${v2}&category_id=${v3}`)
  }
  // ExpenditureRecord - get by category
  getExpenditureRecord_category(data: any) {
    return this.http.get<any>(`http://localhost:3000/e_record?category_id=${data}`)
  }
  // ExpenditureRecord - post
  postExpenditureRecord(data: any) {
    return this.http.post<any>("http://localhost:3000/e_record", data)
  }
  // ExpenditureRecord - put
  putExpenditureRecord(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/e_record/${id}`, data)
  }
  // ExpenditureRecord - delete
  deleteExpenditureRecord(id: number) {
    return this.http.delete<any>(`http://localhost:3000/e_record/${id}`)
  }
  // -------------------------------------------------------------------------------------------------------
  // ExpenditureCategory - get
  getExpenditureCategory() {
    return this.http.get<any>("http://localhost:3000/e_category")
  }
  // ExpenditureCategory - post
  postExpenditureCategory(data: any) {
    return this.http.post<any>("http://localhost:3000/e_category", data)
  }
  // ExpenditureCategory - put
  putExpenditureCategory(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/e_category/${id}`, data)
  }
}
