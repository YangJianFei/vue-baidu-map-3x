/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, April 28th 2022, 11:51:56 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */

const transformCode = (md) => {
    const render = md.render;
    md.render = (...args) => {
        const demoCodeRgx = /(?<=-DemoCode(.*?)-)(.|\n|\r)*?(?=-\/DemoCode-)/g;
        let mdContent = args[0];
        args[0] = mdContent.replace(demoCodeRgx, demoCode => {
            const demoCodehighlight = render.call(md, '```html' + demoCode + '```');
            demoCode = demoCode.replace('<template>', `<RunCode highligh="${encodeURIComponent(demoCodehighlight)}">`)
                .replace('</template>', `</RunCode>`);
            return demoCode;
        }).replaceAll('-DemoCode-', '').replaceAll('-/DemoCode-', '');
        return render.call(md, ...args);
    }
};

export default transformCode;