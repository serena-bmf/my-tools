registerSection('api-album', `
<div class="page-hero">
  <span class="page-tag">API Reference</span>
  <h1>앨범 (Album)</h1>
  <p>앨범 상세 정보 및 수록곡 목록을 조회합니다. 모든 요청에 <code>album.read</code> Scope가 필요합니다.</p>
</div>

<!-- ── 앨범 상세 조회 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/albums/<span class="path-param">{id}</span></span>
    <span class="endpoint-desc">앨범 상세 조회</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">앨범 ID로 앨범의 상세 정보를 조회합니다. 아티스트 목록, 이미지, 레이블 정보 등을 포함합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">album.read</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">id</td>
          <td class="param-type">Long</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">앨범 ID</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">앨범 ID</td></tr>
        <tr><td class="param-name">name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">앨범명</td></tr>
        <tr><td class="param-name">releaseYmd</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">발매일 (YYYYMMDD)</td></tr>
        <tr><td class="param-name">genreStyle</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">장르/스타일</td></tr>
        <tr><td class="param-name">albumTypeStr</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 타입 (예: 미니, 정규)</td></tr>
        <tr><td class="param-name">albumDesc</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 설명</td></tr>
        <tr><td class="param-name">artistList</td><td class="param-type">Array</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">아티스트 목록 → <code>id</code>, <code>name</code></td></tr>
        <tr><td class="param-name">imgList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 이미지 목록 → <code>size</code>, <code>url</code></td></tr>
        <tr><td class="param-name">albumLabelList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">레이블 목록 → <code>labelId</code>, <code>labelNm</code></td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/albums/12345"</span> \\
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
    <span class="token-key">"id"</span>: <span class="token-string">"12345"</span>,
    <span class="token-key">"name"</span>: <span class="token-string">"앨범 타이틀"</span>,
    <span class="token-key">"releaseYmd"</span>: <span class="token-string">"20240315"</span>,
    <span class="token-key">"genreStyle"</span>: <span class="token-string">"K-POP"</span>,
    <span class="token-key">"albumTypeStr"</span>: <span class="token-string">"미니"</span>,
    <span class="token-key">"albumDesc"</span>: <span class="token-string">"앨범 소개 텍스트"</span>,
    <span class="token-key">"artistList"</span>: [
      { <span class="token-key">"id"</span>: <span class="token-string">"9001"</span>, <span class="token-key">"name"</span>: <span class="token-string">"아티스트명"</span> }
    ],
    <span class="token-key">"imgList"</span>: [
      { <span class="token-key">"size"</span>: <span class="token-number">400</span>, <span class="token-key">"url"</span>: <span class="token-string">"https://cdn.example.com/album.jpg"</span> }
    ],
    <span class="token-key">"albumLabelList"</span>: [
      { <span class="token-key">"labelId"</span>: <span class="token-string">"L001"</span>, <span class="token-key">"labelNm"</span>: <span class="token-string">"레이블명"</span> }
    ]
  }
}</pre>
    </div>

    <h4>에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc"><code>album.read</code> Scope 없음</td></tr>
        <tr><td><span class="error-code">404</span></td><td class="param-desc">해당 ID의 앨범을 찾을 수 없음</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ── 앨범 트랙 목록 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/albums/<span class="path-param">{id}</span>/tracks</span>
    <span class="endpoint-desc">앨범 수록곡 목록</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">앨범에 수록된 트랙 목록을 조회합니다. 앨범 또는 트랙이 없는 경우 빈 배열을 반환합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">album.read</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">id</td>
          <td class="param-type">Long</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">앨범 ID</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드 — items 배열 내 각 트랙</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙 ID</td></tr>
        <tr><td class="param-name">agencyId</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">권리사 ID</td></tr>
        <tr><td class="param-name">name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙명</td></tr>
        <tr><td class="param-name">playTime</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">재생 시간 (mm:ss)</td></tr>
        <tr><td class="param-name">diskId</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">디스크 번호</td></tr>
        <tr><td class="param-name">trackNo</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">디스크 내 트랙 번호</td></tr>
        <tr><td class="param-name">originTrackYn</td><td class="param-type">YnType</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">원곡 여부 (Y/N)</td></tr>
        <tr><td class="param-name">adultAuthYn</td><td class="param-type">YnType</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">성인 인증 필요 여부 (Y/N)</td></tr>
        <tr><td class="param-name">freeYn</td><td class="param-type">YnType</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">무료 재생 가능 여부 (Y/N)</td></tr>
        <tr><td class="param-name">titleYn</td><td class="param-type">YnType</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">타이틀곡 여부 (Y/N)</td></tr>
        <tr><td class="param-name">artistList</td><td class="param-type">Array</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">아티스트 목록 → <code>id</code>, <code>name</code></td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/albums/12345/tracks"</span> \\
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
    <span class="token-key">"items"</span>: [
      {
        <span class="token-key">"id"</span>: <span class="token-string">"111"</span>,
        <span class="token-key">"agencyId"</span>: <span class="token-string">"AG001"</span>,
        <span class="token-key">"name"</span>: <span class="token-string">"트랙명"</span>,
        <span class="token-key">"playTime"</span>: <span class="token-string">"03:45"</span>,
        <span class="token-key">"diskId"</span>: <span class="token-string">"1"</span>,
        <span class="token-key">"trackNo"</span>: <span class="token-string">"1"</span>,
        <span class="token-key">"originTrackYn"</span>: <span class="token-string">"Y"</span>,
        <span class="token-key">"adultAuthYn"</span>: <span class="token-string">"N"</span>,
        <span class="token-key">"freeYn"</span>: <span class="token-string">"N"</span>,
        <span class="token-key">"titleYn"</span>: <span class="token-string">"Y"</span>,
        <span class="token-key">"artistList"</span>: [
          { <span class="token-key">"id"</span>: <span class="token-string">"9001"</span>, <span class="token-key">"name"</span>: <span class="token-string">"아티스트명"</span> }
        ]
      }
    ]
  }
}</pre>
    </div>
  </div>
</div>
`);
