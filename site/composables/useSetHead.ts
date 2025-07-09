import type { HeadParams } from "./types"
import { getPageTitle } from "../utils/getPageTitle"
import { siteConfig } from "./config/siteConfig"
import { encodeImageUrl } from "../utils/url"

/**
 * ページの <head> タグに必要なメタ情報 (タイトル, 説明, OGP, Twitter Card など) やリンクを設定するコンポーザブル関数。
 * Composable function to set the necessary meta information (title, description, OGP, Twitter Card, etc.) and links for the page's <head> tag.
 *
 * @param {HeadParams} params - ページのヘッド情報を設定するためのパラメータ / Parameters for setting the page's head information.
 * @param {string} params.title - ページの基本タイトル / Base title for the page.
 * @param {string} params.description - ページの説明 / Description of the page.
 * @param {string} params.cover - カバー画像のURL (OGP画像などに使用) / URL of the cover image (used for OGP image, etc.).
 * @param {string} params.path - ページのパス (例: '/ja/blog/article-slug') / Path of the page (e.g., '/ja/blog/article-slug').
 * @throws {Error} `title` パラメータが未定義の場合にエラーをスロー / Throws an error if the `title` parameter is undefined.
 */
export function useSetHead({ title, description, cover, path, noindex }: HeadParams) {
  // タイトルが必須であることを確認
  // Ensure the title parameter is provided
  if (title === undefined) {
    throw new Error('The \'title\' parameter is required and cannot be undefined.')
  }

  // ページタイトルを生成 (サイトタイトルと結合)
  // Generate the full page title (combines with site title)
  const pageTitle = getPageTitle(title, path)
  // カバー画像のURLをエンコード
  // Encode the cover image URL
  const encodedCover = encodeImageUrl(cover)

  const meta = [
    // ページの説明 / Page description
    { name: 'description', content: description },
    // --- Open Graph ---
    // OGP URL (サイトベースURL + パス) / OGP URL (site base URL + path)
    { property: 'og:url', content: `${siteConfig.baseUrl}${path}` },
    // OGP タイトル / OGP title
    { property: 'og:title', content: pageTitle },
    // OGP 説明 / OGP description
    { property: 'og:description', content: description },
    // OGP 画像 / OGP image
    { property: 'og:image', content: encodedCover },
    // --- Twitter Card ---
    // Twitter Card タイプ / Twitter Card type
    { name: 'twitter:card', content: 'summary_large_image' },
    // Twitter サイトアカウント / Twitter site account
    { name: 'twitter:site', content: siteConfig.twitter.site },
    // Twitter 作成者アカウント / Twitter creator account
    { name: 'twitter:creator', content: siteConfig.twitter.creator },
    // サムネイル指定 (独自メタタグ?) / Thumbnail specification (custom meta tag?)
    { name: 'thumbnail', content: encodedCover },
  ]

  // noindex
  if (noindex) {
    meta.push({ name: 'robots', content: 'noindex' })
  }

  // useHead を使用してヘッド情報を設定
  // Set head information using useHead
  useHead({
    title: pageTitle, // <title> タグ / <title> tag
    meta: meta,
    link: [
      // Canonical URL
      { rel: 'canonical', href: `${siteConfig.baseUrl}${path}` },
    ],
    // htmlAttrs: {
    //   // 言語は layout で設定するためコメントアウト / Language is set in the layout, so commented out
    //   lang: 'ja',
    // },
  })
}
