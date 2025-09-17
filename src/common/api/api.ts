import { formatParams, ajax, Book, Progress, CatalogueItem } from '../common';

class Api {
    url: string;
    time: string

    apiMap: {[key: string]: string} = {
            bookshelf: '/getBookshelf',
            catalogue: '/getChapterList',
            article: '/getBookContent',
            save: '/saveBookProgress'
    };

    private _checkXHR: XMLHttpRequest;

    constructor() {
        if (window.Api) {
            throw Error('api has been inited');
        }
        window.Api = this;
        // 默认服务器地址:http://阅读服务器地址:端口/reader3
        this.url = window.Store.get('url') || 'http://192.168.31.52:4396/reader3';
        this.time = "?v=" + new Date().getTime();
    }
    
    http(method: 'GET' | 'POST', url: string, data: { [key: string]: any }, cb?: {success?: Function, error?: Function, check?: boolean}) {
        if (!this.url && !(cb && cb.check)) {
          window.Message.add({ content: '请配置服务器地址' });
          cb?.error?.(null);
          return;
        }
      
        return ajax(url, {type: method, data: data, dataType: 'json',
            success: (resp) => {
                if (resp.isSuccess) {
                  cb?.success?.(resp);
                } else {
                  cb?.error?.(resp);
                }
            },
            error: (resp, status) => {
                console.error(`请求失败[${status}]`, resp);
                cb?.error?.(resp || { message: `网络错误: ${status}` });
                }
            }
        );
    }
    
    get(url: string, data: { [key: string]: any }, cb?: {success?: Function, error?: Function, check?: boolean}) {
        return this.http('GET', url, data, cb);
    }
    
    post(url: string, data: { [key: string]: any }, cb?: {success?: Function, error?: Function, check?: boolean}) {
        return this.http('POST', url, data, cb);
    }
    
    getBookshelf(cb?: {success?: Function, error?: Function}): void {
        this.get(this.url + this.apiMap.bookshelf + this.time, {}, {
            success: (data: any) => {
                cb && cb.success && cb.success(data);
            },
            error: (err: any) => {
                console.log(err);
                cb && cb.error && cb.error(err);
                window.Message.add({content: '获取书架内容失败'});
            }
        });
    }
    
    getCatalogue(url: string, cb?: {success?: Function, error?: Function}): void {
        this.post(this.url + this.apiMap.catalogue + this.time, {url: url}, {
            success: (data: any) => {
                cb && cb.success && cb.success(data);
            },
            error: (err: any) => {
                console.log(err);
                cb && cb.error && cb.error(err);
                window.Message.add({content: '获取目录内容失败'});
            }
        });
    }
    
    getArticle(url: string, index: number, cb?: {success?: Function, error?: Function}): void {
        this.post(this.url + this.apiMap.article + this.time, {url: url, index: index}, {
            success: (data: any) => {
                cb && cb.success && cb.success(data);
            },
            error: (err: any) => {
                console.log(err);
                cb && cb.error && cb.error(err);
                window.Message.add({content: '获取章节内容失败'});
            }
        });
    }
    
    saveProgress(url: string, index: number, cb?: {success?: Function, error?: Function}): void {
        this.post(this.url + this.apiMap.article + this.time, {url: url, index: index}, {
            success: (data: any) => {
                cb && cb.success && cb.success(data);
            },
            error: (err: any) => {
                console.log(err);
                cb && cb.error && cb.error(err);
                window.Message.add({content: '保存阅读进度到服务端失败'});
            }
        });
    }
    
    setUrl(url: string) {
        this.url = url;
        window.Store.set('url', url);
    }

    checkUrl(url: string) {
        if (this._checkXHR) {
            this._checkXHR.abort();
        }

        this._checkXHR = this.get(url + this.apiMap.bookshelf + this.time, {}, {
            success: (data: any) => {
                window.Message.add({content: '服务器地址测试成功'});
                this.setUrl(url);
            },
            error: (err: any) => {
                console.log(err);
                window.Message.add({content: '服务器地址测试失败'});
            },
            check: true
        });
    }
};

export default Api;