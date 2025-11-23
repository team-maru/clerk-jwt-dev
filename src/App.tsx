import React, { useState } from "react";
import {
  useAuth,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";

type DecodedJwt = {
  exp?: number;
  iat?: number;
  [key: string]: any;
};

function decodeJwt(token: string): DecodedJwt | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payloadBase64 = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");

    const json = atob(payloadBase64);
    return JSON.parse(json);
  } catch (e) {
    console.error("JWT 디코딩 실패:", e);
    return null;
  }
}

function App() {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [lastToken, setLastToken] = useState<string | null>(null);
  const [expiresInSec, setExpiresInSec] = useState<number | null>(null);
  const [source, setSource] = useState<"normal" | "refresh" | null>(null);

  const updateTokenState = (token: string, src: "normal" | "refresh") => {
    setLastToken(token);
    setSource(src);

    const decoded = decodeJwt(token);
    if (decoded?.exp) {
      const nowSec = Math.floor(Date.now() / 1000);
      const remain = decoded.exp - nowSec;
      setExpiresInSec(remain);
      console.log("exp:", decoded.exp, "남은 시간(초):", remain);
    } else {
      setExpiresInSec(null);
    }
  };

  const handleGetToken = async () => {
    try {
      const token = await getToken({ template: "maru_backend" });
      if (!token) {
        alert("토큰을 가져오지 못했습니다.");
        return;
      }

      console.log("JWT (normal):", token);
      updateTokenState(token, "normal");
      alert("일반 JWT가 콘솔에 출력되었습니다!");
    } catch (err) {
      console.error("토큰 발급 오류:", err);
      alert("JWT 발급 중 오류가 발생했습니다. 콘솔을 확인하세요.");
    }
  };

  const handleForceRefreshToken = async () => {
    try {
      const token = await getToken({ template: "maru_backend", skipCache: true });
      if (!token) {
        alert("토큰을 가져오지 못했습니다.");
        return;
      }

      console.log("JWT (force refresh):", token);
      updateTokenState(token, "refresh");
      alert("강제 리프레시 JWT가 콘솔에 출력되었습니다!");
    } catch (err) {
      console.error("강제 리프레시 토큰 발급 오류:", err);
      alert("강제 리프레시 중 오류가 발생했습니다. 콘솔을 확인하세요.");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Clerk JWT 발급 Dev Page (커스텀 템플릿 기반)</h1>

      {!isSignedIn && (
        <>
          <SignInButton />
          <p style={{ marginTop: 12 }}>로그인 후 JWT 발급 버튼을 눌러주세요.</p>
        </>
      )}

      {isSignedIn && (
        <>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button
              onClick={handleGetToken}
              style={{
                padding: "10px 18px",
                background: "black",
                color: "white",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              템플릿 JWT 발급
            </button>

            <button
              onClick={handleForceRefreshToken}
              style={{
                padding: "10px 18px",
                background: "#444",
                color: "white",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              강제 리프레시 발급
            </button>

            <SignOutButton>
              <button
                style={{
                  padding: "10px 18px",
                  background: "crimson",
                  color: "white",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 15,
                }}
              >
                로그아웃
              </button>
            </SignOutButton>
          </div>

          {lastToken && (
            <div
              style={{
                marginTop: 24,
                padding: 16,
                borderRadius: 8,
                border: "1px solid #ddd",
                maxWidth: 800,
                fontSize: 14,
                background: "#fafafa",
                wordBreak: "break-all",
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <strong>마지막 발급 방식:</strong>{" "}
                {source === "normal" ? "템플릿 JWT 발급" : "강제 리프레시"}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>남은 유효 시간:</strong>{" "}
                {expiresInSec != null ? `${expiresInSec}초` : "알 수 없음"}
              </div>
              <div>
                <strong>JWT:</strong>
                <div style={{ marginTop: 4 }}>{lastToken}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
