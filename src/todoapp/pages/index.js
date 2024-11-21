/**
 * Todo-app index page
 *
 * Next.jsではpagesディレクトリ配下はフロントエンドの１ページを表すらしい。
 */
import Todos from '../components/Todos'

export default function Index() {
    return <Todos page="index"/>
}