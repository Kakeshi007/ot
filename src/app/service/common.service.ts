import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }

  hours: string[] = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  days: string[] = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  months: string[] = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤษจิกายน', 'ธันวาคม'];

  messageType = { text: 'ข้อความปกติ' };
  messageUseType = { after_booking: 'หลังจากยืนยันการจอง' }

  colorRGB(red: number, green: number, blue: number) {
    return `rgb(${red},${green},${blue})`;
  }

  messageBox(message: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title: '',
      text: message,
      icon: icon,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'ตกลง',
    });
  }

  confirmBox(message: string, warnning: boolean = false) {
    return Swal.fire({
      title: '',
      text: message,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'ยินยัน',
      cancelButtonText: 'ปิด',
      confirmButtonColor: warnning ? '#ff4800' : '#2778c4'
    });
  }

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

}



export interface LoginUser {
  PAYROLLNO: string;
  person_firstname: string;
  person_lastname: string;
}

export enum Roles {
  clinic = 'clinic',
  reg = 'reg',
  admin = 'admin'
}
