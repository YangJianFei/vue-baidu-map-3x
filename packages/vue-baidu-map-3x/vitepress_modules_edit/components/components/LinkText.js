/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Tuesday, September 13th 2022, 4:14:52 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */
import { h } from 'vue';

export const LinkText = (props) => {

    let text = '';
    if (props.item.latest) {
        text = 'new';
    } else if (props.item.hot) {
        text = '🌶️';
    }
    return h('span', {
        class: props.isLink ? 'link-text' : 'grid-col-2'
    }, [
        h('span', props.item.text),
        h('span', { class: props.item.latest ? 'label-new title-append' : 'label-hot title-append' }, text)
    ]);
}
