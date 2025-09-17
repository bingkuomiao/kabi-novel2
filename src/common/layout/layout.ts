interface LayoutInterface {
    fontSize: number;
    lineHeight: number;
    // 新增底部区域高度配置
    barHeight: number;
    controlHeight: number;
    scrollHack: number;
    articleLineHeight: number;
};

class Layout {

    fontSize: number;
    lineHeight: number;
 
    barHeight: number;
    controlHeight: number;
    scrollHack: number;
    articleLineHeight: number;

    limit: LayoutInterface = {
        fontSize: 20,
        lineHeight: 24,
        barHeight: 24, 
        controlHeight: 86,
        scrollHack: 20,
        articleLineHeight: 70
    };

    // 基础默认值
    base: LayoutInterface = {
        fontSize: 43,          // 默认字体
        lineHeight: 57,        // 默认行高
	
        barHeight: 24,         // 进度条默认高度
        controlHeight: 86,     // 控制栏默认高度
        scrollHack: 20,      // 浏览器滚动条固定值2*20
        articleLineHeight: 72  // 目录行高
    };

    constructor() {
        if (window.Layout) {
            throw Error('layout has been inited');
        }
        window.Layout = this;

        this.fontSize = parseInt(window.Store.get('fontSize') || this.base.fontSize.toString());
        this.lineHeight = parseInt(window.Store.get('lineHeight') || this.base.lineHeight.toString());
        
        this.barHeight = parseInt(this.base.barHeight.toString());
        this.controlHeight = parseInt(this.base.controlHeight.toString());
        this.scrollHack = parseInt(this.base.scrollHack.toString());
        this.articleLineHeight = parseInt(this.base.articleLineHeight.toString());
    }

    set(target: 'fontSize' | 'lineHeight', value?: number): void {
        this[target] = value || this.base[target];
        window.Store.set(target, this[target].toString());
    }

    add(target: 'fontSize' | 'lineHeight', num: number): void {
        let current = this[target];
        current += num;

        if (current < this.limit[target]) {
            current = this.limit[target];
        }

        this.set(target, current);
    }

    reset(target?: 'fontSize' | 'lineHeight'): void {
        if (target) {
            this.set(target);
            return;
        }
        this.set('fontSize');
        this.set('lineHeight');
    }

    get bottomTotalHeight(): number {
        return this.barHeight + this.controlHeight + 2 * this.scrollHack;
    }

    getContentAvailableHeight(containerHeight: number): number {
        return containerHeight - this.bottomTotalHeight - this.scrollHack;
    }
};

export default Layout;