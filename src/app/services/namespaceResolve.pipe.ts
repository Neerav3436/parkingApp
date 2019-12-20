import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namespaceResolve'
})
export class NamespaceResolvePipe implements PipeTransform {
  transform(namespace: string): string {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(namespace)) {
      if (namespace.includes('.')) {
        let splitString: string[] = namespace.split('.');
        return this.formatString(splitString[0]) + ' ' + this.formatString(splitString[1].slice(0, splitString[1].indexOf('@')));
      } else {
        return this.formatString(namespace.slice(0, namespace.indexOf('@')).charAt(0).toUpperCase());
      }
    }
    let splitString: string[] = namespace.split(' ');
    return this.formatString(splitString[0]) + ' ' + this.formatString(splitString[1]);
  }

  private formatString(unFormattedString: string) {
    return unFormattedString.charAt(0).toUpperCase().concat(unFormattedString.substr(1, unFormattedString.length));
  }
}