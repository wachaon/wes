
 aon/wes">https://github.com/wachaon/wes</a></p>
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

<span class="token function">contract</span><span class="token punctuation">(</span> add<span class="token punctuation">,</span> Int<span class="token punctuation">
# WES (Windows EcmaScript host)

WES は WSH を現代的なECMAScript構文で開発できる実行環境です。
Windows のオートメーション自動化処理の開発コストを軽減できます。

## 特徴
-  chakra エンジンを使用して `const` `let` `() =>` `class` などの現代的なECMAScript構文で開発できる
-  モジュールを扱える
-  標準出力に色付き文字を出力できます
-  ファイルのエンコードを自動で推測します

## 取得

実行に必要なファイルは wes.js の1ファイルのみです。

コマンドプロンプトからダウンロード

```
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

もしくは下記リンク先から wes.js を取得して、プロジェクトルートに配置するか、配置先のディレクトリを環境変数に登録します。
https://github.com/wachaon/wes


## 使い方

コマンドプロンプトでプロジェクトルートまで移動をしたら `wes` に続けて起点となるファイルを入力します。

```
wes index.js
```

wes.js が cpu の 32/64bit の判断、実行エンジンを chakra に変更、色付き文字を出力するために ` | echo off` を付加して、
起点となるファイルを実行します。

## console

標準出力は `WScript.Echo()` ではなく、`console.log()` を使います。
色付き文字を出力したい場合は `console.ansi` にあるカラープロパティを使います。

また、色を RBG で指定できる `console.ansi.color()` `console.ansi.bgColor()` もあります。

色付き文字を表示するサンプル

```javascript
const {
    white, silver, gray,
    red, green, yellow, blue, magenta, cyan,
    brightRed, brightGreen, brightYellow,
    brightBlue, brightMagenta, brightCyan,
    reverse, underscore, clear, black,
    bgWhite, bgSilver, bgGray,
    bgRed, bgGreen, bgYellow,
    bgBlue, bgMagenta, bgCyan,
    bgBrightRed, bgBrightGreen, bgBrightYellow,
    bgBrightBlue, bgBrightMagenta, bgBrightCyan,
    color, bgColor
} = console.ansi

console.log( `${ white }white ${ silver }silver ${ gray }gray ${ clear }
${ red }red ${ green }green ${ yellow }yellow ${ blue }blue ${ magenta }magenta ${ cyan }cyan${ clear }
${ brightRed }brightRed ${ brightGreen }brightGreen ${ brightYellow }brightYellow${ clear }
${ brightBlue }brightBlue ${ brightMagenta }brightMagenta ${ brightCyan }brightCyan${ clear }
${ reverse }reverse${ clear } ${ underscore }underscore${ clear }\n
${ black + bgWhite } bgWhite ${ bgSilver } bgSilver ${ bgGray } bgGray ${ clear }
${ black + bgRed } bgRed ${ bgGreen } bgGreen ${ bgYellow } bgYellow ${ clear }
${ black + bgBlue } bgBlue ${ bgMagenta } bgMagenta ${ bgCyan } bgCyan ${ clear }
${ black + bgBrightRed } bgBrightRed ${ bgBrightGreen } bgBrightGreen ${ bgBrightYellow } bgBrightYellow ${ clear }
${ black + bgBrightBlue } bgBrightBlue ${ bgBrightMagenta } bgBrightMagenta ${ bgBrightCyan } bgBrightCyan ${ clear }
${ color( '#E6DB74' ) + bgColor( '#272822' ) } color( '#E6DB74' ) + bgColor( '#272822' ) ${ clear }
${ color( 39, 40, 34 ) + bgColor( 174, 129, 255 ) } color( 39, 40, 34 ) + bgColor( 174, 129, 255 )${ clear }
`)
```

## require

モジュールは node.js と同じように `module.exports` で定義して `require()` で読み込みます。

パスの指定も node.js の `require()` に似せているので、拡張子の指定も不要です。
( ver 0.6.0 から `/` から始めるパスをドライブレターからのパスではなく、プロジェクトフォルダからのパスとして扱うようになりました。)

wes の標準モジュールに [chardet](https://github.com/runk/node-chardet) を 改変したものがあるので、
UTF-8 以外のエンコードファイルも自動推測で読み込めます。

また、従来のオートメーションオブジェクトを呼ぶ場合も

```javascript
var FSO = new ActiveXObject( 'Scripting.FileSystemObject' )
```

ではなく、

```javascript
const FSO = require( 'Scripting.FileSystemObject' )
```

で呼び出します。

## 標準モジュール

wes はいくつかの標準モジュールを持っています。

### filesyste

ファイルの読み書きを行います。

引数で指定する `path` を相対パスにした場合は常にプロジェクトルート `require( 'WScript.Shell' ).CurrentDirectory` が起点となります。

読み込みは `readFileSync( path, encode )` で読み込めます。`encode` を指定しない場合の戻り値は `Buffer` オブジェクトになります。

テキストファイルを読み込むならエンコードの自動推測を行う  `readTextFileSync( path )` が便利です。

ファイルを読み込むサンプル

```javascript
const fs = require( 'filesystem' )
const path = require( 'pathname' )

const readme = path.join( __dirname, '_README.md' )

console.log( fs.readFileSync( readme, 'UTF-8' ) )
// or
console.log( fs.readTextFileSync( readme ) )
```

書き込みは `writeFileSync( path, data, encode )` で行います。`data` が `Buffer` もしくは `byte` の場合は `encode` の指定を無視して、`byte` を書き込みます。

テキストを保存する場合は `writeTextFileSync( path, text, encode )` を使います。`encode` を指定しない場合は `require( 'ADODB.stream' )` で `Charset` を省略した場合と同になります。

現時点では encode を `'UTF-8'` に指定した場合は `'UTF-8BOM'` ( utf-8 with byte order mark ) で書き込みます。( 読み込みは自動で `'UTF-8'`　の BOM を取り除きます。)

BOM なし ( utf-8 without byte order mark ) で書き込みたい場合は、明示的に `encode` に `'UTF-8N'` と指定してください。

 今後、 encode を `'UTF-8'` にした場合の規定値を変更する可能性があります。
 保存したファイルを他のプログラムで使用する可能性がある場合は、明示的に `'UTF-8BOM'` もしくは `'UTF-8N'` を指定してエンコードを固定してください。

ファイルを書き込むサンプル

```javascript
const fs = require( 'filesystem' )
const path = require( 'pathname' )

const readme = path.join( __dirname, '_README.md' )

const text = 'Hello World'

console.log( fs.writeFileSync( readme, text, 'UTF-8N' ) )
// or
console.log( fs.writeTextFileSync( readme, text ) )
```


### pathname

パスの操作をします。

wes ではパスの区切り文字は `\\` と `/` の両方使えます。
pathname のメソッドのほとんどは戻り値のパスの区切りを `/` にして返します。

### JScript

JScript 固有のコンストラクタの `Enumerator` を使用可能にします。
`new Enumerator( collection )` は常に `Array` を返します。

ディレクトリにある、すべてのファイルを読み込むサンプル

```javascript
const { Enumerator } = require( 'JScript' )
const FSO = require( 'Scripting.FileSystemObject' )
const path = require( 'pathname' )
const WShell = require( 'WScript.Shell' )
const fs = require( 'filesystem' )

const dir = path.join( WShell.CurrentDirectory, 'lib' )
const folder = FSO.GetFolder( dir )
const libs = new Enumerator( folder.Files )
  .map( file => file.Path )
  .map( path => fs.readTextFileSync( path ) )

libs.forEach( text => console.log( text ) )
```

### VBScript

VBScript 固有の `TypeName` や `VarType` と `VarType` をわかりやすくした `Type` が使えます。

`require( 'Scripting.FileSystemObject' )` オブジェクトを `TypeName` で表示するサンプル

```javascript
const { TypeName, Type, VarType } = require( 'VBScript' )
const FSO = require( 'Scripting.FileSystemObject' )

console.log( TypeName( FSO ) )
console.log( VarType( FSO ) )
console.log( Type( FSO ) )
```

## dump

オブジェクトを内容を簡易表記します。

オブジェクトの表示するサンプル

```javascript
const dump = require( 'dump' )
const fs = require( 'filesystem' )

const obj = {
    none: null,
    undefined: undefined,
    string: 'string',
    number: 1234,
    fn( name ){ return name },
    now: new Date(),
    regexp: /regexp/g,
    boolean: true,
    isSymbol: Symbol( fs ),
    buffer: fs.readFileSync( 'README.md' ),
    array: [1, 'string'],
    object: {
        code: () => false
    },
}
obj.object.array = obj.array

console.log( dump( obj ) )
```


### log

関数を引数に渡すことで、出力したい項目と内容が標準出力に出力されます。

簡易ログ表示のサンプル

```javascript
const log = require( 'log' )

log( () => new Date() )
```

### minitest

簡易的なテストを実行できます。

テストのサンプル

```javascript
const { describe, it, assert } = require( 'minitest' )

describe( 'test sample', () => {
    it( '1 + 1 === 2', () => {
        assert( 1 + 1 === 2 )
    } )
    it( '1 * 1 !== 2', () => {
        assert.ng( 1 * 1 !== 2 )
    } )
    it( '1 * 1 !== 2', () => {
        assert.ok( 1 * 1 !== 2 )
    } )
} )
```

### typecheck

ECMAScript で扱う変数の型を確認する関数を提供します。

型を確認するサンプル

```javascript
const { isString } = require( 'typecheck' )

console.log( isString( 'foo' ) )
```

### contract

与えられた引数の値が想定している値かどうかを確認します。
コマンドラインで名前付き引数を `/debug` にしなければ確認はしません。
条件に合致しない場合のみ画面に出力します。

```javascript
const contract = require( 'contract' )
const { isNumber } = require( 'typecheck' )
const log = require( 'log' )


const Int = ( ...args ) => [
    ( arg ) => isNumber( arg ) && arg === parseInt( arg ),
    ( arg ) => isNumber( arg ) && arg === parseInt( arg )
].map( ( v, i ) => v( args[i] ) )

const two = 2
const five = 5
const _five = '5'
const eight = 8
const threePointFive = 3.5

const add = ( a, b ) => a + b

contract( add, Int, two, five )
log( () => add( two, five ) )

contract( add, Int, two, _five )
log( () => add( two, _five ) )

contract( add, Int, two, threePointFive )
log( () => add( two, threePointFive ) )


const sub = ( a, b ) => a - b

contract( sub, Int, eight, five )
log( () => sub( eight, five ) )

contract( sub, Int, eight, _five )
log( () => sub( eight, _five ) )

contract( sub, Int, eight, threePointFive )
log( () => sub( eight, threePointFive ) )
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI1MzI2MDQ2Nl19
-->