function strToDom(str: string): HTMLCollection {
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.children;
}

function makeDisplayText(time: number): string {
    let text = '测试文本';

    let result = new Array(time + 1).join(text);

    return result;
}

function getSpecialParent(ele: HTMLElement,checkFun: Function): HTMLElement | null {
    if (ele && ele !== document as unknown && checkFun(ele)) {
        return ele;
    }
    let parent = ele.parentElement || ele.parentNode;
    return parent?getSpecialParent(parent as HTMLElement, checkFun):null;
}

function getObject(source: any, keys: string[], others?: {[key: string]: any}): any {
    let obj: any = {};
    keys.forEach(key => {
        obj[key] = source[key];
    });
    others && Object.keys(others).forEach(key => {
        obj[key] = others[key];
    });
    return obj;
}

function changeValueWithNewObj(obj: any, target: {[key: string]: any}): any {
    let result = JSON.parse(JSON.stringify(obj));
    Object.keys(target).forEach(v => {
        result[v] = target[v];
    });
    return result;
}

function formatParams(data: { [key: string]: any }): string {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function ajax(url: string, options: {
  type?: 'GET' | 'POST';
  data?: { [key: string]: any };
  dataType?: 'json';
  success?: (resp: any) => void;
  error?: (resp: any, status: number) => void;
}) {
  options = options || {};
  const type = (options.type || 'GET').toUpperCase();
  const dataType = (options.dataType || 'json').toLowerCase();
  const data = options.data || {};
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const status = xhr.status;
      let resp;
      try {
        resp = dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
      } catch (e) {
        resp = xhr.responseText;
      }

      if (status >= 200 && status < 300) {
        options.success && options.success(resp);
      } else {
        options.error && options.error(resp, status);
      }
    }
  };

  if (type === 'GET') {
    const params = formatParams(data);
    xhr.open('GET', `${url}${params ? '?' + params : ''}`, true);
    xhr.send(null);
  } 

  else if (type === 'POST') {
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));
  }

  return xhr;
}

interface Book {
    id: string;
    source: string;
    name: string;
    author: string;
    bookUrl: string;
    coverUrl: string;
    customCoverUrl: string;
    durChapterTitle: string;
    latestChapterTime: string;
    latestChapterTitle: string;
}

interface CatalogueItem {
    index: number;
    title: string;
}

interface Progress {
    index: number;
    pos: number;
    time: number;
    title: string;
}

export { strToDom, makeDisplayText, getSpecialParent, getObject, changeValueWithNewObj, formatParams, ajax, Book, CatalogueItem, Progress};

