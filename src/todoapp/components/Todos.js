/**
 * Todos component
 */
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import 'isomorphic-fetch';

// 各ページ情報定義
const pages = {
    index: {
        title: 'すべてのTODO',
        fetchQuery: ''
    },
    active: {
        title: '未完了のTODO',
        fetchQuery: '?completed=false'
    },
    completed: {
        title: '完了したTODO',
        fetchQuery: '?completed=true'
    }
}

// CSRによるページ切り替えのための動的リンク
const pageLinks = Object.keys(pages).map((page, index) => {
    return (
        <Link href={`/${page === 'index' ? '' : page}`} key={index}>
            <a style={{marginRight: '1em'}}>{pages[page].title}</a>
        </Link>
    )
})

// Reactコンポーネント
export default function Todos(props) {
    const {title, fetchQuery} = pages[props.page]
    console.log('XXX: title', title)
    console.log('XXX: fetchQuery', fetchQuery)

    // useState()は、コンポーネント内部で保持するtodosの状態を引数の[]で初期化する。
    // 戻り値はtodosの現在の値を表す変数とtodosを更新するための関数setTodos()。
    const {todos, setTodos} = useState([])
    // TODO: from here.
    // FIXME: いまのところ、todosはundefined
    console.log('XXX:', todos, todos === undefined)

    // useEffect()はクライアントサイドでのコンポーネントの描画後に実行される副作用を記述するのに用いられる。
    // Todosコンポーネントではfetch()によりそのページで表示するTODO一覧を取得し
    //  setTodos()でtodosを更新する関数が副作用として設定されている。
    // useEffect()の第二引数を省略すると再描画が発生するたびにこの関数が実行される。
    // 第二引数に[props.page]を指定すると、props.pageが変わった時だけ副作用が適用される。
    // useEffect()で記述した副作用はクライアントサイドでのコンポーネントの描画後にのみ実行される。
    useEffect(() => {
        fetch(`/api/todos${fetchQuery}`)
            .then(async res => res.ok ? setTodos(await res.json()) : alert(await res.text()))
    }, [props.page])

    // JSX
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title}</h1>
            <ul>
                {todos.map(({id, title, completed}) =>
                <li key={id}>
                    <span style={completed ? {textDecoration: 'line-through'}: {}}>
                        {title}
                    </span>
                </li>
                )}
            </ul>
            <div>{pageLinks}</div>
        </>
    )
}