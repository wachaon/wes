---


---

<h1 id="wes-windows-ecmascript-host">WES (Windows EcmaScript host)</h1>
<p>WES は WSH を現代的なECMAScript構文で開発できる実行環境です。<br>
Windows のオートメーション自動化処理の開発コストを軽減できます。</p>
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
<a href="https://github.com/wachaon/wes">https://github.com/wachaon/wes</a></p>
<h2 id="使い方">使い方</h2>
<p>コマンドプロンプトでプロジェクトルートまで移動をしたら <code>wes</code> に続けて起点となるファイルを入力します。</p>
<pre><code>wes index.js
</code></pre>
<p>wes.js が cpu の 32/64bit の判断、実行エンジンを chakra に変更、色付き文字を出力するために <code>| echo off</code> を付加して、<br>
起点となるファイルを実行します。</p>
<h2 id="console">console</h2>
<p>標準出力は <code>WScript.Echo()</code> ではなく、<code>console.log()</code> を使います。<br>
色付き文字を出力したい場合は <code>console.ansi</code> にあるカラープロパティを使います。</p>
<p>また、色を RBG で指定できる <code>console.ansi.color()</code> <code>console.ansi.bgColor()</code> もあります。</p>
<p>色付き文字を表示するサンプル</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> <span class="token punctuation">{</span>
    white<span class="token punctuation">,</span> silver<span class="token punctuation">,</span> gray<span class="token punctuation">,</span>
    red<span class="token punctuation">,</span> green<span class="token punctuation">,</span> yellow<span class="token punctuation">,</span> blue<span class="token punctuation">,</span> magenta<span class="token punctuation">,</span> cyan<span class="token punctuation">,</span>
    brightRed<span class="token punctuation">,</span> brightGreen<span class="token punctuation">,</span> brightYellow<span class="token punctuation">,</span>
    brightBlue<span class="token punctuation">,</span> brightMagenta<span class="token punctuation">,</span> brightCyan<span class="token punctuation">,</span>
    reverse<span class="token punctuation">,</span> underscore<span class="token punctuation">,</span> clear<span class="token punctuation">,</span> black<span class="token punctuation">,</span>
    bgWhite<span class="token punctuation">,</span> bgSilver<span class="token punctuation">,</span> bgGray<span class="token punctuation">,</span>
    bgRed<span class="token punctuation">,</span> bgGreen<span class="token punctuation">,</span> bgYellow<span class="token punctuation">,</span>
    bgBlue<span class="token punctuation">,</span> bgMagenta<span class="token punctuation">,</span> bgCyan<span class="token punctuation">,</span>
    bgBrightRed<span class="token punctuation">,</span> bgBrightGreen<span class="token punctuation">,</span> bgBrightYellow<span class="token punctuation">,</span>
    bgBrightBlue<span class="token punctuation">,</span> bgBrightMagenta<span class="token punctuation">,</span> bgBrightCyan<span class="token punctuation">,</span>
    color<span class="token punctuation">,</span> bgColor
<span class="token punctuation">}</span> <span class="token operator">=</span> console<span class="token punctuation">.</span>ansi

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> white <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">white </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> silver <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">silver </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> gray <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">gray </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> red <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">red </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> green <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">green </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> yellow <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">yellow </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> blue <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">blue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> magenta <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">magenta </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> cyan <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">cyan</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> brightRed <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">brightRed </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> brightGreen <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">brightGreen </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> brightYellow <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">brightYellow</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> brightBlue <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">brightBlue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> brightMagenta <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">brightMagenta </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> brightCyan <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">brightCyan</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> reverse <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">reverse</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> underscore <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">underscore</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> black <span class="token operator">+</span> bgWhite <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgWhite </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgSilver <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgSilver </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgGray <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgGray </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> black <span class="token operator">+</span> bgRed <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgRed </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgGreen <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgGreen </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgYellow <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgYellow </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> black <span class="token operator">+</span> bgBlue <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgBlue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgMagenta <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgMagenta </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgCyan <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgCyan </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> black <span class="token operator">+</span> bgBrightRed <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgBrightRed </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgBrightGreen <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgBrightGreen </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgBrightYellow <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgBrightYellow </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> black <span class="token operator">+</span> bgBrightBlue <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgBrightBlue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgBrightMagenta <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgBrightMagenta </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> bgBrightCyan <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bgBrightCyan </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> <span class="token function">color</span><span class="token punctuation">(</span> <span class="token string">'#E6DB74'</span> <span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">bgColor</span><span class="token punctuation">(</span> <span class="token string">'#272822'</span> <span class="token punctuation">)</span> <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> color( '#E6DB74' ) + bgColor( '#272822' ) </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> <span class="token function">color</span><span class="token punctuation">(</span> <span class="token number">39</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">34</span> <span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">bgColor</span><span class="token punctuation">(</span> <span class="token number">174</span><span class="token punctuation">,</span> <span class="token number">129</span><span class="token punctuation">,</span> <span class="token number">255</span> <span class="token punctuation">)</span> <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> color( 39, 40, 34 ) + bgColor( 174, 129, 255 )</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> clear <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
`</span></span><span class="token punctuation">)</span>
</code></pre>
<h2 id="require">require</h2>
<p>モジュールは node.js と同じように <code>module.exports</code> で定義して <code>require()</code> で読み込みます。</p>
<p>パスの指定も node.js の <code>require()</code> に似せているので、拡張子の指定も不要です。<br>
( ver 0.6.0 から <code>/</code> から始めるパスをドライブレターからのパスではなく、プロジェクトフォルダからのパスとして扱うようになりました。)</p>
<p>wes の標準モジュールに <a href="https://github.com/runk/node-chardet">chardet</a> を 改変したものがあるので、<br>
UTF-8 以外のエンコードファイルも自動推測で読み込めます。</p>
<p>また、従来のオートメーションオブジェクトを呼ぶ場合も</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">var</span> FSO <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ActiveXObject</span><span class="token punctuation">(</span> <span class="token string">'Scripting.FileSystemObject'</span> <span class="token punctuation">)</span>
</code></pre>
<p>ではなく、</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> FSO <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'Scripting.FileSystemObject'</span> <span class="token punctuation">)</span>
</code></pre>
<p>で呼び出します。</p>
<h2 id="標準モジュール">標準モジュール</h2>
<p>wes はいくつかの標準モジュールを持っています。</p>
<h3 id="filesyste">filesyste</h3>
<p>ファイルの読み書きを行います。</p>
<p>引数で指定する <code>path</code> を相対パスにした場合は常にプロジェクトルート <code>require( 'WScript.Shell' ).CurrentDirectory</code> が起点となります。</p>
<p>読み込みは <code>readFileSync( path, encode )</code> で読み込めます。<code>encode</code> を指定しない場合の戻り値は <code>Buffer</code> オブジェクトになります。</p>
<p>テキストファイルを読み込むならエンコードの自動推測を行う  <code>readTextFileSync( path )</code> が便利です。</p>
<p>ファイルを読み込むサンプル</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'filesystem'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'pathname'</span> <span class="token punctuation">)</span>

<span class="token keyword">const</span> readme <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span> __dirname<span class="token punctuation">,</span> <span class="token string">'_README.md'</span> <span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span> readme<span class="token punctuation">,</span> <span class="token string">'UTF-8'</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span>
<span class="token comment">// or</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> fs<span class="token punctuation">.</span><span class="token function">readTextFileSync</span><span class="token punctuation">(</span> readme <span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre>
<p>書き込みは <code>writeFileSync( path, data, encode )</code> で行います。<code>data</code> が <code>Buffer</code> もしくは <code>byte</code> の場合は <code>encode</code> の指定を無視して、<code>byte</code> を書き込みます。</p>
<p>テキストを保存する場合は <code>writeTextFileSync( path, text, encode )</code> を使います。<code>encode</code> を指定しない場合は <code>require( 'ADODB.stream' )</code> で <code>Charset</code> を省略した場合と同になります。</p>
<p>現時点では encode を <code>'UTF-8'</code> に指定した場合は <code>'UTF-8BOM'</code> ( utf-8 with byte order mark ) で書き込みます。( 読み込みは自動で <code>'UTF-8'</code>　の BOM を取り除きます。)</p>
<p>BOM なし ( utf-8 without byte order mark ) で書き込みたい場合は、明示的に <code>encode</code> に <code>'UTF-8N'</code> と指定してください。</p>
<p>今後、 encode を <code>'UTF-8'</code> にした場合の規定値を変更する可能性があります。<br>
保存したファイルを他のプログラムで使用する可能性がある場合は、明示的に <code>'UTF-8BOM'</code> もしくは <code>'UTF-8N'</code> を指定してエンコードを固定してください。</p>
<p>ファイルを書き込むサンプル</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'filesystem'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'pathname'</span> <span class="token punctuation">)</span>

<span class="token keyword">const</span> readme <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span> __dirname<span class="token punctuation">,</span> <span class="token string">'_README.md'</span> <span class="token punctuation">)</span>

<span class="token keyword">const</span> text <span class="token operator">=</span> <span class="token string">'Hello World'</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span> readme<span class="token punctuation">,</span> text<span class="token punctuation">,</span> <span class="token string">'UTF-8N'</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span>
<span class="token comment">// or</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> fs<span class="token punctuation">.</span><span class="token function">writeTextFileSync</span><span class="token punctuation">(</span> readme<span class="token punctuation">,</span> text <span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre>
<h3 id="pathname">pathname</h3>
<p>パスの操作をします。</p>
<p>wes ではパスの区切り文字は <code>\\</code> と <code>/</code> の両方使えます。<br>
pathname のメソッドのほとんどは戻り値のパスの区切りを <code>/</code> にして返します。</p>
<h3 id="jscript">JScript</h3>
<p>JScript 固有のコンストラクタの <code>Enumerator</code> を使用可能にします。<br>
<code>new Enumerator( collection )</code> は常に <code>Array</code> を返します。</p>
<p>ディレクトリにある、すべてのファイルを読み込むサンプル</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> <span class="token punctuation">{</span> Enumerator <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'JScript'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> FSO <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'Scripting.FileSystemObject'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'pathname'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> WShell <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'WScript.Shell'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'filesystem'</span> <span class="token punctuation">)</span>

<span class="token keyword">const</span> dir <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span> WShell<span class="token punctuation">.</span>CurrentDirectory<span class="token punctuation">,</span> <span class="token string">'lib'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> folder <span class="token operator">=</span> FSO<span class="token punctuation">.</span><span class="token function">GetFolder</span><span class="token punctuation">(</span> dir <span class="token punctuation">)</span>
<span class="token keyword">const</span> libs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Enumerator</span><span class="token punctuation">(</span> folder<span class="token punctuation">.</span>Files <span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span> file <span class="token operator">=&gt;</span> file<span class="token punctuation">.</span>Path <span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span> path <span class="token operator">=&gt;</span> fs<span class="token punctuation">.</span><span class="token function">readTextFileSync</span><span class="token punctuation">(</span> path <span class="token punctuation">)</span> <span class="token punctuation">)</span>

libs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span> text <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> text <span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre>
<h3 id="vbscript">VBScript</h3>
<p>VBScript 固有の <code>TypeName</code> や <code>VarType</code> と <code>VarType</code> をわかりやすくした <code>Type</code> が使えます。</p>
<p><code>require( 'Scripting.FileSystemObject' )</code> オブジェクトを <code>TypeName</code> で表示するサンプル</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> <span class="token punctuation">{</span> TypeName<span class="token punctuation">,</span> Type<span class="token punctuation">,</span> VarType <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'VBScript'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> FSO <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'Scripting.FileSystemObject'</span> <span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">TypeName</span><span class="token punctuation">(</span> FSO <span class="token punctuation">)</span> <span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">VarType</span><span class="token punctuation">(</span> FSO <span class="token punctuation">)</span> <span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">Type</span><span class="token punctuation">(</span> FSO <span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre>
<h2 id="dump">dump</h2>
<p>オブジェクトを内容を簡易表記します。</p>
<p>オブジェクトの表示するサンプル</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> dump <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'dump'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'filesystem'</span> <span class="token punctuation">)</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    none<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    undefined<span class="token punctuation">:</span> undefined<span class="token punctuation">,</span>
    string<span class="token punctuation">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span>
    number<span class="token punctuation">:</span> <span class="token number">1234</span><span class="token punctuation">,</span>
    <span class="token function">fn</span><span class="token punctuation">(</span> name <span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> name <span class="token punctuation">}</span><span class="token punctuation">,</span>
    now<span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    regexp<span class="token punctuation">:</span> <span class="token regex">/regexp/g</span><span class="token punctuation">,</span>
    boolean<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    isSymbol<span class="token punctuation">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span> fs <span class="token punctuation">)</span><span class="token punctuation">,</span>
    buffer<span class="token punctuation">:</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span> <span class="token string">'README.md'</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    array<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'string'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    object<span class="token punctuation">:</span> <span class="token punctuation">{</span>
        code<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
obj<span class="token punctuation">.</span>object<span class="token punctuation">.</span>array <span class="token operator">=</span> obj<span class="token punctuation">.</span>array

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">dump</span><span class="token punctuation">(</span> obj <span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre>
<h3 id="log">log</h3>
<p>関数を引数に渡すことで、出力したい項目と内容が標準出力に出力されます。</p>
<p>簡易ログ表示のサンプル</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> log <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'log'</span> <span class="token punctuation">)</span>

<span class="token function">log</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre>
<h3 id="minitest">minitest</h3>
<p>簡易的なテストを実行できます。</p>
<p>テストのサンプル</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> <span class="token punctuation">{</span> describe<span class="token punctuation">,</span> it<span class="token punctuation">,</span> assert <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'minitest'</span> <span class="token punctuation">)</span>

<span class="token function">describe</span><span class="token punctuation">(</span> <span class="token string">'test sample'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">it</span><span class="token punctuation">(</span> <span class="token string">'1 + 1 === 2'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">assert</span><span class="token punctuation">(</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">===</span> <span class="token number">2</span> <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token punctuation">)</span>
    <span class="token function">it</span><span class="token punctuation">(</span> <span class="token string">'1 * 1 !== 2'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        assert<span class="token punctuation">.</span><span class="token function">ng</span><span class="token punctuation">(</span> <span class="token number">1</span> <span class="token operator">*</span> <span class="token number">1</span> <span class="token operator">!==</span> <span class="token number">2</span> <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token punctuation">)</span>
    <span class="token function">it</span><span class="token punctuation">(</span> <span class="token string">'1 * 1 !== 2'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        assert<span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span> <span class="token number">1</span> <span class="token operator">*</span> <span class="token number">1</span> <span class="token operator">!==</span> <span class="token number">2</span> <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span>
</code></pre>
<h3 id="typecheck">typecheck</h3>
<p>ECMAScript で扱う変数の型を確認する関数を提供します。</p>
<p>型を確認するサンプル</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> <span class="token punctuation">{</span> isString <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'typecheck'</span> <span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">isString</span><span class="token punctuation">(</span> <span class="token string">'foo'</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre>
<h3 id="contract">contract</h3>
<p>与えられた引数の値が想定している値かどうかを確認します。<br>
コマンドラインで名前付き引数を <code>/debug</code> にしなければ確認はしません。<br>
条件に合致しない場合のみ画面に出力します。</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token keyword">const</span> contract <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'contract'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> isNumber <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'typecheck'</span> <span class="token punctuation">)</span>
<span class="token keyword">const</span> log <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span> <span class="token string">'log'</span> <span class="token punctuation">)</span>


<span class="token keyword">const</span> <span class="token function-variable function">Int</span> <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token operator">...</span>args <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
    <span class="token punctuation">(</span> arg <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">isNumber</span><span class="token punctuation">(</span> arg <span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> arg <span class="token operator">===</span> <span class="token function">parseInt</span><span class="token punctuation">(</span> arg <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> arg <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">isNumber</span><span class="token punctuation">(</span> arg <span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> arg <span class="token operator">===</span> <span class="token function">parseInt</span><span class="token punctuation">(</span> arg <span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> v<span class="token punctuation">,</span> i <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">v</span><span class="token punctuation">(</span> args<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span>

<span class="token keyword">const</span> two <span class="token operator">=</span> <span class="token number">2</span>
<span class="token keyword">const</span> five <span class="token operator">=</span> <span class="token number">5</span>
<span class="token keyword">const</span> _five <span class="token operator">=</span> <span class="token string">'5'</span>
<span class="token keyword">const</span> eight <span class="token operator">=</span> <span class="token number">8</span>
<span class="token keyword">const</span> threePointFive <span class="token operator">=</span> <span class="token number">3.5</span>

<span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span> a<span class="token punctuation">,</span> b <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">+</span> b

<span class="token function">contract</span><span class="token punctuation">(</span> add<span class="token punctuation">,</span> Int<span class="token punctuation">,</span> two<span class="token punctuation">,</span> five <span class="token punctuation">)</span>
<span class="token function">log</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">add</span><span class="token punctuation">(</span> two<span class="token punctuation">,</span> five <span class="token punctuation">)</span> <span class="token punctuation">)</span>

<span class="token function">contract</span><span class="token punctuation">(</span> add<span class="token punctuation">,</span> Int<span class="token punctuation">,</span> two<span class="token punctuation">,</span> _five <span class="token punctuation">)</span>
<span class="token function">log</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">add</span><span class="token punctuation">(</span> two<span class="token punctuation">,</span> _five <span class="token punctuation">)</span> <span class="token punctuation">)</span>

<span class="token function">contract</span><span class="token punctuation">(</span> add<span class="token punctuation">,</span> Int<span class="token punctuation">,</span> two<span class="token punctuation">,</span> threePointFive <span class="token punctuation">)</span>
<span class="token function">log</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">add</span><span class="token punctuation">(</span> two<span class="token punctuation">,</span> threePointFive <span class="token punctuation">)</span> <span class="token punctuation">)</span>


<span class="token keyword">const</span> <span class="token function-variable function">sub</span> <span class="token operator">=</span> <span class="token punctuation">(</span> a<span class="token punctuation">,</span> b <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">-</span> b

<span class="token function">contract</span><span class="token punctuation">(</span> sub<span class="token punctuation">,</span> Int<span class="token punctuation">,</span> eight<span class="token punctuation">,</span> five <span class="token punctuation">)</span>
<span class="token function">log</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">sub</span><span class="token punctuation">(</span> eight<span class="token punctuation">,</span> five <span class="token punctuation">)</span> <span class="token punctuation">)</span>

<span class="token function">contract</span><span class="token punctuation">(</span> sub<span class="token punctuation">,</span> Int<span class="token punctuation">,</span> eight<span class="token punctuation">,</span> _five <span class="token punctuation">)</span>
<span class="token function">log</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">sub</span><span class="token punctuation">(</span> eight<span class="token punctuation">,</span> _five <span class="token punctuation">)</span> <span class="token punctuation">)</span>

<span class="token function">contract</span><span class="token punctuation">(</span> sub<span class="token punctuation">,</span> Int<span class="token punctuation">,</span> eight<span class="token punctuation">,</span> threePointFive <span class="token punctuation">)</span>
<span class="token function">log</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">sub</span><span class="token punctuation">(</span> eight<span class="token punctuation">,</span> threePointFive <span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre>

