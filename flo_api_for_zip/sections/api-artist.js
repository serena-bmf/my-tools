registerSection('api-artist', `
<div class="page-hero">
  <span class="page-tag">API Reference</span>
  <h1>아티스트 (Artist)</h1>
  <p>아티스트 상세 정보를 조회합니다. 모든 요청에 <code>artist.read</code> Scope가 필요합니다.</p>
</div>

<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/artists/<span class="path-param">{id}</span></span>
    <span class="endpoint-desc">아티스트 상세 조회</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">아티스트 ID로 상세 정보를 조회합니다. 성별, 스타일, 그룹 유형, 이미지 정보 등을 포함합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">artist.read</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">id</td>
          <td class="param-type">Long</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">아티스트 ID</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">아티스트 ID</td></tr>
        <tr><td class="param-name">name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">아티스트명</td></tr>
        <tr><td class="param-name">genderCdStr</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">성별</td></tr>
        <tr><td class="param-name">artistStyle</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">스타일/장르</td></tr>
        <tr><td class="param-name">artistGroupTypeStr</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">그룹 유형 (예: 솔로, 그룹)</td></tr>
        <tr><td class="param-name">imgList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">아티스트 이미지 목록 → <code>size</code>, <code>url</code></td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/artists/9001"</span> \\
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
    <span class="token-key">"id"</span>: <span class="token-string">"9001"</span>,
    <span class="token-key">"name"</span>: <span class="token-string">"아티스트명"</span>,
    <span class="token-key">"genderCdStr"</span>: <span class="token-string">"남성"</span>,
    <span class="token-key">"artistStyle"</span>: <span class="token-string">"K-POP"</span>,
    <span class="token-key">"artistGroupTypeStr"</span>: <span class="token-string">"솔로"</span>,
    <span class="token-key">"imgList"</span>: [
      { <span class="token-key">"size"</span>: <span class="token-number">400</span>, <span class="token-key">"url"</span>: <span class="token-string">"https://cdn.example.com/artist.jpg"</span> }
    ]
  }
}</pre>
    </div>

    <h4>에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc"><code>artist.read</code> Scope 없음</td></tr>
        <tr><td><span class="error-code">404</span></td><td class="param-desc">해당 ID의 아티스트를 찾을 수 없음</td></tr>
      </tbody>
    </table>
  </div>
</div>
`);
