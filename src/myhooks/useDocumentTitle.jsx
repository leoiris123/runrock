// 问题：定义一个自定义的 React 钩子 useDocumentTitle，用于设置文档标题，并在组件卸载时恢复先前的标题
// 调用方式：useDocumentTitle('title')

import { useEffect } from "react";


export default function useDocumentTitle(title) {


    useEffect(() => {
        document.title = title
    },[title])
}