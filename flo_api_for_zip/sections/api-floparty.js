registerSection('api-floparty', `
<div class="page-hero">
  <span class="page-tag">API Reference</span>
  <h1>FLO Party</h1>
  <p>함께 듣기 세션 관리 및 FLO ↔ Spotify 트랙 매핑 API입니다. 세션 API는 <code>floparty.session.read/write</code> Scope가 필요합니다.</p>
</div>

<div class="callout callout-info">
  <span class="callout-icon">ℹ️</span>
  <div class="callout-body">
    <p>모든 FLO Party API의 Base Path는 <code>/v1/floparty</code>입니다.</p>
  </div>
</div>

<!-- ── 세션 생성 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-post">POST</span>
    <span class="endpoint-path">/v1/floparty/sessions</span>
    <span class="endpoint-desc">파티 세션 생성</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">새 함께 듣기 세션을 생성합니다. 초기 플레이리스트 트랙 ID와 플레이리스트 버전을 설정할 수 있습니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">floparty.session.write</span>
    </div>

    <h4>Request Body</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">playlistTrackIds</td><td class="param-type">Array&lt;String&gt;</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">초기 플레이리스트 트랙 ID 목록</td></tr>
        <tr><td class="param-name">playlistVersion</td><td class="param-type">Int</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">플레이리스트 버전 번호</td></tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">sessionId</td><td class="param-type">String</td><td class="param-desc">생성된 세션 ID</td></tr>
        <tr><td class="param-name">playlistVersion</td><td class="param-type">Int</td><td class="param-desc">현재 플레이리스트 버전</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X POST \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/floparty/sessions"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \\
  -H <span class="token-string">"Content-Type: application/json"</span> \\
  -d <span class="token-string">'{
    "playlistTrackIds": ["111", "222", "333"],
    "playlistVersion": 1
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
  <span class="token-key">"data"</span>: {
    <span class="token-key">"sessionId"</span>: <span class="token-string">"session-uuid-abc123"</span>,
    <span class="token-key">"playlistVersion"</span>: <span class="token-number">1</span>
  }
}</pre>
    </div>
  </div>
</div>

<!-- ── 세션 싱크 조회 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/floparty/sessions/<span class="path-param">{sessionId}</span>/sync</span>
    <span class="endpoint-desc">세션 싱크 상태 조회</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">세션의 현재 재생 상태(playback), 플레이리스트, 재생 위치를 조회합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">floparty.session.read</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">sessionId</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">세션 ID</td></tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">timestamp</td><td class="param-type">Long</td><td class="param-desc">서버 타임스탬프 (epoch ms)</td></tr>
        <tr><td class="param-name">playback</td><td class="param-type">Object</td><td class="param-desc">재생 상태 정보</td></tr>
        <tr><td class="param-name">playback.status</td><td class="param-type">String</td><td class="param-desc">재생 상태 (예: <code>PLAY</code>, <code>PAUSE</code>)</td></tr>
        <tr><td class="param-name">playback.requestSequence</td><td class="param-type">Long</td><td class="param-desc">상태 변경 요청 시퀀스 번호</td></tr>
        <tr><td class="param-name">playback.playhead</td><td class="param-type">Long</td><td class="param-desc">현재 재생 위치 (ms)</td></tr>
        <tr><td class="param-name">playback.trackIndex</td><td class="param-type">Int</td><td class="param-desc">플레이리스트 내 현재 트랙 인덱스</td></tr>
        <tr><td class="param-name">playback.trackId</td><td class="param-type">String</td><td class="param-desc">현재 재생 중인 트랙 ID</td></tr>
        <tr><td class="param-name">playback.startEpoch</td><td class="param-type">Long</td><td class="param-desc">재생 시작 시각 (epoch ms)</td></tr>
        <tr><td class="param-name">playlist</td><td class="param-type">Array</td><td class="param-desc">플레이리스트 트랙 목록 (선택)</td></tr>
        <tr><td class="param-name">playlist[].id</td><td class="param-type">String</td><td class="param-desc">트랙 ID</td></tr>
        <tr><td class="param-name">playlist[].name</td><td class="param-type">String</td><td class="param-desc">트랙명</td></tr>
        <tr><td class="param-name">playlist[].representationArtist</td><td class="param-type">Object</td><td class="param-desc">대표 아티스트 → <code>id</code>, <code>name</code></td></tr>
        <tr><td class="param-name">playlist[].artistList</td><td class="param-type">Array</td><td class="param-desc">전체 아티스트 목록 → <code>id</code>, <code>name</code></td></tr>
        <tr><td class="param-name">playlist[].album</td><td class="param-type">Object</td><td class="param-desc">앨범 정보 → <code>type</code>, <code>id</code>, <code>title</code>, <code>releaseYmd</code>, <code>imgList</code></td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/floparty/sessions/session-uuid-abc123/sync"</span> \\
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
    <span class="token-key">"timestamp"</span>: <span class="token-number">1710504600000</span>,
    <span class="token-key">"playback"</span>: {
      <span class="token-key">"status"</span>: <span class="token-string">"PLAY"</span>,
      <span class="token-key">"requestSequence"</span>: <span class="token-number">3</span>,
      <span class="token-key">"playhead"</span>: <span class="token-number">45000</span>,
      <span class="token-key">"trackIndex"</span>: <span class="token-number">1</span>,
      <span class="token-key">"trackId"</span>: <span class="token-string">"222"</span>,
      <span class="token-key">"startEpoch"</span>: <span class="token-number">1710504555000</span>
    },
    <span class="token-key">"playlist"</span>: [
      {
        <span class="token-key">"id"</span>: <span class="token-string">"111"</span>,
        <span class="token-key">"name"</span>: <span class="token-string">"트랙명 1"</span>,
        <span class="token-key">"representationArtist"</span>: { <span class="token-key">"id"</span>: <span class="token-string">"a1"</span>, <span class="token-key">"name"</span>: <span class="token-string">"아티스트"</span> },
        <span class="token-key">"artistList"</span>: [{ <span class="token-key">"id"</span>: <span class="token-string">"a1"</span>, <span class="token-key">"name"</span>: <span class="token-string">"아티스트"</span> }],
        <span class="token-key">"album"</span>: {
          <span class="token-key">"type"</span>: <span class="token-string">"SINGLE"</span>,
          <span class="token-key">"id"</span>: <span class="token-string">"alb1"</span>,
          <span class="token-key">"title"</span>: <span class="token-string">"앨범명"</span>,
          <span class="token-key">"releaseYmd"</span>: <span class="token-string">"20240315"</span>,
          <span class="token-key">"imgList"</span>: [{ <span class="token-key">"size"</span>: <span class="token-number">500</span>, <span class="token-key">"url"</span>: <span class="token-string">"https://..."</span> }]
        }
      }
    ]
  }
}</pre>
    </div>
  </div>
</div>

<!-- ── 재생 상태 변경 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-put">PUT</span>
    <span class="endpoint-path">/v1/floparty/sessions/<span class="path-param">{sessionId}</span>/playback</span>
    <span class="endpoint-desc">재생 상태 변경</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">세션의 재생 상태를 변경합니다. 변경 전(current)과 변경 후(next) 상태를 함께 전달합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">floparty.session.write</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">sessionId</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">세션 ID</td></tr>
      </tbody>
    </table>

    <h4>Request Body</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">next</td><td class="param-type">Object</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">변경할 재생 상태</td></tr>
        <tr><td class="param-name">next.status</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">목표 재생 상태 (예: <code>PLAY</code>, <code>PAUSE</code>)</td></tr>
        <tr><td class="param-name">next.trackIndex</td><td class="param-type">Int</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">목표 트랙 인덱스</td></tr>
        <tr><td class="param-name">next.playhead</td><td class="param-type">Long</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">목표 재생 위치 (ms)</td></tr>
        <tr><td class="param-name">current</td><td class="param-type">Object</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">현재 재생 상태</td></tr>
        <tr><td class="param-name">current.status</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">현재 재생 상태</td></tr>
        <tr><td class="param-name">current.trackIndex</td><td class="param-type">Int</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">현재 트랙 인덱스</td></tr>
        <tr><td class="param-name">current.playhead</td><td class="param-type">Long</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">현재 재생 위치 (ms)</td></tr>
        <tr><td class="param-name">requestSequence</td><td class="param-type">Long</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">요청 시퀀스 번호 (순서 충돌 방지용)</td></tr>
        <tr><td class="param-name">playlistVersion</td><td class="param-type">Int</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">현재 플레이리스트 버전</td></tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">playback</td><td class="param-type">Object</td><td class="param-desc">변경된 재생 상태 (PlaybackInfo)</td></tr>
        <tr><td class="param-name">playback.status</td><td class="param-type">String</td><td class="param-desc">재생 상태</td></tr>
        <tr><td class="param-name">playback.requestSequence</td><td class="param-type">Long</td><td class="param-desc">처리된 시퀀스 번호</td></tr>
        <tr><td class="param-name">playback.playhead</td><td class="param-type">Long</td><td class="param-desc">재생 위치 (ms)</td></tr>
        <tr><td class="param-name">playback.trackIndex</td><td class="param-type">Int</td><td class="param-desc">트랙 인덱스</td></tr>
        <tr><td class="param-name">playback.trackId</td><td class="param-type">String</td><td class="param-desc">트랙 ID</td></tr>
        <tr><td class="param-name">playback.startEpoch</td><td class="param-type">Long</td><td class="param-desc">재생 시작 시각 (epoch ms)</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X PUT \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/floparty/sessions/session-uuid-abc123/playback"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \\
  -H <span class="token-string">"Content-Type: application/json"</span> \\
  -d <span class="token-string">'{
    "next": { "status": "PAUSE", "trackIndex": 1, "playhead": 45000 },
    "current": { "status": "PLAY", "trackIndex": 1, "playhead": 44800 },
    "requestSequence": 4,
    "playlistVersion": 1
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
  <span class="token-key">"data"</span>: {
    <span class="token-key">"playback"</span>: {
      <span class="token-key">"status"</span>: <span class="token-string">"PAUSE"</span>,
      <span class="token-key">"requestSequence"</span>: <span class="token-number">4</span>,
      <span class="token-key">"playhead"</span>: <span class="token-number">45000</span>,
      <span class="token-key">"trackIndex"</span>: <span class="token-number">1</span>,
      <span class="token-key">"trackId"</span>: <span class="token-string">"222"</span>,
      <span class="token-key">"startEpoch"</span>: <span class="token-number">1710504555000</span>
    }
  }
}</pre>
    </div>
  </div>
</div>

<!-- ── 플레이리스트 변경 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-put">PUT</span>
    <span class="endpoint-path">/v1/floparty/sessions/<span class="path-param">{sessionId}</span>/playlist</span>
    <span class="endpoint-desc">플레이리스트 변경</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">세션의 플레이리스트를 변경합니다. 새 트랙 ID 목록과 플레이리스트 버전을 전달합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">floparty.session.write</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">sessionId</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">세션 ID</td></tr>
      </tbody>
    </table>

    <h4>Request Body</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">playlistTrackIds</td><td class="param-type">Array&lt;String&gt;</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">변경할 트랙 ID 목록</td></tr>
        <tr><td class="param-name">playlistVersion</td><td class="param-type">Int</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">새 플레이리스트 버전 번호</td></tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">playlist</td><td class="param-type">Array</td><td class="param-desc">변경된 플레이리스트 트랙 목록 (TrackInfo)</td></tr>
        <tr><td class="param-name">playlist[].id</td><td class="param-type">String</td><td class="param-desc">트랙 ID</td></tr>
        <tr><td class="param-name">playlist[].name</td><td class="param-type">String</td><td class="param-desc">트랙명</td></tr>
        <tr><td class="param-name">playlist[].representationArtist</td><td class="param-type">Object</td><td class="param-desc">대표 아티스트 → <code>id</code>, <code>name</code></td></tr>
        <tr><td class="param-name">playlist[].artistList</td><td class="param-type">Array</td><td class="param-desc">전체 아티스트 목록 → <code>id</code>, <code>name</code></td></tr>
        <tr><td class="param-name">playlist[].album</td><td class="param-type">Object</td><td class="param-desc">앨범 정보 → <code>type</code>, <code>id</code>, <code>title</code>, <code>releaseYmd</code>, <code>imgList</code></td></tr>
        <tr><td class="param-name">playlistVersion</td><td class="param-type">Int</td><td class="param-desc">적용된 플레이리스트 버전</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X PUT \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/floparty/sessions/session-uuid-abc123/playlist"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \\
  -H <span class="token-string">"Content-Type: application/json"</span> \\
  -d <span class="token-string">'{
    "playlistTrackIds": ["444", "555", "666"],
    "playlistVersion": 2
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
  <span class="token-key">"data"</span>: {
    <span class="token-key">"playlist"</span>: [
      {
        <span class="token-key">"id"</span>: <span class="token-string">"444"</span>,
        <span class="token-key">"name"</span>: <span class="token-string">"트랙명 4"</span>,
        <span class="token-key">"representationArtist"</span>: { <span class="token-key">"id"</span>: <span class="token-string">"a2"</span>, <span class="token-key">"name"</span>: <span class="token-string">"아티스트 2"</span> },
        <span class="token-key">"artistList"</span>: [{ <span class="token-key">"id"</span>: <span class="token-string">"a2"</span>, <span class="token-key">"name"</span>: <span class="token-string">"아티스트 2"</span> }],
        <span class="token-key">"album"</span>: {
          <span class="token-key">"type"</span>: <span class="token-string">"ALBUM"</span>,
          <span class="token-key">"id"</span>: <span class="token-string">"alb2"</span>,
          <span class="token-key">"title"</span>: <span class="token-string">"앨범명 2"</span>,
          <span class="token-key">"releaseYmd"</span>: <span class="token-string">"20240101"</span>,
          <span class="token-key">"imgList"</span>: [{ <span class="token-key">"size"</span>: <span class="token-number">500</span>, <span class="token-key">"url"</span>: <span class="token-string">"https://..."</span> }]
        }
      }
    ],
    <span class="token-key">"playlistVersion"</span>: <span class="token-number">2</span>
  }
}</pre>
    </div>
  </div>
</div>

<!-- ── 세션 종료 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-delete">DEL</span>
    <span class="endpoint-path">/v1/floparty/sessions/<span class="path-param">{sessionId}</span></span>
    <span class="endpoint-desc">세션 종료</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">진행 중인 파티 세션을 종료합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">floparty.session.write</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">sessionId</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">세션 ID</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X DELETE \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/floparty/sessions/session-uuid-abc123"</span> \\
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
  <span class="token-key">"data"</span>: { <span class="token-key">"success"</span>: <span class="token-keyword">true</span> }
}</pre>
    </div>
  </div>
</div>

<hr class="divider" />
<h2>트랙 매핑 (Inspect)</h2>
<p>FLO 트랙과 외부 플랫폼(Spotify 등) 트랙 간의 매핑 정보를 조회합니다.</p>

<!-- ── FLO Inspect Enqueue ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-post">POST</span>
    <span class="endpoint-path">/v1/floparty/inspect/flo</span>
    <span class="endpoint-desc">FLO 트랙 매핑 요청</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">FLO 트랙 ID 목록을 제출하여 외부 플랫폼과의 매핑을 요청합니다.</p>

    <div class="callout callout-warning">
      <span class="callout-icon">⚠️</span>
      <div class="callout-body">
        <p>현재 이 API는 mockup 단계입니다. 요청은 수락되지만 실제 매핑 처리는 수행되지 않습니다.</p>
      </div>
    </div>

    <h4>Request Body</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">JSON</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>{
  <span class="token-key">"track_id_list"</span>: [<span class="token-string">"123456"</span>, <span class="token-string">"789012"</span>]
}</pre>
    </div>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X POST \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/floparty/inspect/flo"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \\
  -H <span class="token-string">"Content-Type: application/json"</span> \\
  -d <span class="token-string">'{ "track_id_list": ["123456", "789012"] }'</span></pre>
    </div>
  </div>
</div>

<!-- ── FLO Inspect Complete ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-post">POST</span>
    <span class="endpoint-path">/v1/floparty/inspect/flo/complete</span>
    <span class="endpoint-desc">FLO 트랙 매핑 결과 조회</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">FLO 트랙 ID로 매핑된 Spotify, Apple Music 트랙 ID를 조회합니다.</p>

    <h4>Request Body</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">flo</td><td class="param-type">Array&lt;String&gt;</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">매핑 결과를 조회할 FLO 트랙 ID 목록</td></tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">flo</td><td class="param-type">Array&lt;String&gt;</td><td class="param-desc">요청한 FLO 트랙 ID (echo)</td></tr>
        <tr><td class="param-name">spotify</td><td class="param-type">Array&lt;String&gt;</td><td class="param-desc">매핑된 Spotify 트랙 ID 목록</td></tr>
        <tr><td class="param-name">apple_music</td><td class="param-type">Array&lt;String&gt;</td><td class="param-desc">매핑된 Apple Music 트랙 ID 목록</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X POST \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/floparty/inspect/flo/complete"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \\
  -H <span class="token-string">"Content-Type: application/json"</span> \\
  -d <span class="token-string">'{ "flo": ["123456", "789012"] }'</span></pre>
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
    <span class="token-key">"flo"</span>: [<span class="token-string">"123456"</span>, <span class="token-string">"789012"</span>],
    <span class="token-key">"spotify"</span>: [<span class="token-string">"spotify_id_1"</span>, <span class="token-string">"spotify_id_2"</span>],
    <span class="token-key">"apple_music"</span>: [<span class="token-string">"apple_id_1"</span>, <span class="token-string">"apple_id_2"</span>]
  }
}</pre>
    </div>
  </div>
</div>

<!-- ── Spotify Inspect ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-post">POST</span>
    <span class="endpoint-path">/v1/floparty/inspect/spotify</span>
    <span class="endpoint-desc">Spotify 트랙 매핑 요청</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">Spotify 트랙 정보를 제출하여 FLO 트랙과의 매핑을 요청합니다. 트랙의 ISRC, 아티스트, 앨범 정보 등을 포함해야 합니다.</p>

    <h4>Request Body — tracks 배열 내 각 트랙 (모든 필드 필수)</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">tracks[].id</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">Spotify 트랙 ID</td></tr>
        <tr><td class="param-name">tracks[].name</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">트랙명</td></tr>
        <tr><td class="param-name">tracks[].duration_ms</td><td class="param-type">Long</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">재생 시간 (밀리초)</td></tr>
        <tr><td class="param-name">tracks[].album.id</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">Spotify 앨범 ID</td></tr>
        <tr><td class="param-name">tracks[].album.name</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">앨범명</td></tr>
        <tr><td class="param-name">tracks[].album.release_date</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">발매일 (YYYY-MM-DD)</td></tr>
        <tr><td class="param-name">tracks[].external_ids.isrc</td><td class="param-type">String</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">ISRC 코드</td></tr>
        <tr><td class="param-name">tracks[].artists</td><td class="param-type">Array</td><td><span class="param-req req-required">필수</span></td><td class="param-desc">아티스트 목록 (최소 1개) → <code>id</code>, <code>name</code></td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X POST \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/floparty/inspect/spotify"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \\
  -H <span class="token-string">"Content-Type: application/json"</span> \\
  -d <span class="token-string">'{
    "tracks": [
      {
        "id": "spotify_track_id",
        "name": "Track Name",
        "duration_ms": 225000,
        "album": {
          "id": "album_id",
          "name": "Album Name",
          "release_date": "2024-03-15"
        },
        "external_ids": {
          "isrc": "USRC17607839"
        },
        "artists": [
          { "id": "artist_id", "name": "Artist Name" }
        ]
      }
    ]
  }'</span></pre>
    </div>

    <h4>유효성 검사 에러</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">400</span></td><td class="param-desc">필수 필드 누락: <code>id</code>, <code>name</code>, <code>duration_ms</code>, <code>album.*</code>, <code>external_ids.isrc</code>, <code>artists</code> 중 하나라도 없거나 비어있는 경우</td></tr>
        <tr><td><span class="error-code">400</span></td><td class="param-desc"><code>artists</code> 배열이 비어있는 경우</td></tr>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
      </tbody>
    </table>
  </div>
</div>
`);
