---


---

<h1 id="wes-windows-ecmascript-host">WES (Windows EcmaScript host)</h1>
<p>WES は WSH を現代的なECMAScript構文で開発できる実行環境です。<br>
Windows の自動化処理の開発コストを軽減できます。</p>
<h2 id="特徴">特徴</h2>
<ul>
<li>chakra エンジンを使用して <code>const</code> <code>let</code> <code>() =&gt;</code> <code>class</code> などの現代的なECMAScript構文で開発できる</li>
<li>モジュールを扱える</li>
<li>標準出力に色付き文字を出力できます</li>
<li>ファイルのエンコードを自動で推測します</li>
</ul>
<h2 id="取得">取得</h2>
<p>実行に必要なファイルは wes.js の1ファイルのみです。</p>
<p>コマンドプロンプトからダウンロード</p>
<pre><code>bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
</code></pre>
<p>もしくは下記リンク先から wes.js を取得して、プロジェクトルートに配置するか、配置先のディレクトリを環境変数に登録します。<br>
<a href="https://github.com
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1OTk4NzYwMTFdfQ==
-->