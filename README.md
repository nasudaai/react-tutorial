# react tutorial

reactチュートリアルを始める。新しいサイトの方。おそらくもとのチュートリアルより簡単になっていると思う。クラスコンポーネントではなく、関数コンポーネントでやっていくっぽい。

今回はメモりながらやっていく。

## ローカル環境でやっていく

公式のガイドに従ってインストールから`npm start` したが、エラーが出て画面が表示されない。

色々調べたが、とりあえず`src/App.js`で

```
import React from 'react';
```

すれば、画面が表示された。

他にも、設定を変えることで対応する方法があるようだが、とりあえず今回はこれでいく。おいおい。

## まずは、ファイル構成とファイルそれぞれの役割を確認

主になるのは、src/ディレクトリ内のindex.js App.js jsファイル２つ。
それから同じsrc/の中にある styles.css。

これらの内容が src/public/index.htmlに「注入」される。

「注入」。

## JSXで先ず出すエラー

react では、JSXで書くことを推奨というか、ほぼ前提になっていますが、その際に最も基本的なルールとして

> *Reactコンポーネントからは単一のJSX要素を返す必要があります*

というものがある。

これを自覚するために、先ず間違えなければならないようです。

```
export default function Square() {
  return <button className="square">X<button/>;
}
```

App.jsにもともとあるコードはこれだけ。ここから書き足すことでチュートリアルを進めていき完成させていく。

> *ボタンを一つ増やしてみましょう*

ということで、先程のコードに \<button\> を追加します。

```
export default function Square() {
  return <button className="square">X<button/>
         <button className="square">X<button/>;
}
```
このように書くことで、めでたく典型的なerrorを出すことに成功します。

そして対策をしなければなりません。

```
export default function Square() {
  return 
    <>
      <button className="square">X<button/>
      <button className="square">X<button/>;
    </>
}
```
追加した \<\> 空のタグをJSXフラグメントというらしいです。
こうすることで、2つの \<button\> は単一つの要素になりました。まるであなたと私みたい。

もう少し詳しく言おうとすると、*2つの要素を内包した一つの要素*ということになるでしょうか。

いずれにせよ、私とあなたは一つだし、JSXは正しく記述されerrorも出なくなりました。

と思ったら...、
### jsxフラグメントで囲うとerrorになる

なんでか知らないが、

```
<>...</>
```
jsx fragmentで囲うとerrorがでるので、一旦

```
import { Fragment } from 'react';
```
して、

```
<Fragment>
  ...
</Fragment>
```

で囲うことにする。


```
export default function Square() {
  return 
    <Fragment>
      <button className="square">X<button/>
      <button className="square">X<button/>;
    <Fragment/>
}
```

もしくは、\<div\> タグやその他の要素で囲んでもよい。


```
export default function Square() {
  return 
    <div>
      <button className="square">X<button/>
      <button className="square">X<button/>;
    <div/>
}
```

`<Layout />` みたいなコンポーネントを自作して、それで囲んでも良い。


```
export default function Square() {
  return 
    <Layout>
      <button className="square">X<button/>
      <button className="square">X<button/>;
    <Layout/>
}
```

とか。

### Layoutを自作する

せっかくなので、\<button\>を囲うコンポーネントを自作する。
`create-react-app`すれば起きない問題だろうが、せっかくなので。

```
const Layout = ({ children }) => {
  return <div className="layout">{children}</div>
} 
```
それから、
```
export default function Square() {
  return (
    <Layout>
      <button className="square">X</button>
      <button className="square">X</button>
    </Layout>
  );
}
```

\<Layout \> コンポーネントには、*styleName*　を設定したので、あとでcssを当ててみるかも。

とにかく次にいきたい。

## 