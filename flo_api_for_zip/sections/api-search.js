registerSection('api-search', `
<div class="page-hero">
  <span class="page-tag">API Reference</span>
  <h1>검색 (Search)</h1>
  <p>트랙, 앨범, 아티스트를 키워드로 검색합니다. 모든 요청에 <code>search.read</code> Scope가 필요합니다.</p>
</div>

<!-- ── 공통 파라미터 설명 ── -->
<div class="callout callout-info">
  <span class="callout-icon">ℹ️</span>
  <div class="callout-body">
    <p>검색 API 3개(<code>/tracks</code>, <code>/albums</code>, <code>/artists</code>)는 동일한 쿼리 파라미터 구조를 사용합니다. 응답의 <code>items</code> 배열 내 필드 구조만 대상 유형에 따라 다릅니다.</p>
  </div>
</div>

<!-- ── 트랙 검색 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/search/tracks</span>
    <span class="endpoint-desc">트랙 검색</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">키워드로 트랙을 검색합니다. 페이지네이션과 정렬 옵션을 지원합니다.</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">search.read</span>
    </div>

    <h4>Query Parameters</h4>
    <table class="param-table">
      <thead><tr><th>파라미터</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr>
          <td class="param-name">q</td>
          <td class="param-type">String</td>
          <td><span class="param-req req-required">필수</span></td>
          <td class="param-desc">검색 키워드 (공백 불가)</td>
        </tr>
        <tr>
          <td class="param-name">sortType</td>
          <td class="param-type">Enum</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">
            정렬 기준<br/>
            <code>accuracy</code> — 정확도순<br/>
            <code>recency</code> — 최신순<br/>
            <code>popular</code> — 인기순<br/>
            <code>alphabet</code> — 가나다순
          </td>
        </tr>
        <tr>
          <td class="param-name">page</td>
          <td class="param-type">Int</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">페이지 번호 (기본값: 1)</td>
        </tr>
        <tr>
          <td class="param-name">size</td>
          <td class="param-type">Int</td>
          <td><span class="param-req req-optional">선택</span></td>
          <td class="param-desc">페이지 당 결과 수 (기본값: 30)</td>
        </tr>
      </tbody>
    </table>

    <h4>응답 필드</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">type</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc"><code>track</code></td></tr>
        <tr><td class="param-name">keyword</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">사용된 검색 키워드</td></tr>
        <tr><td class="param-name">totalCount</td><td class="param-type">Int</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">전체 결과 수</td></tr>
        <tr><td class="param-name">totalPage</td><td class="param-type">Int</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">전체 페이지 수</td></tr>
        <tr><td class="param-name">currentPage</td><td class="param-type">Int</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">현재 페이지</td></tr>
        <tr><td class="param-name">items</td><td class="param-type">Array</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙 결과 목록 (아래 참조)</td></tr>
        <tr><td class="param-name">items[].id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙 ID</td></tr>
        <tr><td class="param-name">items[].name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">트랙명</td></tr>
        <tr><td class="param-name">items[].playTime</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">재생 시간 (mm:ss)</td></tr>
        <tr><td class="param-name">items[].adultAuthYn</td><td class="param-type">YnType</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">성인 인증 여부</td></tr>
        <tr><td class="param-name">items[].titleYn</td><td class="param-type">YnType</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">타이틀곡 여부</td></tr>
        <tr><td class="param-name">items[].originTrackYn</td><td class="param-type">YnType</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">원곡 여부</td></tr>
        <tr><td class="param-name">items[].artistList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">아티스트 목록 → <code>id</code>, <code>name</code></td></tr>
        <tr><td class="param-name">items[].album</td><td class="param-type">Object</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 정보 → <code>id</code>, <code>name</code>, <code>releaseYmd</code>, <code>imgList</code></td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/search/tracks?q=아이유&sortType=popular&page=1&size=10"</span> \\
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
    <span class="token-key">"type"</span>: <span class="token-string">"track"</span>,
    <span class="token-key">"keyword"</span>: <span class="token-string">"아이유"</span>,
    <span class="token-key">"totalCount"</span>: <span class="token-number">142</span>,
    <span class="token-key">"totalPage"</span>: <span class="token-number">15</span>,
    <span class="token-key">"currentPage"</span>: <span class="token-number">1</span>,
    <span class="token-key">"items"</span>: [
      {
        <span class="token-key">"id"</span>: <span class="token-string">"111"</span>,
        <span class="token-key">"name"</span>: <span class="token-string">"밤편지"</span>,
        <span class="token-key">"playTime"</span>: <span class="token-string">"03:38"</span>,
        <span class="token-key">"adultAuthYn"</span>: <span class="token-string">"N"</span>,
        <span class="token-key">"titleYn"</span>: <span class="token-string">"Y"</span>,
        <span class="token-key">"originTrackYn"</span>: <span class="token-string">"Y"</span>,
        <span class="token-key">"artistList"</span>: [{ <span class="token-key">"id"</span>: <span class="token-string">"9001"</span>, <span class="token-key">"name"</span>: <span class="token-string">"아이유"</span> }],
        <span class="token-key">"album"</span>: {
          <span class="token-key">"id"</span>: <span class="token-string">"12345"</span>,
          <span class="token-key">"name"</span>: <span class="token-string">"밤편지"</span>,
          <span class="token-key">"releaseYmd"</span>: <span class="token-string">"20170321"</span>,
          <span class="token-key">"imgList"</span>: [{ <span class="token-key">"size"</span>: <span class="token-number">400</span>, <span class="token-key">"url"</span>: <span class="token-string">"https://cdn.example.com/img.jpg"</span> }]
        }
      }
    ]
  }
}</pre>
    </div>
  </div>
</div>

<!-- ── 앨범 검색 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/search/albums</span>
    <span class="endpoint-desc">앨범 검색</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">키워드로 앨범을 검색합니다. 쿼리 파라미터는 트랙 검색과 동일합니다 (<code>q</code>, <code>sortType</code>, <code>page</code>, <code>size</code>).</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">search.read</span>
    </div>

    <h4>응답 items 필드 (앨범)</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">앨범 ID</td></tr>
        <tr><td class="param-name">name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">앨범명</td></tr>
        <tr><td class="param-name">releaseYmd</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">발매일 (YYYYMMDD)</td></tr>
        <tr><td class="param-name">genreStyle</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">장르</td></tr>
        <tr><td class="param-name">albumTypeStr</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 타입</td></tr>
        <tr><td class="param-name">artistList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">아티스트 목록 → <code>id</code>, <code>name</code>, <code>artistGroupTypeStr</code>, <code>imgList</code></td></tr>
        <tr><td class="param-name">imgList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">앨범 이미지 → <code>size</code>, <code>url</code></td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/search/albums?q=아이유&page=1&size=10"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span></pre>
    </div>
  </div>
</div>

<!-- ── 아티스트 검색 ── -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method-tag method-get">GET</span>
    <span class="endpoint-path">/v1/search/artists</span>
    <span class="endpoint-desc">아티스트 검색</span>
  </div>
  <div class="endpoint-body">
    <p class="endpoint-summary">키워드로 아티스트를 검색합니다. 쿼리 파라미터는 트랙 검색과 동일합니다 (<code>q</code>, <code>sortType</code>, <code>page</code>, <code>size</code>).</p>

    <div class="scope-row">
      <span class="scope-label">Required Scope</span>
      <span class="scope-badge">search.read</span>
    </div>

    <h4>응답 items 필드 (아티스트)</h4>
    <table class="param-table">
      <thead><tr><th>필드</th><th>타입</th><th>필수</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td class="param-name">id</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">아티스트 ID</td></tr>
        <tr><td class="param-name">name</td><td class="param-type">String</td><td><span class="param-req req-required">항상</span></td><td class="param-desc">아티스트명</td></tr>
        <tr><td class="param-name">genderCd</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">성별 코드</td></tr>
        <tr><td class="param-name">genderCdStr</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">성별 문자열</td></tr>
        <tr><td class="param-name">actStartYmd</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">활동 시작일</td></tr>
        <tr><td class="param-name">artistStyle</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">스타일/장르</td></tr>
        <tr><td class="param-name">artistGroupTypeStr</td><td class="param-type">String</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">그룹 유형 (솔로/그룹)</td></tr>
        <tr><td class="param-name">imgList</td><td class="param-type">Array</td><td><span class="param-req req-optional">선택</span></td><td class="param-desc">이미지 → <code>size</code>, <code>url</code></td></tr>
      </tbody>
    </table>

    <h4>cURL 예시</h4>
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-lang">cURL</span>
        <button class="copy-btn">복사</button>
      </div>
      <pre>curl -X GET \\
  <span class="token-string">"https://<span class="domain-chip" data-dtype="api">openapi.music-flo.com</span>/v1/search/artists?q=BTS&page=1&size=10"</span> \\
  -H <span class="token-string">"Authorization: Bearer {access_token}"</span></pre>
    </div>

    <h4>공통 에러 응답</h4>
    <table class="param-table">
      <thead><tr><th>HTTP Status</th><th>설명</th></tr></thead>
      <tbody>
        <tr><td><span class="error-code">400</span></td><td class="param-desc"><code>q</code> 파라미터가 비어있거나 없음</td></tr>
        <tr><td><span class="error-code">401</span></td><td class="param-desc">Access Token 만료 또는 없음</td></tr>
        <tr><td><span class="error-code">403</span></td><td class="param-desc"><code>search.read</code> Scope 없음</td></tr>
      </tbody>
    </table>
  </div>
</div>
`);
