import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /*list要过滤的数据，filterField根据哪个关键字过滤，keyword输入要过滤的关键词*/
  transform(list: any[], filterField: string, keyword: string): any {
    if (!filterField || !keyword) {
      return list;
    }
    return list.filter(listItem => {
      const fieldValue = listItem[filterField];
      return fieldValue.indexOf(keyword) >= 0;
    });
  }

}
