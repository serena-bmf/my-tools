registerSection('api-history', `
<div class="page-hero">
  <span class="page-tag">API Reference</span>
  <h1>히스토리 (History)</h1>
  <p>사용자의 청취 이력을 등록합니다. <code>history.write</code> Scope와 디바이스 헤더가 필요합니다.</p>
</div>

<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-post">POST</span>
    <span class="endpoint-path">/v1/histories/listen/resource</span>
    <span class="endpoint-desc">청취 이력 등록</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">트랙 재생 이벤트(시작, 1분, 종료, 일시정지 등)를 서버에 기록합니다. 재생 통계 및 정산에 사용됩니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">history.write</span>
    </div>

    <h4>Request Body</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">logType</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">
            로그 타입<br/>
            <code>STRT</code> — 재생 시작<br/>
            <code>1MIN</code> — 1분 경과<br/>
            <code>MEND</code> — 재생 종료<br/>
            <code>SPD_CHG</code> — 재생 속도 변경<br/>
            <code>PAUSE</code> — 일시정지<br/>
            <code>RESUME</code> — 재개
          </td>
        </tr>
        <tr><td class="param-name">resourceId</td><td class="param-type">Long</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">트랙 ID</td></tr>
        <tr><td class="param-name">sessionId</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">재생 세션 UUID (Stream API 응답의 <code>resourcePlaySessionId</code>)</td></tr>
        <tr><td class="param-name">sttToken</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">정산 토큰 (Stream API 응답의 <code>sttToken</code>)</td></tr>
        <tr><td class="param-name">sourceType</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">재생 소스 타입 (예: <code>STRM</code>)</td></tr>
        <tr><td class="param-name">osType</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">OS 타입 (<code>AOS</code> / <code>IOS</code> / <code>WEB</code>)</td></tr>
        <tr><td class="param-name">quality</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">재생 품질/비트레이트</td></tr>
        <tr><td class="param-name">playedSeconds</td><td class="param-type">Long</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">실제 재생된 시간 (초)</td></tr>
        <tr><td class="param-name">totalTimeDurationSeconds</td><td class="param-type">Long</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">트랙 전체 재생 시간 (초)</td></tr>
        <tr><td class="param-name">freeYn</td><td class="param-type">YnType</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">무료 재생 여부 (Y/N)</td></tr>
        <tr><td class="param-name">playOfflineYn</td><td class="param-type">YnType</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">오프라인 재생 여부 (Y/N)</td></tr>
        <tr><td class="param-name">albumId</td><td class="param-type">Long</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 ID</td></tr>
        <tr><td class="param-name">addDateTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">이벤트 발생 시각 (YYYYMMDDHHmmss)</td></tr>
        <tr><td class="param-name">clientTimeMillis</td><td class="param-type">Long</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">클라이언트 타임스탬프 (Unix milliseconds)</td></tr>
        <tr><td class="param-name">speed</td><td class="param-type">Int</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">재생 속도 (예: 100 = 1.0x, 150 = 1.5x)</td></tr>
        <tr><td class="param-name">volume</td><td class="param-type">Int</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">볼륨 레벨</td></tr>
        <tr><td class="param-name">fullYn</td><td class="param-type">YnType</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">전곡 재생 여부 (Y/N)</td></tr>
        <tr><td class="param-name">traceType</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">재생 진입 경로</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X POST \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/histories/listen/resource"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \\
  -H <span class="token-string">"Content-Type: application/json"</span> \\
  -d <span class="token-string">'{
    "logType": "STRT",
    "resourceId": 111,
    "sessionId": "session-uuid",
    "sttToken": "stt_token_value",
    "quality": "aac",
    "playedSeconds": 0,
    "totalTimeDurationSeconds": 225,
    "freeYn": "N",
    "addDateTime": "20240315143000",
    "clientTimeMillis": 1710504600000
  }'</span></pre>
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
  <span class="token-key">"data"</span>: <span class="token-keyword">null</span>
}</pre>
    </div>

    <h4>에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">400</span></td><td class="param-desc"><code>logType</code> 누락 또는 잘못된 값</td></tr>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc"><code>history.write</code> Scope 없음</td></tr>
      </tbody>
    </table>
  </div>
</div>
`);
