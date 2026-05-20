registerSection('api-auth', `
<div class="page-hero">
  <span class="page-tag">API 인증</span>
  <h1>Gateway 인증 가이드</h1>
  <p>외부 개발자는 FLO Open API Gateway를 통해 Resource 서버로 라우팅됩니다. 모든 API 요청에는 OAuth Access Token과 컨텍스트 헤더가 필요합니다.</p>
</div>

<h2>환경별 도메인</h2>
<table class="info-table">
  <thead>
    <tr><th>환경</th><th>인증 서버 (OAuth)</th><th>API 서버</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="param-req" style="background:rgba(52,211,153,0.12);color:#34d399;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;">dev</span></td>
      <td><code>accounts.dev.music-flo.com</code></td>
      <td><code>openapi.dev.music-flo.com</code></td>
    </tr>
    <tr>
      <td><span class="param-req" style="background:rgba(251,191,36,0.12);color:#fbbf24;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;">qa</span></td>
      <td><code>accounts.qa.music-flo.com</code></td>
      <td><code>openapi.qa.music-flo.com</code></td>
    </tr>
    <tr>
      <td><span class="param-req" style="background:rgba(79,142,247,0.12);color:#4f8ef7;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;">prod</span></td>
      <td><code>accounts.music-flo.com</code></td>
      <td><code>openapi.music-flo.com</code></td>
    </tr>
  </tbody>
</table>

<div class="callout callout-info">
  <span class="callout-icon">ℹ️</span>
  <div class="callout-body">
    <p>상단의 <strong>ENV 스위처</strong>를 변경하면 이 페이지의 모든 예시 코드 도메인이 자동으로 바뀝니다.</p>
  </div>
</div>

<h2>아키텍처 개요</h2>
<div class="flow-box">
  <div class="flow-step">
    <div class="flow-dot active">1</div>
    <div class="flow-text">
      <strong>클라이언트 앱</strong>
      <p>FLO OAuth를 통해 Access Token을 발급받습니다.</p>
    </div>
  </div>
  <div class="flow-step">
    <div class="flow-dot active">2</div>
    <div class="flow-text">
      <strong>API Gateway</strong>
      <p>Access Token의 유효성을 검증하고 Scope를 확인합니다. 검증된 요청을 Resource 서버로 안전하게 전달합니다.</p>
    </div>
  </div>
  <div class="flow-step">
    <div class="flow-dot active">3</div>
    <div class="flow-text">
      <strong>Resource 서버</strong>
      <p>Gateway가 주입한 컨텍스트 헤더를 기반으로 요청을 처리하고 응답을 반환합니다.</p>
    </div>
  </div>
</div>

<h2>요청 헤더</h2>

<h3>공통 필수 헤더</h3>
<table class="param-table">
  <thead>
    <tr><th>헤더명</th><th>타입</th><th>필수</th><th>설명</th></tr>
  </thead>
  <tbody>
    <tr>
      <td class="param-name">Authorization</td>
      <td class="param-type">String</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc"><code>Bearer {access_token}</code> 형식으로 전달. Gateway가 이 토큰을 검증하여 사용자 컨텍스트를 식별합니다.</td>
    </tr>
  </tbody>
</table>

<h2>요청 예시</h2>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">cURL</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/tracks/12345"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \\
  -H <span class="token-string">"Content-Type: application/json"</span></pre>
</div>

<h2>인증 에러 응답</h2>
<table class="info-table">
  <thead>
    <tr><th>HTTP Status</th><th>설명</th><th>조치</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="error-code">401</span></td>
      <td>Access Token 없음 또는 만료</td>
      <td>Refresh Token으로 Access Token 재발급</td>
    </tr>
    <tr>
      <td><span class="error-code">403</span></td>
      <td>Scope 권한 부족</td>
      <td>Authorization Request 시 필요한 Scope 포함 확인</td>
    </tr>
  </tbody>
</table>

<h2>Scope 목록</h2>
<p>각 API는 특정 Scope를 요구합니다. Authorization Request 시 필요한 Scope를 미리 포함해야 합니다.</p>
<table class="info-table">
  <thead>
    <tr><th>Scope</th><th>설명</th></tr>
  </thead>
  <tbody>
    <tr><td><code>album.read</code></td><td>앨범 정보 조회</td></tr>
    <tr><td><code>artist.read</code></td><td>아티스트 정보 조회</td></tr>
    <tr><td><code>track.read</code></td><td>트랙 정보 및 가사 조회</td></tr>
    <tr><td><code>search.read</code></td><td>검색</td></tr>
    <tr><td><code>stream.read</code></td><td>스트리밍 URL 조회</td></tr>
    <tr><td><code>history.write</code></td><td>청취 이력 등록</td></tr>
    <tr><td><code>floparty.session.read</code></td><td>FLO Party 세션 조회</td></tr>
    <tr><td><code>floparty.session.write</code></td><td>FLO Party 세션 생성/변경/종료</td></tr>
    <tr><td><code>personal.playlist.read</code></td><td>내 보관함 리스트 조회</td></tr>
    <tr><td><code>personal.playlist.write</code></td><td>내 보관함 리스트 생성/수정/삭제</td></tr>
  </tbody>
</table>
`);
