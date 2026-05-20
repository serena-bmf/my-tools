registerSection('api-me-library', `
<div class="page-hero">
  <span class="page-tag">API Reference</span>
  <h1>내 보관함 (Me Library)</h1>
  <p>사용자 본인의 보관함에 저장된 내 리스트(플레이리스트)를 조회하고 관리합니다. 모든 요청에 OAuth Access Token이 필요합니다. Gateway가 토큰을 검증하여 사용자를 자동으로 식별합니다.</p>
</div>

<!-- ── 목록조회 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/me/library/playlists</span>
    <span class="endpoint-desc">보관함 내 리스트 목록조회</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">사용자의 보관함에 저장된 내 리스트 목록을 페이지 단위로 조회합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">personal.playlist.read</span>
    </div>

    <h4>Query Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">page</td>
          <td class="param-type">Int</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">페이지 번호 (0부터 시작, 기본값: 0)</td>
        </tr>
        <tr>
          <td class="param-name">size</td>
          <td class="param-type">Int</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">페이지당 항목 수 (기본값: 50)</td>
        </tr>
        <tr>
          <td class="param-name">sort</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">정렬 조건 (예: createDateTime,desc)</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>포함</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">content</td><td class="param-type">Array</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">내 리스트 목록</td></tr>
        <tr><td class="param-name">content[].id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">내 리스트 ID</td></tr>
        <tr><td class="param-name">content[].name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">내 리스트 이름</td></tr>
        <tr><td class="param-name">content[].description</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">내 리스트 소개글</td></tr>
        <tr><td class="param-name">content[].trackCount</td><td class="param-type">Int</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙 개수</td></tr>
        <tr><td class="param-name">content[].createDateTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">생성 일시 (ISO 8601)</td></tr>
        <tr><td class="param-name">content[].updateDateTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">수정 일시 (ISO 8601)</td></tr>
        <tr><td class="param-name">totalElements</td><td class="param-type">Long</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">전체 항목 수</td></tr>
        <tr><td class="param-name">totalPages</td><td class="param-type">Int</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">전체 페이지 수</td></tr>
        <tr><td class="param-name">number</td><td class="param-type">Int</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">현재 페이지 번호</td></tr>
        <tr><td class="param-name">size</td><td class="param-type">Int</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">페이지 크기</td></tr>
        <tr><td class="param-name">first</td><td class="param-type">Boolean</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">첫 번째 페이지 여부</td></tr>
        <tr><td class="param-name">last</td><td class="param-type">Boolean</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">마지막 페이지 여부</td></tr>
        <tr><td class="param-name">empty</td><td class="param-type">Boolean</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">결과가 비어 있는지 여부</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/me/library/playlists?page=0&size=20"</span> \
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
    <span class="token-key">"content"</span>: [
      {
        <span class="token-key">"id"</span>: <span class="token-string">"123456789"</span>,
        <span class="token-key">"name"</span>: <span class="token-string">"내가 좋아하는 노래들"</span>,
        <span class="token-key">"description"</span>: <span class="token-string">"출퇴근 길에 듣는 플레이리스트"</span>,
        <span class="token-key">"trackCount"</span>: <span class="token-number">42</span>,
        <span class="token-key">"createDateTime"</span>: <span class="token-string">"2025-05-01T10:00:00"</span>,
        <span class="token-key">"updateDateTime"</span>: <span class="token-string">"2025-05-10T14:30:00"</span>
      },
      {
        <span class="token-key">"id"</span>: <span class="token-string">"987654321"</span>,
        <span class="token-key">"name"</span>: <span class="token-string">"운동할 때"</span>,
        <span class="token-key">"description"</span>: <span class="token-keyword">null</span>,
        <span class="token-key">"trackCount"</span>: <span class="token-number">15</span>,
        <span class="token-key">"createDateTime"</span>: <span class="token-string">"2025-04-20T09:00:00"</span>,
        <span class="token-key">"updateDateTime"</span>: <span class="token-string">"2025-04-20T09:00:00"</span>
      }
    ],
    <span class="token-key">"totalElements"</span>: <span class="token-number">2</span>,
    <span class="token-key">"totalPages"</span>: <span class="token-number">1</span>,
    <span class="token-key">"number"</span>: <span class="token-number">0</span>,
    <span class="token-key">"size"</span>: <span class="token-number">20</span>,
    <span class="token-key">"first"</span>: <span class="token-keyword">true</span>,
    <span class="token-key">"last"</span>: <span class="token-keyword">true</span>,
    <span class="token-key">"empty"</span>: <span class="token-keyword">false</span>
  }
}</pre>
    </div>

    <h4>에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">400</span></td><td class="param-desc">잘못된 요청 파라미터</td></tr>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc">Scope 권한 없음 (personal.playlist.read 필요)</td></tr>
        <tr><td><span class="error-code">500</span></td><td class="param-desc">서버 내부 오류</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ── 상세조회 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/me/library/playlists/<span class="path-param">{playlistId}</span></span>
    <span class="endpoint-desc">보관함 내 리스트 상세조회</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">특정 내 리스트의 상세 정보와 수록된 트랙 전체 목록을 조회합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">personal.playlist.read</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">playlistId</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">내 리스트 ID (숫자 형식이어야 함)</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>포함</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">내 리스트 ID</td></tr>
        <tr><td class="param-name">name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">내 리스트 이름</td></tr>
        <tr><td class="param-name">description</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">내 리스트 소개글</td></tr>
        <tr><td class="param-name">trackCount</td><td class="param-type">Int</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙 개수</td></tr>
        <tr><td class="param-name">createDateTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">생성 일시 (ISO 8601)</td></tr>
        <tr><td class="param-name">updateDateTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">수정 일시 (ISO 8601)</td></tr>
        <tr><td class="param-name">trackList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">수록 트랙 목록 (최대 1000곡)</td></tr>
        <tr><td class="param-name">trackList[].id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙 ID</td></tr>
        <tr><td class="param-name">trackList[].name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙명</td></tr>
        <tr><td class="param-name">trackList[].playTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">재생 시간 (HH:mm:ss)</td></tr>
        <tr><td class="param-name">trackList[].adultAuthYn</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">성인 인증 필요 여부 (Y / N)</td></tr>
        <tr><td class="param-name">trackList[].titleYn</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">타이틀 곡 여부 (Y / N)</td></tr>
        <tr><td class="param-name">trackList[].originTrackYn</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">원곡 여부 (Y / N)</td></tr>
        <tr><td class="param-name">trackList[].artistList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">아티스트 목록</td></tr>
        <tr><td class="param-name">trackList[].artistList[].id</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">아티스트 ID</td></tr>
        <tr><td class="param-name">trackList[].artistList[].name</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">아티스트명</td></tr>
        <tr><td class="param-name">trackList[].album</td><td class="param-type">Object</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 정보</td></tr>
        <tr><td class="param-name">trackList[].album.id</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 ID</td></tr>
        <tr><td class="param-name">trackList[].album.name</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범명</td></tr>
        <tr><td class="param-name">trackList[].album.releaseYmd</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">발매일 (YYYYMMDD)</td></tr>
        <tr><td class="param-name">trackList[].album.genreStyle</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">장르 스타일</td></tr>
        <tr><td class="param-name">trackList[].album.albumType</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 타입 코드</td></tr>
        <tr><td class="param-name">trackList[].album.albumTypeStr</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 타입 설명</td></tr>
        <tr><td class="param-name">trackList[].album.imgList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 이미지 목록</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/me/library/playlists/123456789"</span> \
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
    <span class="token-key">"id"</span>: <span class="token-string">"123456789"</span>,
    <span class="token-key">"name"</span>: <span class="token-string">"내가 좋아하는 노래들"</span>,
    <span class="token-key">"description"</span>: <span class="token-string">"출퇴근 길에 듣는 플레이리스트"</span>,
    <span class="token-key">"trackCount"</span>: <span class="token-number">2</span>,
    <span class="token-key">"createDateTime"</span>: <span class="token-string">"2025-05-01T10:00:00"</span>,
    <span class="token-key">"updateDateTime"</span>: <span class="token-string">"2025-05-10T14:30:00"</span>,
    <span class="token-key">"trackList"</span>: [
      {
        <span class="token-key">"id"</span>: <span class="token-string">"418121111"</span>,
        <span class="token-key">"name"</span>: <span class="token-string">"Dynamite"</span>,
        <span class="token-key">"playTime"</span>: <span class="token-string">"00:03:19"</span>,
        <span class="token-key">"adultAuthYn"</span>: <span class="token-string">"N"</span>,
        <span class="token-key">"titleYn"</span>: <span class="token-string">"Y"</span>,
        <span class="token-key">"originTrackYn"</span>: <span class="token-string">"Y"</span>,
        <span class="token-key">"artistList"</span>: [
          { <span class="token-key">"id"</span>: <span class="token-string">"80772543"</span>, <span class="token-key">"name"</span>: <span class="token-string">"BTS"</span> }
        ],
        <span class="token-key">"album"</span>: {
          <span class="token-key">"id"</span>: <span class="token-string">"310231043"</span>,
          <span class="token-key">"name"</span>: <span class="token-string">"Dynamite (DayTime Version)"</span>,
          <span class="token-key">"releaseYmd"</span>: <span class="token-string">"20200821"</span>,
          <span class="token-key">"genreStyle"</span>: <span class="token-string">"Dance"</span>,
          <span class="token-key">"albumType"</span>: <span class="token-string">"SF"</span>,
          <span class="token-key">"albumTypeStr"</span>: <span class="token-string">"싱글"</span>,
          <span class="token-key">"imgList"</span>: [
            { <span class="token-key">"size"</span>: <span class="token-number">500</span>, <span class="token-key">"url"</span>: <span class="token-string">"https://cdn.music-flo.com/image/..."</span> }
          ]
        }
      }
    ]
  }
}</pre>
    </div>

    <h4>에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">400</span></td><td class="param-desc">잘못된 요청 파라미터 (playlistId가 숫자가 아닌 경우 포함)</td></tr>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc">Scope 권한 없음 (personal.playlist.read 필요)</td></tr>
        <tr><td><span class="error-code">404</span></td><td class="param-desc">해당 playlistId의 내 리스트를 찾을 수 없음</td></tr>
        <tr><td><span class="error-code">500</span></td><td class="param-desc">서버 내부 오류</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ── 생성 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-post">POST</span>
    <span class="endpoint-path">/v1/me/library/playlists</span>
    <span class="endpoint-desc">보관함 내 리스트 생성</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">새로운 내 리스트를 생성합니다. 생성 시 트랙 목록을 함께 포함할 수 있습니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">personal.playlist.write</span>
    </div>

    <h4>Request Body</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">name</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">내 리스트 이름 (최대 40자, 공백 불가)</td>
        </tr>
        <tr>
          <td class="param-name">description</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">내 리스트 소개글 (최대 2000자)</td>
        </tr>
        <tr>
          <td class="param-name">publishYn</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">공개 여부 (Y / N, 기본값: N)</td>
        </tr>
        <tr>
          <td class="param-name">trackList</td>
          <td class="param-type">Array</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">추가할 트랙 목록 (최대 1000곡)</td>
        </tr>
        <tr>
          <td class="param-name">trackList[].trackId</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">트랙 ID</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>포함</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">생성된 내 리스트 ID</td></tr>
        <tr><td class="param-name">name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">내 리스트 이름</td></tr>
        <tr><td class="param-name">description</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">내 리스트 소개글</td></tr>
        <tr><td class="param-name">trackCount</td><td class="param-type">Int</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙 개수</td></tr>
        <tr><td class="param-name">createDateTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">생성 일시 (ISO 8601)</td></tr>
        <tr><td class="param-name">updateDateTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">수정 일시 (ISO 8601)</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X POST \
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/me/library/playlists"</span> \
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \
  -H <span class="token-string">"Content-Type: application/json"</span> \
  -d <span class="token-string">'{
    "name": "새 플레이리스트",
    "description": "직접 만든 첫 번째 리스트",
    "publishYn": "N",
    "trackList": [
      { "trackId": "418121111" },
      { "trackId": "209821043" }
    ]
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
    <span class="token-key">"id"</span>: <span class="token-string">"555000111"</span>,
    <span class="token-key">"name"</span>: <span class="token-string">"새 플레이리스트"</span>,
    <span class="token-key">"description"</span>: <span class="token-string">"직접 만든 첫 번째 리스트"</span>,
    <span class="token-key">"trackCount"</span>: <span class="token-number">2</span>,
    <span class="token-key">"createDateTime"</span>: <span class="token-string">"2025-05-14T09:00:00"</span>,
    <span class="token-key">"updateDateTime"</span>: <span class="token-string">"2025-05-14T09:00:00"</span>
  }
}</pre>
    </div>

    <h4>에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">400</span></td><td class="param-desc">검증 실패 (name 누락·초과, trackList 1000곡 초과 등)</td></tr>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc">Scope 권한 없음 (personal.playlist.write 필요)</td></tr>
        <tr><td><span class="error-code">500</span></td><td class="param-desc">서버 내부 오류</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ── 수정 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-put">PUT</span>
    <span class="endpoint-path">/v1/me/library/playlists/<span class="path-param">{playlistId}</span></span>
    <span class="endpoint-desc">보관함 내 리스트 수정</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">내 리스트의 이름, 소개글, 공개 여부, 트랙 목록을 수정합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">personal.playlist.write</span>
    </div>

    <div class="callout callout-warning">
      <span class="callout-icon">⚠️</span>
      <div class="callout-body">
        <p><strong>trackList는 전체 덮어쓰기(replace)입니다.</strong> 요청 본문의 <code>trackList</code>로 기존 트랙 목록 전체를 교체합니다. 포함되지 않은 트랙은 삭제되므로 현재 보관하려는 트랙 목록 전체를 전송해야 합니다.</p>
      </div>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">playlistId</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">내 리스트 ID (숫자 형식이어야 함)</td>
        </tr>
      </tbody>
    </table>

    <h4>Request Body</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">name</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">내 리스트 이름 (최대 40자, 공백 불가)</td>
        </tr>
        <tr>
          <td class="param-name">description</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">내 리스트 소개글 (최대 2000자)</td>
        </tr>
        <tr>
          <td class="param-name">publishYn</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">공개 여부 (Y / N)</td>
        </tr>
        <tr>
          <td class="param-name">trackList</td>
          <td class="param-type">Array</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">수정 후의 전체 트랙 목록 (최대 1000곡, 전체 덮어쓰기)</td>
        </tr>
        <tr>
          <td class="param-name">trackList[].trackId</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">트랙 ID</td>
        </tr>
        <tr>
          <td class="param-name">trackList[].newYn</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">신규 추가 여부 (Y / N)</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>포함</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">code</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">응답 코드 ("200")</td></tr>
        <tr><td class="param-name">message</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">응답 메시지 ("SUCCESS")</td></tr>
        <tr><td class="param-name">data</td><td class="param-type">Object</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">null (수정 결과는 본문으로 반환되지 않음)</td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X PUT \
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/me/library/playlists/555000111"</span> \
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span> \
  -H <span class="token-string">"Content-Type: application/json"</span> \
  -d <span class="token-string">'{
    "name": "수정된 플레이리스트",
    "description": "업데이트된 소개글",
    "publishYn": "Y",
    "trackList": [
      { "trackId": "418121111", "newYn": "N" },
      { "trackId": "312089054", "newYn": "Y" }
    ]
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
        <tr><td><span class="error-code">400</span></td><td class="param-desc">검증 실패 (name 누락·초과, playlistId가 숫자가 아닌 경우 등)</td></tr>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc">Scope 권한 없음 (personal.playlist.write 필요)</td></tr>
        <tr><td><span class="error-code">404</span></td><td class="param-desc">해당 playlistId의 내 리스트를 찾을 수 없음</td></tr>
        <tr><td><span class="error-code">500</span></td><td class="param-desc">서버 내부 오류</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ── 삭제 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-delete">DELETE</span>
    <span class="endpoint-path">/v1/me/library/playlists/<span class="path-param">{playlistId}</span></span>
    <span class="endpoint-desc">보관함 내 리스트 삭제</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">특정 내 리스트를 삭제합니다. 삭제 후 복구할 수 없습니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">personal.playlist.write</span>
    </div>

    <h4>Path Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">playlistId</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">삭제할 내 리스트 ID (숫자 형식이어야 함)</td>
        </tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X DELETE \
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/me/library/playlists/555000111"</span> \
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
  <span class="token-key">"data"</span>: <span class="token-keyword">null</span>
}</pre>
    </div>

    <h4>에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">400</span></td><td class="param-desc">잘못된 요청 파라미터 (playlistId가 숫자가 아닌 경우 포함)</td></tr>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc">Scope 권한 없음 (personal.playlist.write 필요)</td></tr>
        <tr><td><span class="error-code">404</span></td><td class="param-desc">해당 playlistId의 내 리스트를 찾을 수 없음</td></tr>
        <tr><td><span class="error-code">500</span></td><td class="param-desc">서버 내부 오류</td></tr>
      </tbody>
    </table>
  </div>
</div>
`);
