registerSection('overview', `
<div class="page-hero">
  <span class="page-tag">FLO Developer Center</span>
  <h1>FLO Open API 개발자 센터</h1>
  <p>FLO Open API를 활용해 음악 스트리밍 서비스를 연동하세요. 인증부터 콘텐츠 조회, 스트리밍까지 필요한 모든 API를 제공합니다.</p>
</div>

<h2>연동 시작하기</h2>
<ul class="step-list">
  <li class="step-item">
    <div class="step-num">1</div>
    <div class="step-content">
      <h4>FLO OAuth 설정</h4>
      <p>FLO 계정 기반 OAuth 2.1 인증을 설정합니다. PKCE 방식을 사용하며 <code>client_id</code>와 <code>client_secret</code>을 발급받아야 합니다.</p>
    </div>
  </li>
  <li class="step-item">
    <div class="step-num">2</div>
    <div class="step-content">
      <h4>Access Token 발급</h4>
      <p>Authorization Code Flow를 통해 사용자 인증 후 Access Token을 발급받습니다. 이 토큰을 모든 API 요청의 <code>Authorization</code> 헤더에 포함합니다.</p>
    </div>
  </li>
  <li class="step-item">
    <div class="step-num">3</div>
    <div class="step-content">
      <h4>API 호출</h4>
      <p>발급받은 Access Token을 Bearer 토큰으로 사용해 FLO Open API를 호출합니다. <code>Authorization: Bearer {token}</code> 헤더 하나만 클라이언트가 제공하면 되며, Gateway가 토큰을 검증한 후 Resource 서버로 안전하게 라우팅합니다.</p>
    </div>
  </li>
</ul>

<hr class="divider" />

<h2>제공 API 목록</h2>
<table class="info-table">
  <thead>
    <tr>
      <th>도메인</th>
      <th>설명</th>
      <th>주요 Scope</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Album</td>
      <td>앨범 상세 정보 및 수록곡 목록 조회</td>
      <td><code>album.read</code></td>
    </tr>
    <tr>
      <td>Artist</td>
      <td>아티스트 상세 정보 조회</td>
      <td><code>artist.read</code></td>
    </tr>
    <tr>
      <td>Track</td>
      <td>트랙 상세 정보 및 가사 조회</td>
      <td><code>track.read</code></td>
    </tr>
    <tr>
      <td>Search</td>
      <td>트랙 / 앨범 / 아티스트 검색</td>
      <td><code>search.read</code></td>
    </tr>
    <tr>
      <td>Stream</td>
      <td>스트리밍 재생 URL 조회</td>
      <td><code>stream.read</code></td>
    </tr>
    <tr>
      <td>History</td>
      <td>청취 이력 등록</td>
      <td><code>history.write</code></td>
    </tr>
    <tr>
      <td>FLO Party</td>
      <td>파티 세션 관리 및 트랙 매핑 (FLO ↔ Spotify)</td>
      <td><code>floparty.session.read/write</code></td>
    </tr>
    <tr>
      <td>Me Library</td>
      <td>보관함 내 리스트(플레이리스트) 조회 및 관리</td>
      <td><code>personal.playlist.read/write</code></td>
    </tr>
  </tbody>
</table>

<hr class="divider" />

<h2>공통 응답 형식</h2>
<p>모든 API는 아래와 같은 공통 응답 형식을 사용합니다.</p>

<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">JSON</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre>{
  <span class="token-key">"code"</span>: <span class="token-string">"200"</span>,
  <span class="token-key">"message"</span>: <span class="token-string">"SUCCESS"</span>,
  <span class="token-key">"data"</span>: { ... }
}</pre>
</div>

<h2>공통 에러 코드</h2>
<table class="info-table">
  <thead>
    <tr>
      <th>HTTP Status</th>
      <th>code</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="error-code">400</span></td>
      <td><code>400</code></td>
      <td>잘못된 요청 파라미터</td>
    </tr>
    <tr>
      <td><span class="error-code">401</span></td>
      <td><code>401</code></td>
      <td>인증 실패 (Access Token 없음 또는 만료)</td>
    </tr>
    <tr>
      <td><span class="error-code">403</span></td>
      <td><code>403</code></td>
      <td>권한 없음 (Scope 부족)</td>
    </tr>
    <tr>
      <td><span class="error-code">404</span></td>
      <td><code>404</code></td>
      <td>리소스를 찾을 수 없음</td>
    </tr>
    <tr>
      <td><span class="error-code">500</span></td>
      <td><code>5000002</code></td>
      <td>서비스 점검 중</td>
    </tr>
  </tbody>
</table>
`);
