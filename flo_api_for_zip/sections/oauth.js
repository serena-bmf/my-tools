// ── OAuth 소개 ──────────────────────────────────────────
registerSection('oauth-intro', `
<div class="page-hero">
  <span class="page-tag">FLO OAuth</span>
  <h1>FLO OAuth 소개</h1>
  <p>FLO ZIP 서비스와 FLO 간 OAuth 2.1 기반 인증 연동 규격을 설명합니다.</p>
</div>

<h2>목적 및 범위</h2>
<ul>
  <li>목적 : FLO ZIP에서 FLO 계정으로 가입/로그인 제공</li>
  <li>회원 계위 : ZIP이 마스터 회원 / FLO는 인증 수단</li>
  <li>지원 채널 : Web, iOS, Android</li>
</ul>

<h2>연동 정책 요약</h2>
<table class="info-table">
  <thead>
    <tr><th>#</th><th>항목</th><th>내용</th><th>비고</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>마스터 회원 주체</td><td>FLO ZIP</td><td></td></tr>
    <tr><td>2</td><td>FLO 역할</td><td>인증 제공</td><td></td></tr>
    <tr><td>3</td><td>ZIP 세션 발급 주체</td><td>ZIP</td><td></td></tr>
    <tr><td>4</td><td>ZIP 계정 생성 시점</td><td>FLO OAuth 성공 → ZIP 약관 동의 → 가입 완료</td><td></td></tr>
    <tr><td>5</td><td>FLO:ZIP 매핑 정책</td><td>1:1</td><td></td></tr>
    <tr><td>6</td><td>Scope</td><td>FLO 고유식별자, E-mail</td><td>이메일 미제공 시 ZIP에서 추가 입력/인증</td></tr>
    <tr><td>7</td><td>필수 식별자</td><td>고유 식별자</td><td></td></tr>
    <tr><td>8</td><td>만 14세 미만 처리</td><td>DSP 보유 생년월일로 만 14세 이상인 경우 연동 가능</td><td>생년월일 미보유 시 DSP에서 인증 필요</td></tr>
    <tr><td>9</td><td>필수 동의 항목</td><td>개인정보 수집/이용 안내</td><td>FLO DSP에서 동의</td></tr>
    <tr><td>10</td><td>이메일 전달 정책</td><td>소셜 가입 회원 대상으로 전달</td><td></td></tr>
    <tr><td>11</td><td>이메일 없는 회원 처리</td><td>ZIP에서 이메일 추가 인증 후 가입</td><td></td></tr>
    <tr><td>12</td><td>기존 ZIP 계정 중복/연결 정책</td><td>동일 이메일 연결 시도 시 ZIP 이메일 인증 후 연결</td><td></td></tr>
    <tr><td>13</td><td>로그아웃 정책</td><td>ZIP만 로그아웃</td><td></td></tr>
    <tr><td>14</td><td>연동 해제 위치/정책</td><td>ZIP 설정에서 해제</td><td></td></tr>
    <tr><td>15</td><td>탈퇴 연동 정책</td><td>ZIP 연동 상태에서 FLO 탈퇴 불가</td><td></td></tr>
  </tbody>
</table>

<h2>서비스 플로우 케이스</h2>
<table class="info-table">
  <thead>
    <tr><th>케이스</th><th>상황</th><th>ZIP에 기존 계정</th><th>결과</th></tr>
  </thead>
  <tbody>
    <tr><td>A</td><td>FLO OAuth 신규</td><td>없음</td><td>가입 완료</td></tr>
    <tr><td>B</td><td>FLO OAuth 신규 (이메일 없음)</td><td>없음</td><td>ZIP에서 이메일 인증 → 가입 완료</td></tr>
    <tr><td>C</td><td>FLO OAuth 신규 (생년월일 없음)</td><td>없음</td><td>FLO DSP에서 생년월일 추가 수집 → 만 14세 이상인 경우 가입 완료</td></tr>
    <tr><td>D</td><td>이미 연동된 FLO 계정 재로그인</td><td>있음 (연동됨)</td><td>로그인 완료</td></tr>
  </tbody>
</table>

<h2>제공 Scope</h2>
<table class="info-table">
  <thead>
    <tr><th>데이터</th><th>필수/선택</th><th>비고</th></tr>
  </thead>
  <tbody>
    <tr><td>FLO 고유식별자</td><td><span class="param-req req-required">필수</span></td><td></td></tr>
    <tr><td>이메일</td><td><span class="param-req req-required">필수</span></td><td>소셜 가입 회원 중 이메일 보유인 경우에만 전달</td></tr>
  </tbody>
</table>
`);

// ── OAuth 인증 플로우 ────────────────────────────────────
registerSection('oauth-flow', `
<div class="page-hero">
  <span class="page-tag">FLO OAuth</span>
  <h1>인증 플로우</h1>
  <p>FLO Open API는 <strong>OAuth 2.1 Authorization Code Flow with PKCE</strong>를 기반으로 동작합니다.</p>
</div>

<div class="callout callout-info">
  <span class="callout-icon">ℹ️</span>
  <div class="callout-body">
    <p>FLO Open API는 사용자 인증 이후 Authorization Code를 발급받고, 이를 통해 Access Token을 획득하여 API를 호출합니다. 사용자 인증 정보 표준 처리를 위해 <strong>OIDC(OpenID Connect)</strong>도 지원합니다.</p>
  </div>
</div>

<h2>전체 플로우</h2>
<div class="flow-box">
  <div class="flow-step">
    <div class="flow-dot active">1</div>
    <div class="flow-text">
      <strong>Authorization Request</strong>
      <p>클라이언트가 사용자를 FLO Authorization Endpoint로 리다이렉트. PKCE <code>code_challenge</code> 포함.</p>
    </div>
  </div>
  <div class="flow-step">
    <div class="flow-dot active">2</div>
    <div class="flow-text">
      <strong>사용자 인증 및 동의</strong>
      <p>사용자가 FLO 계정으로 로그인하고 Scope 동의.</p>
    </div>
  </div>
  <div class="flow-step">
    <div class="flow-dot active">3</div>
    <div class="flow-text">
      <strong>Authorization Code 발급</strong>
      <p>인증 서버가 <code>redirect_uri</code>로 Authorization Code를 포함해 리다이렉트.</p>
    </div>
  </div>
  <div class="flow-step">
    <div class="flow-dot active">4</div>
    <div class="flow-text">
      <strong>Token Request</strong>
      <p>클라이언트가 Authorization Code와 <code>code_verifier</code>로 Token Endpoint에 Access Token 요청.</p>
    </div>
  </div>
  <div class="flow-step">
    <div class="flow-dot active">5</div>
    <div class="flow-text">
      <strong>Token Response</strong>
      <p>Access Token, Refresh Token, ID Token 수신.</p>
    </div>
  </div>
  <div class="flow-step">
    <div class="flow-dot active">6</div>
    <div class="flow-text">
      <strong>API 호출</strong>
      <p>Access Token을 <code>Authorization: Bearer {token}</code>으로 포함해 FLO Open API 호출.</p>
    </div>
  </div>
</div>

<h2>표준 메타데이터 엔드포인트</h2>
<table class="info-table">
  <thead>
    <tr><th>구분</th><th>URL</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenID Provider Configuration</td>
      <td><code>https://<span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>/.well-known/oauth-authorization-server</code></td>
    </tr>
    <tr>
      <td>JWKS (JSON Web Key Set)</td>
      <td><code>https://<span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>/oauth2/jwks</code></td>
    </tr>
  </tbody>
</table>

<div class="callout callout-success">
  <span class="callout-icon">✅</span>
  <div class="callout-body">
    <p>ID 토큰은 <strong>RS256</strong> 알고리즘으로 서명됩니다. JWKS 엔드포인트를 통해 공개키를 조회하여 JWT 서명을 검증할 수 있으며, 키 로테이션이 발생해도 표준 방식으로 검증 로직을 유지할 수 있습니다.</p>
  </div>
</div>
`);

// ── OAuth 엔드포인트 & 스펙 ──────────────────────────────
registerSection('oauth-endpoints', `
<div class="page-hero">
  <span class="page-tag">FLO OAuth</span>
  <h1>엔드포인트 & 스펙</h1>
  <p>Access Token 발급을 위한 상세 요청/응답 규격입니다.</p>
</div>

<h2>인증 서버 정보</h2>
<table class="info-table">
  <thead>
    <tr><th>항목</th><th>값</th></tr>
  </thead>
  <tbody>
    <tr><td>Issuer</td><td><code>https://<span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span></code></td></tr>
    <tr><td>Authorization Endpoint</td><td><code>https://<span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>/oauth2/authorize</code></td></tr>
    <tr><td>Token Endpoint</td><td><code>https://<span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>/oauth2/token</code></td></tr>
    <tr><td>JWKS URI</td><td><code>https://<span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>/oauth2/jwks</code></td></tr>
    <tr><td>Revocation Endpoint</td><td><code>https://<span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>/oauth2/revoke</code></td></tr>
    <tr><td>Dynamic Client Registration</td><td><code>https://<span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>/connect/register</code></td></tr>
  </tbody>
</table>

<h2>지원 스펙</h2>
<table class="info-table">
  <thead>
    <tr><th>항목</th><th>지원 값</th></tr>
  </thead>
  <tbody>
    <tr><td>response_type</td><td><code>code</code></td></tr>
    <tr><td>PKCE</td><td><code>S256</code> 만 지원</td></tr>
    <tr><td>클라이언트 인증 방식</td><td><code>client_secret_basic</code>, <code>client_secret_post</code></td></tr>
    <tr><td>response_mode</td><td><code>query</code></td></tr>
    <tr><td>지원 grant type</td><td><code>authorization_code</code>, <code>refresh_token</code></td></tr>
  </tbody>
</table>

<h3>지원 Scope 예시</h3>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">Scope 목록</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre>openid
profile
read
write
personal.history.read
personal.like.read
personal.like.write
personal.playlist.read
personal.playlist.write
floparty.session.read
floparty.session.write
chart.read
search.read</pre>
</div>

<hr class="divider" />

<h2>Step 1. Authorization Request</h2>
<p>사용자를 Authorization Endpoint로 리다이렉트합니다. <code>response_type=code</code> 및 PKCE <code>code_challenge_method=S256</code>을 반드시 포함해야 합니다.</p>

<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">HTTP</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre><span class="token-keyword">GET</span> /oauth2/authorize?response_type=code
    &client_id={client_id}
    &redirect_uri={redirect_uri}
    &scope=openid%20profile%20read
    &state={state}
    &code_challenge={code_challenge}
    &code_challenge_method=S256
Host: <span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span></pre>
</div>

<h4>요청 파라미터</h4>
<table class="param-table">
  <thead>
    <tr><th>파라미터</th><th>필수</th><th>설명</th></tr>
  </thead>
  <tbody>
    <tr>
      <td class="param-name">response_type</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc"><code>code</code> 고정</td>
    </tr>
    <tr>
      <td class="param-name">client_id</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc">발급받은 클라이언트 ID</td>
    </tr>
    <tr>
      <td class="param-name">redirect_uri</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc">사전 등록된 리다이렉트 URI</td>
    </tr>
    <tr>
      <td class="param-name">scope</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc">요청할 권한 범위 (공백 구분, URL 인코딩)</td>
    </tr>
    <tr>
      <td class="param-name">state</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc">CSRF 방지용 상태값 (랜덤 문자열)</td>
    </tr>
    <tr>
      <td class="param-name">code_challenge</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc">PKCE code_verifier를 SHA-256 해시 후 Base64URL 인코딩한 값</td>
    </tr>
    <tr>
      <td class="param-name">code_challenge_method</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc"><code>S256</code> 고정</td>
    </tr>
  </tbody>
</table>

<h4>인증 성공 응답</h4>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">HTTP</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre>HTTP/1.1 302 Found
Location: {redirect_uri}?code={authorization_code}&state={state}</pre>
</div>

<hr class="divider" />

<h2>Step 2. Token Request</h2>
<p>발급받은 Authorization Code로 Access Token을 요청합니다.</p>

<h4>방법 1. client_secret_basic (Authorization 헤더)</h4>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">HTTP</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre><span class="token-keyword">POST</span> /oauth2/token HTTP/1.1
Host: <span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64(client_id:client_secret)}

grant_type=authorization_code&
code={authorization_code}&
redirect_uri={redirect_uri}&
code_verifier={code_verifier}</pre>
</div>

<h4>방법 2. client_secret_post (Body 포함)</h4>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">HTTP</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre><span class="token-keyword">POST</span> /oauth2/token HTTP/1.1
Host: <span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
client_id={client_id}&
client_secret={client_secret}&
code={authorization_code}&
redirect_uri={redirect_uri}&
code_verifier={code_verifier}</pre>
</div>

<h4>요청 파라미터</h4>
<table class="param-table">
  <thead>
    <tr><th>파라미터</th><th>필수</th><th>설명</th></tr>
  </thead>
  <tbody>
    <tr>
      <td class="param-name">grant_type</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc"><code>authorization_code</code> 고정</td>
    </tr>
    <tr>
      <td class="param-name">code</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc">Authorization Endpoint에서 발급받은 코드</td>
    </tr>
    <tr>
      <td class="param-name">redirect_uri</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc">Authorization Request에 사용한 값과 동일해야 함</td>
    </tr>
    <tr>
      <td class="param-name">code_verifier</td>
      <td><span class="param-req req-required">필수</span></td>
      <td class="param-desc">PKCE 검증용 원본 verifier (code_challenge 생성에 사용한 값)</td>
    </tr>
  </tbody>
</table>

<hr class="divider" />

<h2>Step 3. Token Response</h2>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">JSON</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre>{
  <span class="token-key">"access_token"</span>: <span class="token-string">"{access_token}"</span>,
  <span class="token-key">"token_type"</span>: <span class="token-string">"Bearer"</span>,
  <span class="token-key">"expires_in"</span>: <span class="token-number">3600</span>,
  <span class="token-key">"refresh_token"</span>: <span class="token-string">"{refresh_token}"</span>,
  <span class="token-key">"id_token"</span>: <span class="token-string">"{id_token}"</span>
}</pre>
</div>

<hr class="divider" />

<h2>Step 4. Refresh Token 재발급</h2>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">HTTP</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre><span class="token-keyword">POST</span> /oauth2/token HTTP/1.1
Host: <span class="domain-chip" data-dtype="auth">accounts.music-flo.com</span>
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64(client_id:client_secret)}

grant_type=refresh_token&
refresh_token={refresh_token}</pre>
</div>

<hr class="divider" />

<h2>서비스 점검 응답</h2>
<div class="code-block">
  <div class="code-block-header">
    <span class="code-block-lang">JSON — HTTP 500</span>
    <button class="copy-btn">복사</button>
  </div>
  <pre>{
  <span class="token-key">"code"</span>: <span class="token-string">"5000002"</span>,
  <span class="token-key">"message"</span>: <span class="token-string">"서비스 점검 중입니다."</span>
}</pre>
</div>
`);
