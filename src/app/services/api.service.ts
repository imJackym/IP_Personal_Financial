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
  // IncomeRecord - get by type
  getIncomeRecord_type(data: any) {
    return this.http.get<any>(`http://localhost:3000/i_record?type=${data}`)
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
  // IncomeCategory - pi = T
  getIncomeCategory_pi() {
    return this.http.get<any>("http://localhost:3000/i_category?pi=T")
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
    return this.http.get<any>(`http://localhost:3000/e_record?${attr1}=${v1}`)
  }
  getExpenditureRecord_ync2(attr1: any, v1: any, attr2: any, v2: any) {
    return this.http.get<any>(`http://localhost:3000/e_record?${attr1}=${v1}&${attr2}=${v2}`)
  }
  getExpenditureRecord_ync3(v1: any, v2: any, v3: any) {
    return this.http.get<any>(`http://localhost:3000/e_record?year=${v1}&month=${v2}&category_id=${v3}`)
  }
  // ExpenditureRecord - get by category
  getExpenditureRecord_category(data: any) {
    return this.http.get<any>(`http://localhost:3000/e_record?category_id=${data}`)
  }
  // ExpenditureRecord - get by type
  getExpenditureRecord_type(data: any) {
    return this.http.get<any>(`http://localhost:3000/e_record?type=${data}`)
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
  // IncomeCategory - fe = T
  getExpenditureCategory_fe() {
    return this.http.get<any>("http://localhost:3000/e_category?fe=T")
  }
  // ExpenditureCategory - post
  postExpenditureCategory(data: any) {
    return this.http.post<any>("http://localhost:3000/e_category", data)
  }
  // ExpenditureCategory - put
  putExpenditureCategory(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/e_category/${id}`, data)
  }
  // -------------------------------------------------------------------------------------------------------
  // ExpenditureCategory - get
  getWallet() {
    return this.http.get<any>("http://localhost:3000/wallet")
  }
  // ExpenditureCategory - put
  putWallet(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/wallet/1`, data)
  }
}
