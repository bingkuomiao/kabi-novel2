interface LayoutInterface {
    fontSize: number;
    lineHeight: number;
    // �����ײ�����߶�����
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

    // ����Ĭ��ֵ
    base: LayoutInterface = {
        fontSize: 43,          // Ĭ������
        lineHeight: 57,        // Ĭ���и�
	
        barHeight: 24,         // ������Ĭ�ϸ߶�
        controlHeight: 86,     // ������Ĭ�ϸ߶�
        scrollHack: 20,      // ������������̶�ֵ2*20
        articleLineHeight: 72  // Ŀ¼�и�
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