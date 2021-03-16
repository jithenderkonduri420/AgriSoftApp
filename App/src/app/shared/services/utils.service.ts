import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
const { Network } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;
  private isMobileDevice = false;
  constructor(
    private location: Location,
    public loadingController: LoadingController,
    private toastr: ToastController,
    private platform: Platform,
    public alertController: AlertController
  ) {
  }

  getPlatformWidth() {
    return this.platform.width();
  }


  removeEmptyObjects(obj: any) {
    return Object.keys(obj)
      .filter(k => obj[k] !== '' && obj[k] !== null && obj[k] !== undefined)  // Remove undef. and null.
      .reduce((newObj, k) =>
        typeof obj[k] === 'object' ?
          Object.assign(newObj, { [k]: this.removeEmptyObjects(obj[k]) }) :  // Recurse.
          Object.assign(newObj, { [k]: obj[k] }),  // Copy value.
        {});
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }


  parseJson(str) {
    try {
      const json = JSON.parse(str);
      return (typeof json === 'object' ? json : str);
    } catch (e) {
      return str;
    }
  }

  isPresent(str): boolean {
    if (str === '' || str === null || str === undefined) {
      return false;
    }
    return true;
  }

  blobToDataURL(blob, callback) {
    const a = new FileReader();
    a.onload = (e) => { callback(e.target.result); };
    a.readAsDataURL(blob);
  }



  parseToJsonObject(res) {
    let body = [];
    try {
      res.forEach((element, index) => {
        const parseObject = JSON.parse(element);
        if (this.isPresent(parseObject.lastLoggedInOut)) {
          // parseObject.lastLoggedInOut = moment(parseObject.lastLoggedInOut).add(330, 'minutes').toDate();
        }
        body.push(parseObject);
      });
    } catch {
      for (const obj of res) {
        if (this.isPresent(obj.lastLoggedInOut)) {
          // obj.lastLoggedInOut = moment(obj.lastLoggedInOut).add(330, 'minutes').toDate();
        }
      }
      body = res;
    }
    return body;
  }

  sortComparer(reference: string, comparer: string) {
    if (reference == null || reference === undefined) {
      reference = '';
    }
    if (comparer == null || comparer === undefined) {
      comparer = '';
    }
    if (reference.toString().trim().toLowerCase() < comparer.toString().trim().toLowerCase()) {
      return -1;
    }
    if (reference.toString().trim().toLowerCase() > comparer.toString().trim().toLowerCase()) {
      return 1;
    }
    return 0;
  }

  handleGridData(res, reqType) {
    if (reqType === 'add') {
      return this.parseToJsonObject(res).sort((a, b) => this.sortComparer(a.date_created, b.date_created)).reverse();
    } else if (reqType === 'edit') {
      return this.parseToJsonObject(res).sort((a, b) => this.sortComparer(a.date_modified, b.date_modified)).reverse();
    } else {
      return this.parseToJsonObject(res);
    }
  }

  replaceSpaceToUnderscore(str) {
    return str.replace(/ /g, '_');
  }

  replaceHyphenToUnderscore(str) {
    return str.replace(/-/g, '_');
  }

  shortNumber(value) {
    if (value === null) { return null; }
    if (value === 0) { return '0'; }
    const fractionSize = 1;
    let abs = Math.abs(value);
    const rounder = Math.pow(10, fractionSize);
    const isNegative = value < 0;
    let key = '';
    const powers = [{ key: 'Q', value: Math.pow(10, 15) }, { key: 'T', value: Math.pow(10, 12) }, { key: 'B', value: Math.pow(10, 9) }, { key: 'M', value: Math.pow(10, 6) }, { key: 'k', value: 1000 }];
    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + abs + key;
  }

  wordwrap(str, width, spaceReplacer) {
    if (str.length > width) {
      let p = width;
      for (; p > 0 && str[p] !== ' '; p--) {
      }
      if (p > 0) {
        const left = str.substring(0, p);
        const right = str.substring(p + 1);
        return left + spaceReplacer + this.wordwrap(right, width, spaceReplacer);
      }
    }
    return str;
  }

  goToPreviousRoute() {
    this.location.back();
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  presentLoading() {
    return this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 3000
    });
  }

  async presentToastError(toastMessage, position?) {
    let pos;
    if (this.isMobileDevice) {
      pos  = position ? position : 'bottom';
    } else {
      pos  = position ? position : 'top';
    }
    const toast = await this.toastr.create({
      message: toastMessage,
      duration: 5000,
      position: pos,
      cssClass: 'error'
    });
    toast.present();
  }

  async presentToastSuccess(toastMessage, position?) {
    let pos;
    if (this.isMobileDevice) {
      pos  = position ? position : 'bottom';
    } else {
      pos  = position ? position : 'top';
    }
    const toast = await this.toastr.create({
      message: toastMessage,
      duration: 5000,
      position: pos,
      cssClass: 'success'
    });
    toast.present();
  }

  async presentToastInfo(toastMessage, position?) {
    let pos;
    if (this.isMobileDevice) {
      pos  = position ? position : 'bottom';
    } else {
      pos  = position ? position : 'top';
    }
    const toast = await this.toastr.create({
      message: toastMessage,
      duration: 5000,
      position: pos,
      cssClass: 'info'
    });
    toast.present();
  }

  getIsMobileDevice() {
    if (!this.platform.is('desktop') && (this.platform.is('cordova') || this.platform.is('hybrid'))) {
      this.isMobileDevice = true;
    } else {
      this.isMobileDevice = false;
    }
    return this.isMobileDevice;
  }

  getIsDeskTop(){
    return this.platform.is('desktop');
  }

  async observeNetwork() {
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      if (!status.connected){
        this.presentToastError('Network disconnected');
      }
      this.networkStatus = status;
    });

    this.networkStatus = await Network.getStatus();
  }



  async presentAlertConfirm(options) {
    const alert = await this.alertController.create({
      cssClass: options.cssClass ? options.cssClass : 'alert-confirm-box',
      header: options.header ? options.header : 'Confirm!',
      message: options.message ? options.message : '',
      inputs: options.inputs ? options.inputs : [],
      buttons: options.buttons ? options.buttons : []
    });

    await alert.present();
  }

}
