registerSection('api-stream', `
<div class="page-hero">
  <span class="page-tag">API Reference</span>
  <h1>스트리밍 (Stream)</h1>
  <p>트랙 재생 URL을 조회합니다. <code>stream.read</code> Scope와 디바이스 헤더가 필요합니다.</p>
</div>

<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/resources/<span class="path-param">{resourceId}</span>/listen/url</span>
    <span class="endpoint-desc">재생 URL 조회</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">트랙 ID로 스트리밍 재생 URL을 조회합니다. 현재 버전은 비트레이트(<code>aac</code>) 및 리소스 타입(<code>TRACK</code>)이 서버 기본값으로 고정됩니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">stream.read</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">resourceId</td>
          <td class="param-type">Long</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">스트리밍할 리소스 ID (트랙 ID)</td>
        </tr>
      </tbody>
    </table>

    <div class="callout callout-info">
      <span class="callout-icon">ℹ️</span>
      <div class="callout-body">
        <p>현재 버전에서는 별도의 Query Parameter를 받지 않습니다. 비트레이트(<code>aac</code>), 리소스 타입(<code>TRACK</code>) 등은 서버 내부 기본값으로 처리됩니다.</p>
      </div>
    </div>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">url</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">재생 URL</td></tr>
        <tr><td class="param-name">bitrate</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">실제 제공된 비트레이트</td></tr>
        <tr><td class="param-name">hlsYn</td><td class="param-type">YnType</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">HLS 스트리밍 여부</td></tr>
        <tr><td class="param-name">freeYn</td><td class="param-type">YnType</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">무료 재생 여부</td></tr>
        <tr><td class="param-name">fullYn</td><td class="param-type">YnType</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">전체 재생 가능 여부</td></tr>
        <tr><td class="param-name">nonce</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">보안 nonce 값</td></tr>
        <tr><td class="param-name">signature</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">보안 서명 값</td></tr>
        <tr><td class="param-name">loudness</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">오디오 라우드니스 값</td></tr>
        <tr><td class="param-name">sttToken</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">정산용 토큰</td></tr>
        <tr><td class="param-name">resourcePlaySessionId</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">재생 세션 ID</td></tr>
        <tr><td class="param-name">serverTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">서버 시각</td></tr>
        <tr><td class="param-name">customCode</td><td class="param-type">Int</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">커스텀 에러 코드 (정상 시 없음)</td></tr>
        <tr><td class="param-name">customMsg</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">커스텀 에러 메시지</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/resources/111/listen/url"</span> \\
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
    <span class="token-key">"url"</span>: <span class="token-string">"https://stream.music-flo.com/path/to/track.m4a?token=..."</span>,
    <span class="token-key">"bitrate"</span>: <span class="token-string">"aac"</span>,
    <span class="token-key">"hlsYn"</span>: <span class="token-string">"N"</span>,
    <span class="token-key">"freeYn"</span>: <span class="token-string">"N"</span>,
    <span class="token-key">"fullYn"</span>: <span class="token-string">"Y"</span>,
    <span class="token-key">"nonce"</span>: <span class="token-string">"abc123"</span>,
    <span class="token-key">"signature"</span>: <span class="token-string">"sig_xyz"</span>,
    <span class="token-key">"loudness"</span>: <span class="token-string">"-9.5"</span>,
    <span class="token-key">"sttToken"</span>: <span class="token-string">"stt_token_value"</span>,
    <span class="token-key">"resourcePlaySessionId"</span>: <span class="token-string">"session-uuid"</span>,
    <span class="token-key">"serverTime"</span>: <span class="token-string">"20240315143000"</span>
  }
}</pre>
    </div>

    <h4>에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">400</span></td><td class="param-desc">잘못된 파라미터 (resourceId가 숫자가 아닌 경우 등)</td></tr>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc"><code>stream.read</code> Scope 없음 또는 재생 권한 없음</td></tr>
        <tr><td><span class="error-code">404</span></td><td class="param-desc">해당 ID의 트랙을 찾을 수 없음</td></tr>
      </tbody>
    </table>
  </div>
</div>
`);
