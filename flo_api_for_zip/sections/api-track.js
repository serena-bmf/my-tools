registerSection('api-track', `
<div class="page-hero">
  <span class="page-tag">API Reference</span>
  <h1>트랙 (Track)</h1>
  <p>트랙 상세 정보 및 가사를 조회합니다. 모든 요청에 <code>track.read</code> Scope가 필요합니다.</p>
</div>

<!-- ── 트랙 상세 조회 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/tracks/<span class="path-param">{id}</span></span>
    <span class="endpoint-desc">트랙 상세 조회</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">트랙 ID로 상세 정보를 조회합니다. 아티스트 목록, 앨범 정보, 이미지 등을 포함합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">track.read</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">id</td>
          <td class="param-type">Long</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">트랙 ID</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙 ID</td></tr>
        <tr><td class="param-name">agencyId</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">권리사 ID</td></tr>
        <tr><td class="param-name">name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙명</td></tr>
        <tr><td class="param-name">playTime</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">재생 시간 (mm:ss)</td></tr>
        <tr><td class="param-name">originTrackYn</td><td class="param-type">YnType</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">원곡 여부 (Y/N)</td></tr>
        <tr><td class="param-name">adultAuthYn</td><td class="param-type">YnType</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">성인 인증 필요 여부 (Y/N)</td></tr>
        <tr><td class="param-name">titleYn</td><td class="param-type">YnType</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">타이틀곡 여부 (Y/N)</td></tr>
        <tr><td class="param-name">artistList</td><td class="param-type">Array</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">아티스트 목록 (아래 참조)</td></tr>
        <tr><td class="param-name">artistList[].id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">아티스트 ID</td></tr>
        <tr><td class="param-name">artistList[].name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">아티스트명</td></tr>
        <tr><td class="param-name">artistList[].roleName</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">역할 (예: 보컬, 피처링)</td></tr>
        <tr><td class="param-name">artistList[].rpYn</td><td class="param-type">YnType</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">대표 아티스트 여부 (Y/N)</td></tr>
        <tr><td class="param-name">album</td><td class="param-type">Object</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">앨범 정보 (아래 참조)</td></tr>
        <tr><td class="param-name">album.id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">앨범 ID</td></tr>
        <tr><td class="param-name">album.name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">앨범명</td></tr>
        <tr><td class="param-name">album.releaseYmd</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">발매일 (YYYYMMDD)</td></tr>
        <tr><td class="param-name">album.genreStyle</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">장르</td></tr>
        <tr><td class="param-name">album.albumTypeStr</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 타입</td></tr>
        <tr><td class="param-name">album.imgList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 이미지 → <code>size</code>, <code>url</code></td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/tracks/111"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span></pre>
    </div>

    <h4>응답 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">JSON</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>{
  <span class="token-key">"code"</span>: <span class="token-string">"200"</span>,
  <span class="token-key">"message"</span>: <span class="token-string">"SUCCESS"</span>,
  <span class="token-key">"data"</span>: {
    <span class="token-key">"id"</span>: <span class="token-string">"111"</span>,
    <span class="token-key">"agencyId"</span>: <span class="token-string">"AG001"</span>,
    <span class="token-key">"name"</span>: <span class="token-string">"트랙명"</span>,
    <span class="token-key">"playTime"</span>: <span class="token-string">"03:45"</span>,
    <span class="token-key">"originTrackYn"</span>: <span class="token-string">"Y"</span>,
    <span class="token-key">"adultAuthYn"</span>: <span class="token-string">"N"</span>,
    <span class="token-key">"titleYn"</span>: <span class="token-string">"Y"</span>,
    <span class="token-key">"artistList"</span>: [
      {
        <span class="token-key">"id"</span>: <span class="token-string">"9001"</span>,
        <span class="token-key">"name"</span>: <span class="token-string">"아티스트명"</span>,
        <span class="token-key">"roleName"</span>: <span class="token-string">"보컬"</span>,
        <span class="token-key">"rpYn"</span>: <span class="token-string">"Y"</span>
      }
    ],
    <span class="token-key">"album"</span>: {
      <span class="token-key">"id"</span>: <span class="token-string">"12345"</span>,
      <span class="token-key">"name"</span>: <span class="token-string">"앨범 타이틀"</span>,
      <span class="token-key">"releaseYmd"</span>: <span class="token-string">"20240315"</span>,
      <span class="token-key">"genreStyle"</span>: <span class="token-string">"K-POP"</span>,
      <span class="token-key">"albumTypeStr"</span>: <span class="token-string">"미니"</span>,
      <span class="token-key">"imgList"</span>: [
        { <span class="token-key">"size"</span>: <span class="token-number">400</span>, <span class="token-key">"url"</span>: <span class="token-string">"https://cdn.example.com/album.jpg"</span> }
      ]
    }
  }
}</pre>
    </div>

    <h4>에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc"><code>track.read</code> Scope 없음</td></tr>
        <tr><td><span class="error-code">404</span></td><td class="param-desc">해당 ID의 트랙을 찾을 수 없음</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ── 가사 조회 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/tracks/<span class="path-param">{id}</span>/lyrics</span>
    <span class="endpoint-desc">트랙 가사 조회</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">트랙 ID로 가사 정보를 조회합니다. 가사 포맷은 LRC(싱크드) 또는 일반 텍스트입니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">track.read</span>
    </div>

    <div class="callout callout-info">
      <span class="callout-icon">ℹ️</span>
      <div class="callout-body">
        <p>응답에 <code>Cache-Control: private, max-age=600</code> 헤더가 포함됩니다. 클라이언트 측 600초 캐시를 활용하세요.</p>
      </div>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">id</td>
          <td class="param-type">Long</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">트랙 ID</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙 ID</td></tr>
        <tr><td class="param-name">lyrics</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">가사 텍스트 (LRC 형식 또는 일반 텍스트)</td></tr>
        <tr>
          <td class="param-name">type</td>
          <td class="param-type">Enum</td>
          <td><span class="param-req req-required">항상</span></td>
          <td class="param-desc">
            <code>LRC</code> — 싱크드 가사 (타임스탬프 포함)<br/>
            <code>NORMAL</code> — 일반 텍스트 가사
          </td>
        </tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/tracks/111/lyrics"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span></pre>
    </div>

    <h4>응답 예시 (LRC 타입)</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">JSON</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>{
  <span class="token-key">"code"</span>: <span class="token-string">"200"</span>,
  <span class="token-key">"message"</span>: <span class="token-string">"SUCCESS"</span>,
  <span class="token-key">"data"</span>: {
    <span class="token-key">"id"</span>: <span class="token-string">"111"</span>,
    <span class="token-key">"type"</span>: <span class="token-string">"LRC"</span>,
    <span class="token-key">"lyrics"</span>: <span class="token-string">"[00:12.00]첫 번째 가사\n[00:15.50]두 번째 가사\n[00:20.00]세 번째 가사"</span>
  }
}</pre>
    </div>
  </div>
</div>
`);
