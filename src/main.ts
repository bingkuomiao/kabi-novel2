import BookShelf from './bookshelf/bookshelf';
import Config from './config/config';
import Router from './common/router/router';
import Debugger from './common/debugger/debugger';
import Modal from './common/modal/modal';
import Message from './common/message/message';
import Store from './common/store/store';
import Bind from './common/bind/bind';
import Layout from './common/layout/layout';
import Api from './common/api/api';
import Article from './article/article';
import Catalogue from './catalogue/catalogue';

const pages: string[] = ['config', 'bookshelf', 'article', 'catalogue'];

function init() {
    new Debugger();

    new Bind();

    new Modal();
    new Message();

    new Router(pages);

    new Store();

    new Layout();

    new Api();
    
    document.documentElement.style.setProperty('--scrollHack', `${window.Layout.scrollHack}px`);
    document.documentElement.style.setProperty('--barHeight', `${window.Layout.barHeight}px`);
    
    const controlHeight = window.Layout.controlHeight + 2*window.Layout.scrollHack;
    document.documentElement.style.setProperty('--controlHeight', `${controlHeight}px`);
    
    const contentHeight = document.body.offsetHeight - window.Layout.bottomTotalHeight;
    document.documentElement.style.setProperty('--contentHeight', `${contentHeight}px`);

    window.Config = new Config();

    window.BookShelf = new BookShelf();
    
    window.Catalogue = new Catalogue();

    window.Article = new Article();

}

window.init = init;



window.ondblclick = function(event: Event) {
    event.preventDefault();
}